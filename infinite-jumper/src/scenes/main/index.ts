import { BASE_URL, PATH_URL } from '@/const'
import { BANANA } from '@/const'
import CarrotSprite from './sprite/carrot'
export class MainScene extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite
  platforms: Phaser.Physics.Arcade.StaticGroup
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  carrots: Phaser.Physics.Arcade.Group
  carrotsCollected: number
  carrotsCollectedText: Phaser.GameObjects.Text
  constructor() {
    super('MainScene')
  }

  init() {
    this.carrotsCollected = 0
  }

  preload() {
    this.load.image('background', 'assets/bg_layer1.png')
    this.load.image('platform', 'assets/ground_grass.png')
    this.load.image('bunny-stand', 'assets/bunny1_stand.png')
    this.load.image('bunny-jump', 'assets/bunny1_jump.png')
    this.load.image('carrot', 'assets/carrot.png')

    this.load.audio('jump', 'assets/sfx/phaseJump1.wav')
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {

    // 背景的纵向不滚动
    this.add.image(240, 320, 'background').setScrollFactor(1, 0)

    this.platforms = this.physics.add.staticGroup()
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400)
      const y = 150 * i

      const platform: Phaser.Physics.Arcade.Sprite = this.platforms.create(x, y, 'platform')
      platform.setScale(0.5)

      platform.body.updateFromGameObject()
    }

    this.player = this.physics.add.sprite(240, 320, 'bunny-stand').setScale(0.5)


    // // 创建胡萝卜
    this.carrots = this.physics.add.group({ classType: CarrotSprite })
    this.carrots.get(240, 320, 'carrot')

    // 只检测底部碰撞
    this.player.body.checkCollision.up = false
    this.player.body.checkCollision.left = false
    this.player.body.checkCollision.right = false

    this.physics.add.collider(this.platforms, this.player)
    this.physics.add.collider(this.platforms, this.carrots)

    this.physics.add.overlap(
      this.player,
      this.carrots,
      this.handleCollectCarrot,
      undefined,
      this
    )

    // 镜头跟随人物移动
    this.cameras.main.startFollow(this.player)

    // 游戏水平死区，在死区内镜头不会跟随移动
    this.cameras.main.setDeadzone(this.scale.width * 1.5)

    const style = { color: '#000', fontSize: 24 }
    this.carrotsCollectedText = this.add.text(240, 10, 'Carrots: 0', style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0)
  }

  update() {
    if (!this.player) return

    this.platforms.children.iterate(child => {
      const platform: any = child
      // 向上或向下移动的距离，上为负，下为正
      const scrollY = this.cameras.main.scrollY
      // 700 是以上面150间距布局为参考标准
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100)
        platform.body.updateFromGameObject()

        this.addCarrotAbove(platform)
      }
    })



    // 底部碰撞时
    const touchingDown = this.player.body.touching.down
    if (touchingDown) {
      this.player.setVelocityY(-300)
      this.player.setTexture('bunny-jump')
      this.sound.play('jump')
    }

    // 精灵下落时
    const vy = this.player.body.velocity.y
    if (vy > 0 && this.player.texture.key !== 'bunny-stand') {
      this.player.setTexture('bunny-stand')
    }

    // 左右操作
    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200)
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200)
    } else {
      this.player.setVelocityX(0)
    }

    this.horizontalWrap(this.player)

    const bottomPlatform = this.findBottomMostPlatform()
    if (this.player.y > bottomPlatform.y + 200) {
      // console.log('game over')
      this.scene.start('GameOverScene')
    }
  }

  // 左右进入
  horizontalWrap(sprite: Phaser.Physics.Arcade.Sprite) {
    const halfWidth = sprite.displayWidth * 0.5
    const gameWidth = this.scale.width
    if (sprite.x < -halfWidth) {
      // 移动到最左侧时，设置从右侧出来
      sprite.x = gameWidth + halfWidth
    } else if (sprite.x > gameWidth + halfWidth) {
      // 移动到最右侧时，设置从左侧出来
      sprite.x = -halfWidth
    }


  }

  // 放萝卜到平台上
  addCarrotAbove(sprite: Phaser.Physics.Arcade.Sprite) {
    // 从平台上面一点点放一个萝卜
    const y = sprite.y - sprite.displayHeight
    const carrot = this.carrots.get(sprite.x, y, 'carrot')

    carrot.setActive(true)
    carrot.setVisible(true)

    this.add.existing(carrot)

    // 更新萝卜物理体积
    carrot.body.setSize(carrot.width, carrot.height)
    this.physics.world.enable(carrot)
    return carrot
  }

  // 人与萝卜碰撞
  handleCollectCarrot(player: Phaser.Physics.Arcade.Sprite, carrot: Phaser.Physics.Arcade.Sprite) {
    this.carrots.killAndHide(carrot)
    this.physics.world.disableBody(carrot.body)
    this.carrotsCollected++
    const value = `Carrots: ${this.carrotsCollected}`
    this.carrotsCollectedText.setText(value)
  }

  // 找到最底部那块平台
  findBottomMostPlatform() {
    const platforms: any = this.platforms.getChildren()
    let bottomPlatform = platforms[0]
    for (let i = 1; i < platforms.length; ++i) {
      const platform = platforms[i]
      if (platform.y < bottomPlatform.y) {
        continue
      }
      bottomPlatform = platform
    }
    return bottomPlatform
  }
}
