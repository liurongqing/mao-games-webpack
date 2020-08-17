export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene')
  }

  preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('star', 'assets/star.png')
    this.load.image('bomb', 'assets/bomb.png')

    this.load.spritesheet('dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    )
  }

  create() {

    this.createPlatforms()
    // this.add.image(this.scale.width * 0.5, this.scale.height * 0.5, 'sky')
    // this.add.image(this.scale.width * 0.5, this.scale.height * 0.5, 'star')
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup()
    platforms.create(400, 568, 'grounp').setScale(2).refreshBody()

    platforms.create(600, 400, 'grounp')
    platforms.create(50, 250, 'grounp')
    platforms.create(750, 220, 'grounp')
  }
}
