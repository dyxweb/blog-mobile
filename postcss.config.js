module.exports = {
  plugins: [
    'postcss-preset-env',
    {
      "postcss-px-to-viewport": {
        viewportWidth: 375,    // 设计稿的宽度
        unitPrecision: 5,      // 转换后的位数，即小数点位数
        viewportUnit: 'vw',    // 转换成的视窗单位
        propList: ['*'],       // 要进行转换的属性，如果某个属性不进行转换，只需在其前加个“!”即可
        selectorBlackList: [], // 不进行转换的选择器
        minPixelValue: 1,      // 小于或等于1px则不进行转换
        mediaQuery: true,      // 是否在媒体查询的css代码中也进行转换，默认false
        exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配，不转换三方依赖的样式
      },
    },
  ]
}