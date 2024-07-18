const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const WebpackBar = require('webpackbar')
// const plugin = require('tailwindcss')
const CopyPlugins = require('copy-webpack-plugin')
module.exports = {
  entry: path.join(__dirname, '../src/main.tsx'),
  output: {
    filename: 'static/js/[name].js',
    path: path.join(__dirname, './dist'),
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        // 处理ts tsx 使用bebel处理
        test: /.(ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        // 处理 css文件
        test: /.(css|less)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /.(jpg|png|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name][ext]'
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      // 自动注入静态资源
      inject: true
    }),
    new WebpackBar({
      color: '#fdc0c8', // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false // 默认false，启用探查器。
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    }),
    new CopyPlugins({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, './dist'),
          filter: (sources) => {
            return !sources.includes('index.html')
          }
        }
      ]
    })
  ]
}
