## Web Worker
> 由于JS是单线程的，当需要对大量数据进行计算操作时，大量复杂的JS运算会独占主线程，导致页面的其他事件无法及时响应，造成页面假死的现象。可以使用Web Worker把复杂的JS操作单独放在一个线程里。创建Worker时，JS引擎向浏览器申请开一个子线程（子线程是浏览器开的，完全受主线程控制，而且不能操作DOM）JS引擎线程与worker线程间通过特定的方式通信（postMessage API，需要通过序列化对象来与线程交互特定的数据）。

### JS引擎计算
> 点击btn1时，js会进行大量计算，发现页面卡死了，点击input不会有任何反应。

```
<button id="btn1">js</button>
<button id="btn2">worker</button>
<input type="text">

const btn1 = document.getElementById('btn1');
btn1.addEventListener('click', function() {
  let total = 1;
  for (let i = 0; i < 5000000000; i++) {
    total += i;
  }
  console.log(total);
})
```
### 使用Web Worker
> 点击btn2时，页面并不会卡死，可以正常的对input进行输入操作。开启了一个单独的worker线程来进行复杂操作，通过postMessage和onmessage来进行两个线程间的通信。

```
<button id="btn1">js</button>
<button id="btn2">worker</button>
<input type="text">

if (window.Worker) {
  const myWorker = new Worker('./worker.js');
  myWorker.onmessage = function (e) {
    // e.data就是postMessage传递的数据
    console.log('total', e.data);
  };
  const btn1 = document.getElementById('btn1');
  const btn2 = document.getElementById('btn2');

  btn1.addEventListener('click', function () {
    let total = 1;
    for (let i = 0; i < 5000000000; i++) {
      total += i;
    }
    console.log('total', total);
  })

  btn2.addEventListener('click', function () {
    myWorker.postMessage('total');
  });
}


// worker.js
onmessage = function(e) {
  // e.data就是postMessage传递的数据
  if (e.data === 'total') {
    let total = 1;
    for (let i = 0; i < 5000000000; i++) {
      total += i;
    }
    postMessage(total);
  }
}
```
### Web Worker与Shared Worker
> 本质上就是进程和线程的区别。Shared Worker由独立的进程管理，Web Worker只是属于某个渲染进程(浏览器内核进程)下的一个线程。

- Web Worker只属于某个页面，不会和其他页面的渲染进程(浏览器内核进程)共享，所以Chrome会在渲染进程(浏览器内核进程)中（每一个Tab页就是一个渲染进程）创建一个新的线程来运行Worker中的JavaScript程序。
- Shared Worker是浏览器所有页面共享的，不能采用与Worker同样的方式实现，因为它不隶属于某个渲染进程(浏览器内核进程)，可以为多个渲染进程(浏览器内核进程)共享使用，所以Chrome浏览器为Shared Worker单独创建一个进程来运行JavaScript程序，在浏览器中每个相同的JavaScript只存在一个SharedWorker进程，不管它被创建多少次。
