## nvm node版本管理工具
> 在安装之前要将现有的node以及目录下的npm文件等全部删除，然后按照步骤安装即可，使用nvm命令检查是否安装成功，在已有一个版本的情况下，安装新的版本，使用nvm use切换即可，当前版本全局安装的内容只作用于当前版本。

### 常用命令
- nvm ls 查看已安装的版本
- nvm install 6.10.0 安装指定版本
- nvm uninstall 6.10.0 卸载指定版本
- nvm use 6.10.0 使用指定版本

### nvm安装node之后 npm找不到
> 打开nvm文件夹下的settings.txt文件，在最后添加以下代码。

```
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```