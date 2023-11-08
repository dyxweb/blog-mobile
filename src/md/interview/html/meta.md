## meta
> meta是文档级元数据元素，meta标签一般放在整个html页面的head部分。

### meta 元素定义的元数据的类型
- 如果设置了 name 属性，meta 元素提供的是文档级别的元数据，应用于整个页面。
- 如果设置了 http-equiv 属性，meta 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同。
- 如果设置了 charset 属性，meta 元素是一个字符集声明，告诉文档使用哪种字符编码。
- 如果设置了 itemprop 属性，meta 元素提供用户定义的元数据。
### name属性
> name和content一起使用，前者表示要表示的元数据的名称，后者是元数据的值。

- author
> 用来表示网页的作者的名字，例如某个组织或者机构。

```
<meta name="author" content="dyxweb">
```
- description
> 是一段简短而精确的、对页面内容的描述。

```
<meta name="description" content="dyxweb个人网站">
```
- keywords
> 与页面内容相关的关键词，使用逗号分隔。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。

```
<meta name="keywords" content="dyxweb,个人网站">
```
- viewport
> 为 viewport（视口）的初始大小提供指示。目前仅用于移动设备。width用来设置 viewport 的宽度为设备宽度;
initial-scale为设备宽度与 viewport 大小之间的缩放比例。不添加此配置时PC端页面在移动端打开默认会缩放显示。

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- robots
> 表示爬虫对此页面的处理行为，或者说，应当遵守的规则，是用来做搜索引擎抓取的。content值如下。

  1. all:搜索引擎将索引此网页，并继续通过此网页的链接索引文件将被检索
  2. none:搜索引擎讲忽略此网页
  3. index:搜索引擎索引此网页
  4. follow:搜索引擎继续通过此网页的链接索引搜索其它的网页

```
<meta name="robots" content="all">
```
- renderer
> 用来指定双核浏览器的渲染方式，比如360浏览器，我们可以通过这个设置来指定360浏览器的渲染方式。

```
<meta name="renderer" content="webkit"> // 默认webkit内核
<meta name="renderer" content="ie-comp"> // 默认IE兼容模式
<meta name="renderer" content="ie-stand"> // 默认IE标准模式
```
### http-equiv属性
> http-equiv也是和content一起使用，前者表示要表示的元数据的名称，后者是元数据的值。http-equiv 所有允许的值都是特定 HTTP 头部的名称。

- X-UA-Compatible
> 它是用来是做IE浏览器适配的。IE=edge告诉浏览器，以当前浏览器支持的最新版本来渲染，IE9就以IE9版本来渲染。chrome=1告诉浏览器，如果当前IE浏览器安装了Google Chrome Frame插件，就以chrome内核来渲染页面。如果两者都存在的情况：如果有chrome插件，就以chrome内核渲染，如果没有，就以当前浏览器支持的最高版本渲染。另外，这个属性支持的范围是IE8-IE11。如果在我们的http头部中也设置了这个属性，并且和meta中设置的有冲突，开发者偏好（meta元素）优先于Web服务器设置（HTTP头）。

```
<meta http-equiv="X-UA-Compatible" content="IE-edge,chrome=1">
```
- content-type
> 用来声明文档类型和字符集。

```
<meta http-equiv="content-type" content="text/html;charset=utf-8">
```
- x-dns-prefetch-control
> 一般来说，HTML页面中的a标签会自动启用DNS提前解析来提升网站性能，但是在使用https协议的网站中失效了，我们可以设置：

```
<meta http-equiv="x-dns-prefetch-control" content="no">
```
- cache-control、Pragma、Expires
> 和缓存相关的设置，但是遗憾的是这些往往不生效，我们一般都通过http headers来设置缓存策略。

