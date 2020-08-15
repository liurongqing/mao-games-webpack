## 无限跳跃

> 本项目基于 Phaser 3.24.1 开发


## 知识点


### 基本操作

1. 设置背景纵向不滚动

    ```typescript
    this.add.image(10, 10, 'bg').setScrollFactor(1, 0)
    ```

1. 设置精灵纹理

    ```typescript
    this.player.setTexture('bunny-jump')
    ```


### 物理相关

1. 添加个物理精灵

    ```typescript
    this.physics.add.sprite(100, 100, 'sprite')
    ```

1. 设置加速度

    ```typescript
    this.player.setVelocityY(-300)
    this.player.setVelocityX(200)
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

### 键盘操作

1. 创建键盘key

    ```typescript
    this.cursors = this.input.keyboard.createCursorKeys()
    this.cursors.left.isDown
    ```

### 镜头操作

1. 设置水平死区，在死区内镜头不会跟随移动

    ```typescript
    this.cameras.main.setDeadzone(this.scale.width * 1.5)
    ```

1. 镜头跟随人物

    ```typescript
    this.cameras.main.startFollow(this.player)
    ```

1. 获取镜头滚动距离

    ```typescript
    const scrollY = this.cameras.main.scrollY
    ```

### 场景操作

1. 进入新场景

    ```typescript
    this.scene.start('GameScene)
    ```

## 需要完善的地方

1. 无限上跳时 y 的值，可能达到一个临界状态
