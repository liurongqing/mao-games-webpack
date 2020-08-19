## 官方第一个游戏

## 知识点

### 基本操作

1. 设置蒙层

    ```typescript
    player.setTint(0xff0000)
    ```

### 键盘

1. 创建

    ```typescript
    this.cursors = this.input.keyboard.createCursorKeys()
    ```
1. 使用

    ```typescript
    this.cursors.up.isDown // 点击上
    this.player.body.touching.down // 精灵碰底的时候
    ```

### 物理

1. 静态组与添加

    ```typescript
    const platforms = this.physics.add.staticGroup()
    // 因缩放了，所以要调用 refreshBody
    platforms.create(10, 10, 'key').setScale(2).refreshBody()
    platforms.create(10, 10, 'key')
    ```
1. 动态组与添加

    ```typescript
    const stars = this.physics.add.group({
      key:'k',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70}
    })

    stars.children.iterate((child: any) => {
      child.setBounceY(100)
    })
    ```

1. 碰撞

    ```typescript
    this.physics.add.collider(this.player, platforms)
    ```
1. 重合

    ```typescript
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
    ```
1. 禁用与启用物理对象

    ```typescript
    star.disableBody(true, true) // 禁用
    star.enableBody(true, x, y, true, true) // 启用
    stars.countActive(true) // 活跃的
    ```
1. 暂停

    ```typescript
    this.physics.pause()
    ```
1. 设置边界

    ```typescript
    this.player.setCollideWorldBounds(true)
    ```

### 动画

1. 创建动画

    ```typescript
    this.anims.create({
      key: 'left,
      frames: this.anims.generateFrameNumbers('k', { start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    })
    ```
1. 运行动画

    ```typescript
    this.player.anims.play('left', true)
    ```


## TODO

1. `tsconfig.json` 中设置 target="ES5"
