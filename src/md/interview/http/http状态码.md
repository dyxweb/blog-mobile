## http状态码
> HTTP 的状态码为三位数。

- 1xx: 表示目前是协议处理的中间状态，还需要后续操作。
- 2xx: 表示成功状态。
- 3xx: 重定向状态，资源位置发生变动，需要重新请求。
- 4xx: 请求报文有误。
- 5xx: 服务器端发生错误。
### 1xx
- 101 Switching Protocols。在HTTP升级为WebSocket的时候，如果服务器同意变更，就会发送状态码 101。
### 2xx
- 200 OK是见得最多的成功状态码。通常在响应体中放有数据。
- 204 No Content含义与 200 相同，但响应头后没有 body 数据。
- 206 Partial Content顾名思义，表示部分内容，它的使用场景为 HTTP 分块下载和断点续传，当然也会带上相应的响应头字段Content-Range。
### 3xx
- 301 Moved Permanently即永久重定向。比如你的网站从 HTTP 升级到了 HTTPS 了，以前的站点再也不用了，应当返回301，这个时候浏览器默认会做缓存优化，在第二次访问的时候自动访问重定向的那个地址。
- 302 Found，即临时重定向。如果只是暂时不可用，那么直接返回302即可，和301不同的是，浏览器并不会做缓存优化。
- 304 Not Modified  当协商缓存命中时会返回这个状态码。
### 4xx
- 400 Bad Request: 只是提示了一下错误，并不知道哪里出错了。
- 403 Forbidden: 并不是请求报文出错，而是服务器禁止访问。
- 404 Not Found: 资源未找到，表示没在服务器上找到相应的资源。
- 405 Method Not Allowed: 请求方法不被服务器端允许。
- 406 Not Acceptable: 资源无法满足客户端的条件。
- 408 Request Timeout: 服务器等待了太长时间。
- 409 Conflict: 多个请求发生了冲突。
- 413 Request Entity Too Large: get请求体的数据过大。
- 414 Request-URI Too Long: 请求行里的 URI 太大。
- 429 Too Many Request: 客户端发送的请求过多。
- 431 Request Header Fields Too Large请求头的字段内容太大。
### 5xx
- 500 Internal Server Error: 服务器出错了，具体什么错无法知道。
- 501 Not Implemented: 表示客户端请求的功能还不支持。
- 502 Bad Gateway: 服务器自身是正常的，但访问的时候出错了，具体什么错无法知道。
- 503 Service Unavailable: 表示服务器当前很忙，暂时无法响应服务。

