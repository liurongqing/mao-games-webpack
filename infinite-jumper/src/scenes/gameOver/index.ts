
export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene')
  }

  preload() {

  }

  create() {
    const width = this.scale.width
    const height = this.scale.height
    this.add.text(width * 0.5, height * 0.5, 'Game Over', {
      fontSize: 48
    })
      .setOrigin(0.5)
  }

  update(t, dt) {

  }
}
