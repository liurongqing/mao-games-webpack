import { BASE_URL, PATH_URL } from '@/const'
import { BANANA } from '@/const'
import CarrotSprite from './sprite/carrot'

export class MainScene extends Phaser.Scene {
  player
  platforms
  cursors
  carrots
  constructor() {
    super('MainScene')
  }

  preload() {
    this.load.image('background', 'assets/bg_layer1.png')
    this.load.image('platform', 'assets/ground_grass.png')
    this.load.image('bunny-stand', 'assets/bunny1_stand.png')
    this.load.image('carrot', 'assets/carrot.png')

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.add.image(240, 320, 'background').setScrollFactor(1, 0)
    this.platforms = this.physics.add.staticGroup()
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400)
      const y = 150 * i

      const platform = this.platforms.create(x, y, 'platform')
      platform.setScale(0.5)

      platform.body.updateFromGameObject()
    }


    this.player = this.physics.add.sprite(240, 320, 'bunny-stand').setScale(0.5)
    this.physics.add.collider(this.platforms, this.player)


    // 创建胡萝卜
    this.carrots = this.physics
    // const carrot = new CarrotSprite(this, 240, 320, 'carrot')
    // this.add.existing(carrot)

    this.player.body.checkCollision.up = false
    this.player.body.checkCollision.left = false
    this.player.body.checkCollision.right = false

    this.cameras.main.startFollow(this.player)
    this.cameras.main.setDeadzone(this.scale.width * 1.5)
  }

  update(t, dt) {
    this.horizontalWrap(this.player)
    // this.platforms.children.iterate(child => {
    //   const platform = child
    //   const scrollY = this.cameras.main.scrollY
    //   console.log('y', platform.y)
    //   if (platform.y > scrollY + 700) {
    //     platform.y = scrollY - Phaser.Math.Between(50, 100)
    //     platform.body.updateFromGameObject()
    //   }
    // })

    const touchDowning = this.player.body.touching.down
    if (touchDowning) {
      this.player.setVelocityY(-300)
    }
    if (this.cursors.left.isDown && !touchDowning) {
      this.player.setVelocityX(-200)
    } else if (this.cursors.right.isDown && !touchDowning) {
      this.player.setVelocityX(200)
    } else {
      this.player.setVelocityX(0)
    }
  }

  horizontalWrap(sprite) {
    const halfWidth = sprite.displayWidth * 0.5
    const gameWidth = this.scale.width
    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth
    }


  }
}
