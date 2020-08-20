## 知识点


### 画线

```typescript
// 前2个参数定点， 后4个参数定一条线段
this.add.line(400, 250, 0, 0, 400, 500, 0xffffff, 1)
```

### 场景
```typescript
// 同时存在一个场景
this.scene.run('GameBackgroundScene')
```



#### TODO

1. const 目录改成 consts, Fonts

    ```typescript
    export const PressStart = 'press start'  
    ```

1. 导入可以 import * as Colors from './consts/Colors    Colors.White
1. 命名
1. 是否可以取消controller 的 key
