const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    // 代码分割
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          minChunks: 1,
          chunks: 'initial',
          minSize: 0,
          priority: 1,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          chunks: 'initial',
          minSize: 0,
        }
      }
    },
    minimizer: [
      // 压缩css
      new CssMinimizerWebpackPlugin(), 
      // 压缩js
      new TerserPlugin({
        parallel: true, 
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"]
          }
        }
      }),
    ],
  },
  plugins: [
    // 将css独立打包
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    // 开启gzip压缩
    new CompressionPlugin({
      test: new RegExp('\\.(js|css)$'),
      algorithm: 'gzip',
      include: new RegExp('static'),
      threshold: 10240,
      minRatio: 0.8
    }),
    // 复制public目录文件到build目录
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../build'),
          filter: source => {
            return !source.includes('public/index.html')
          }
        },
      ],
    }),
  ]
});
