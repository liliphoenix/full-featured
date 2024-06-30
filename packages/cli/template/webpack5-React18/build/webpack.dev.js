const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
module.exports = merge(baseConfig, {
  mode: 'development',
  // 使用source-map及时发现源代码的错误
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000,
    open: true,
    compress: false,
    hot: true,
    // 处理history模式中 404的错误
    historyApiFallback: true,
    // 托管静态资源，不需要webpack进行打包，在项目中通过引入的方式加入即可
    static: {
      directory: path.join(__dirname, '../public')
    }
  }
})
