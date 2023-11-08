## setState(同步)
- setState本身并不是异步的，而是如果在调用setState时，如果react正处于更新过程，当前更新会被暂存，等上一次更新执行完成后再执行，这个过程给人一种异步的假象。
- 在react的生命周期和合成事件中，react仍然处于他的更新机制中，这时isBatchingUpdates为true。这时无论调用多少次setState，都不会立即执行更新，而是将要更新的state存入_pendingStateQueue，将要更新的组件存入dirtyComponent。当上一次更新机制执行完毕后会将isBatchingUpdates设置为false。这时将执行之前累积的setState。
### 同步异步场景(setState、useState表现相同)
- 钩子函数和React合成事件中的setState不是立即执行的。
- 异步函数(setTimeout、 Promise的then回调)和原生事件中(addEventListener)的setstate是立即执行的。
### setState异步假象
1. 开始运行
2. 结束运行
3. 新增粉丝数
```
handleClick = () => {
  const fans = Math.floor(Math.random() * 10)
  console.log('开始运行')
  this.setState({
    count: this.state.count + fans
  }, () => {
    console.log('新增粉丝数:', fans)
  })
  console.log('结束运行')
}
```
### setState执行早于宏任务和微任务
1. 新增粉丝数
2. 微任务触发
3. 宏任务触发
```
handleClick = () => {
  const fans = Math.floor(Math.random() * 10)
  setTimeout(() => {
    console.log('宏任务触发')
  })
  Promise.resolve().then(() => {
    console.log('微任务触发')
  })
  this.setState({
    count: this.state.count + fans
  }, () => {
    console.log('新增粉丝数:', fans)
  })
}
```
### setState同步现象
> 在React的生命周期钩子函数以及合成事件中，所有的setState操作会先缓存到一个队列中，在整个事件结束后或者mount流程结束后，才会取出之前缓存的setState队列进行一次计算，触发state更新。只要我们跳出React的事件流或者生命周期，就能打破React对setState的掌控。最简单的方法就是把setState放到setTimeout的匿名函数中。

1. 开始运行
2. 新增粉丝数
3. 结束运行
```
handleClick = () => {
  setTimeout(() => {
    const fans = Math.floor(Math.random() * 10)
    console.log('开始运行')
    this.setState({
      count: this.state.count + fans
    }, () => {
      console.log('新增粉丝数:', fans)
    })
    console.log('结束运行')
  })
}
```
### 造成state更新延迟的原因
- setState方法最终会调用enqueueSetState方法，而enqueueSetState方法内部会调用scheduleUpdateOnFiber方法。
- 正常调用的时候，scheduleUpdateOnFiber方法内只会调用ensureRootIsScheduled，在事件方法结束后才会调用flushSyncCallbackQueue方法​。
- 脱离React事件流的时候，scheduleUpdateOnFiber在ensureRootIsScheduled调用结束后，会直接调用flushSyncCallbackQueue方法。
- flushSyncCallbackQueue方法就是用来更新state并重新进行render。
```
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  if (lane === SyncLane) {
    // 同步操作
    ensureRootIsScheduled(root, eventTime);
    // 判断当前是否还在 React 事件流中
    // 如果不在，直接调用 flushSyncCallbackQueue 更新
    if (executionContext === NoContext) {
      flushSyncCallbackQueue();
    }
  } else {
    // 异步操作
  }
}
```
### 调用setState就会重新渲染
> setState调用就会引起就会组件重新渲染，即使这个状态没有参与页面渲染，所以不要把非渲染属性放state里面，即使放在了state也不要通过setState去修改这个状态，直接调用this.state.xxx = xxx，或者这种不参与渲染的属性直接挂在this上。

- 直接调用setState，无参数也会重新渲染。
- 新state和老state完全一致也会重新渲染(useState更新相同的状态不会重新渲染)。