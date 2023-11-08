const isDEV = process.env.NODE_ENV === "development"; // 是否是开发模式

module.exports = {
  sourceType: "unambiguous",
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: {
          version: 3,
          proposals: true
        }
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    isDEV && require.resolve("react-refresh/babel"), // 如果是开发模式才启动react热更新插件
  ].filter(Boolean)
}