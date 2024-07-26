const { merge } = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const prodConfig = require('./webpack.prod')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = smp.wrap(
  merge(prodConfig, {
    plugins: [
      new BundleAnalyzerPlugin() // 配置分析打包结果插件
    ]
  })
)
