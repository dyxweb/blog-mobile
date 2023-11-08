## [css加载](https://segmentfault.com/a/1190000018130499)
### css并不会阻塞DOM树的解析，但是css加载会阻塞DOM树渲染。
> 加载css的时候，可能会修改下面DOM节点的样式，如果css加载不阻塞DOM树渲染的话，那么当css加载完之后，DOM树可能又得重新重绘或者回流了，这就造成了一些没有必要的损耗。如果先把DOM树的结构先解析完，然后等css加载完之后，在根据最终的样式来渲染DOM树，这种做法性能方面会比较好一点。

### css加载会阻塞后面js语句的执行
### 浏览器渲染流程
1. HTML解析文件，生成DOM Tree，解析CSS文件生成CSSOM Tree。
2. 将Dom Tree和CSSOM Tree结合，生成Render Tree(渲染树)。
3. 根据Render Tree渲染绘制，将像素渲染到屏幕上。

- DOM解析和CSS解析是并行的，所以这也解释了为什么CSS加载不会阻塞DOM的解析。
- 由于Render Tree是依赖于DOM Tree和CSSOM Tree的，所以他必须等待到CSSOM Tree构建完成，也就是CSS资源加载完成(或者CSS资源加载失败)后，才能开始渲染。因此，CSS加载是会阻塞Dom的渲染的。
- 由于js可能会操作之前的Dom节点和css样式，因此浏览器会维持html中css和js的顺序。因此，样式表会在后面的js执行前先加载执行完毕。所以css会阻塞后面js的执行。

### onLoad
> 待页面的所有资源都加载完成才会触发，这些资源包括css、js、图片视频等。

### DOMContentLoaded
> 当页面的内容解析完成后，则触发该事件。如果页面中同时存在css和js，并且存在js在css后面，则DOMContentLoaded事件会在css加载完后才执行。其他情况下，DOMContentLoaded都不会等待css加载，并且DOMContentLoaded事件也不会等待图片、视频等其他资源加载。

### js执行会阻塞DOM树的解析和渲染