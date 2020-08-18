const formatScore = (score: number) => `Score: ${score}`

export class ScoreLabel extends Phaser.GameObjects.Text {
  score: number
  constructor(scene: any, x: number, y: number, score: number, style: any) {
    super(scene, x, y, formatScore(score), style)
    this.score = score
  }

  setScore(score: number) {
    this.score = score
    this.updateScoreText()
  }

  add(points: number) {
    this.setScore(this.score + points)
  }

  updateScoreText() {
    this.setText(formatScore(this.score))
  }
}
