import WebFontFile from '../WebFontFile'
import GameBackground from '../GameBackground'

export class MainScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  paddingLeft: any
  paddingRight: any
  ball: any
  paddingRightVelocity: any
  leftScoreLabel: any
  rightScoreLabel: any
  leftScore: any
  rightScore: any
  constructor() {
    super('MainScene')
  }

  init() {
    this.paddingRightVelocity = new Phaser.Math.Vector2(0, 0)
    this.leftScore = 0
    this.rightScore = 0
  }

  preload() {
    const fonts = new WebFontFile(this.load, 'Press Start 2P')
    this.load.addFile(fonts)
  }

  create() {

    this.scene.run('GameBackgroundScene')
    this.physics.world.setBounds(-100, 0, 1000, 500) // 向外各扩散100
    this.ball = this.add.circle(400, 250, 30, 0xffffff, 1)
    this.paddingLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1)
    this.paddingRight = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1)
    this.physics.add.existing(this.ball)
    this.physics.add.existing(this.paddingLeft, true)
    this.physics.add.existing(this.paddingRight, true)


    this.resetBall()
    this.ball.body.setBounce(1, 1)
    this.ball.body.setCollideWorldBounds(true, 1, 1)



    this.physics.add.collider(this.ball, this.paddingLeft)
    this.physics.add.collider(this.ball, this.paddingRight)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.leftScoreLabel = this.add.text(300, 125, '0', {
      fontSize: 48,
      fontFamily: '"Press Start 2P"'
    })
      .setOrigin(0.5, 0.5)

    this.rightScoreLabel = this.add.text(500, 375, '0', {
      fontSize: 48,
      fontFamily: '"Press Start 2P"'
    })
      .setOrigin(0.5, 0.5)
  }

  update() {
    const body = this.paddingLeft.body as Phaser.Physics.Arcade.StaticBody
    if (this.cursors.up.isDown) {
      this.paddingLeft.y -= 10
      body.updateFromGameObject()
    } else if (this.cursors.down.isDown) {
      this.paddingLeft.y += 10
      body.updateFromGameObject()
    }

    const aiSpeed = 3
    const diff = this.ball.y - this.paddingRight.y
    if (Math.abs(diff) < 10) return

    if (diff < 0) {
      this.paddingRightVelocity.y = -aiSpeed
      if (this.paddingRightVelocity.y < -10) this.paddingRightVelocity.y = -10
    } else {
      this.paddingRightVelocity.y = aiSpeed
      if (this.paddingRightVelocity.y > 10) this.paddingRightVelocity.y = 10
    }
    this.paddingRight.y += this.paddingRightVelocity.y
    this.paddingRight.body.updateFromGameObject()

    if (this.ball.x < -30) {
      this.incrementLeftScore()
      this.resetBall()
    }
    if (this.ball.x > 830) {
      this.incrementRightScore()
      this.resetBall()
    }
  }

  resetBall() {
    this.ball.setPosition(400, 300)
    const angle = Phaser.Math.Between(0, 360)
    const vec = this.physics.velocityFromAngle(angle, 200) // 200的速度
    this.ball.body.setVelocity(vec.x, vec.y)

  }

  incrementLeftScore() {
    this.leftScore += 1
    this.leftScoreLabel.setText(this.leftScore)
  }
  incrementRightScore() {
    this.rightScore += 1
    this.rightScoreLabel.setText(this.rightScore)
  }
}
