## 无限跳跃

> 本项目基于 Phaser 3.24.1 开发


## 知识点

1. 设置背景纵向不滚动

    ```typescript
    this.add.image(10, 10, 'bg').setScrollFactor(1, 0)
    ```
1. 添加个物理精灵

    ```typescript
    this.physics.add.sprite(100, 100, 'sprite')
    ```

1. 添加静态物理对象

    ```typescript
    const platforms = this.physics.add.staticGroup()
    const platform = platforms.create(1, 1, 'platform')
    platform.setScale(0.5)
    platform.body.updateFromGameObject()
    ```

1. 创建群物理对象

    ```typescript
    const carrots = this.physics.add.group({ classType: CarrotSprite })
    carrots.get(1, 1, 'carrot')
    ```
1. 只检测底部碰撞

    ```typescript
    this.player.body.checkCollision.up = false
    this.player.body.checkCollision.left = false
    this.player.body.checkCollision.right = false

    const touchingDown = this.player.body.touching.down
    ```

1. 添加碰撞

    ```typescript
    this.physics.add.collider(this.platforms, this.player)
    ```

1. 添加重叠操作

    ```typescript
    this.physics.add.overlap(
      this.player,
      this.carrots,
      this.handleCollectCarrot,
      undefined,
      this
    )
    ```

