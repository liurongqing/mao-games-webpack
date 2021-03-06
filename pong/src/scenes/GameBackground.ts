export default class GameBackground extends Phaser.Scene {
  constructor() {
    super('GameBackgroundScene')
  }
  preload() { }
  create() {
    const whiteColor = 0xffffff
    this.add.line(400, 250, 0, 0, 0, 500, whiteColor, 1)
      .setLineWidth(2.5, 2.5)

    this.add.circle(400, 250, 50)
      .setStrokeStyle(5, whiteColor, 1)
  }
}
