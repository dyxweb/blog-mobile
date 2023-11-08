const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 是否是开发模式
const isDev = process.env.NODE_ENV === 'development'; 

module.exports = {
  // 打包入口文件
  entry: path.resolve(__dirname, '../src/index.tsx'),
  // 打包出口配置
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
    filename: 'static/js/[name].[contenthash:8].js',
    clean: true
  },
  resolve: {
    // 默认是.js和.json。以下配置解决ts文件无法被引用解析的问题
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  // 开启持久化存储缓存
  cache: {
    type: 'filesystem'
  },
  module: {
    // 配置loader解析
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: [
          /\bcore-js\b/,
          /\bwebpack\/buildin\b/
        ],
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-loader，打包模式抽离css
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /.(scss|sass)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-loader，打包模式抽离css
          {
            loader: require.resolve("css-loader"),
            // 开启css module
            options: {
              modules: {
                localIdentName: "[folder]_[local]_[hash:base64:5]",
              },
            },
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    // 简化html文件资源引用
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
};
