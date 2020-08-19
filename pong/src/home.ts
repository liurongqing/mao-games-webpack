import * as scenes from '@/scenes'

const scene = []
for (let i in scenes) {
  scene.push(scenes[i])
}

const config: any = {
  type: Phaser.AUTO,
  // backgroundColor: 0x888888,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'root',
    width: 800,
    height: 500
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: true
    }
  },
  // audio: {
  //   noAudio: true
  // },
  // banner: {
  //   hidePhaser: true
  // },
  scene
}

window.game = new Phaser.Game(config)
