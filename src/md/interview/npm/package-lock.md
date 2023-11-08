## package-lock.json
> 为了保证不同人电脑安装的所有依赖版本都是一致的，确保项目代码所执行的运行结果都一样。

1. 在一个项目中npm install时候，会自动生成一个package-lock.json文件，和package.json在同一级目录下。package-lock.json记录了项目的一些信息和所依赖的模块。这样在每次安装都会出现相同的结果. 不管你在什么机器上面或什么时候安装。当我们下次再npm install时候，npm 发现如果项目中有 package-lock.json 文件，会根据 package-lock.json 里的内容来处理和安装依赖而不再根据 package.json。
2. 如果 package.json 的 semver-range version(指定版本的区间范围) 和 package-lock.json 中版本兼容(package-lock.json 版本在 package.json 指定的版本范围内)，即使此时 package.json 中有新的版本，执行 npm install 也还是会根据 package-lock.json 下载。
3. 如果手动修改了 package.json 的 version ranges，且和 package-lock.json 中版本不兼容，那么执行 npm install 时 package-lock.json 将会更新到兼容 package.json 的版本。
### 不同人安装版本不同的问题
> 假设在项目中的package.json 的 vue 版本是  vue: ^3.0.0, 我们电脑安装的vue版本就是 3.0.0 版本，我们把项目代码提交后，过了一段时间，vue 发布了新版本 3.0.1，这时其他同事执行 npm install安装的时候，在他电脑的vue版本就是 3.0.1了，因为我们的版本没有锁死，这样我们电脑中的vue版本就会不一样，我们的应用程序也许会产生不同的结果。如果我们在package.json上面锁死依赖包的版本号直接写 vue: 3.0.0，这样大家安装vue的版本都是3.0.0版本了。但是这样只能控制你自己的项目锁死版本号，那你项目中使用的依赖包的依赖包是无法控制版本号无法锁死版本号的。

### cnpm的差异
> 用cnpm install时候，并不会生成 package-lock.json 文件，也不会根据 package-lock.json 来安装依赖包，还是会使用 package.json 来安装。