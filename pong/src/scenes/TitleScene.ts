import WebFontFile from './WebFontFile'

export default class TitleScene extends Phaser.Scene {
  cursors: any
  constructor() {
    super('title-scene')
  }
  preload() {
    const fonts = new WebFontFile(this.load, 'Press Start 2P')
    this.load.addFile(fonts)
  }
  create() {
    const title = this.add.text(400, 200, 'old school tennis', {
      fontSize: 38,
      fontFamily: '"Press Start 2P"'
    })
    title.setOrigin(0.5, 0.5)

    this.add.text(400, 300, 'press space to start', {
      fontFamily: '"Press Start 2P"'
    })
      .setOrigin(0.5)

    // this.input.keyboard.createCursorKeys()
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('MainScene')
    })
  }
}
