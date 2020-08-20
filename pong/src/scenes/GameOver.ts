
// typeof DataType {
//   leftScore: number,
//   rightScore: number
// }
export default class extends Phaser.Scene {
  constructor() {
    super('game-over')
  }
  create(data: any) {
    // this.add.text(40)
    // console.log('data', data)
    let titleText: string
    if (data.leftScore > data.rightScore) {
      titleText = 'You Win'
    } else {
      titleText = 'AI Win'
    }
    this.add.text(400, 200, titleText, {
      fontFamily: '"Press Start 2P"',
      fontSize: 38
    }).setOrigin(0.5)

    this.add.text(400, 300, 'press space to continue').setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', ()=>{
      this.scene.start('MainScene')
    })
  }
}
