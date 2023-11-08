const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  // 本地服务配置
  devServer: {
    port: 8080,
    compress: false,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "../public"),
    },
    client: {
      overlay: false,
    }
  },
  plugins: [
    // react模块热更新
    new ReactRefreshWebpackPlugin({
      overlay: false,
    })
  ]
});
