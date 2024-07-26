const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const WebpackBar = require('webpackbar')
// const plugin = require('tailwindcss')
const CopyPlugins = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const MiniCss = require('mini-css-extract-plugin')
module.exports = {
  entry: path.join(__dirname, '../src/main.tsx'),
  output: {
    filename: 'static/js/[name][chunkhash:8].js',
    path: path.join(__dirname, './dist'),
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        // 处理ts tsx 使用bebel处理
        test: /.(ts|tsx)$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          'thread-loader',
          {
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
        ]
      },
      {
        // 处理 css文件
        test: /.css$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCss.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        // 处理 css文件
        test: /.less$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCss.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /.(jpg|png|jpeg|gif|svg)$/,
        include: [path.resolve(__dirname, '../src')],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name][contenthash:8][ext]'
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
          filename: 'static/images/[contenthash:8][ext]'
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体文件
        // ...
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 加上[contenthash:8]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': path.join(__dirname, '../src'),
      '@assets': path.join(__dirname, '../src')
    }
  },
  plugins: [
    // 🌸 js文件注入html中
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      // 自动注入静态资源
      inject: true
    }),
    // 🌸 进度条
    new WebpackBar({
      color: '#fdc0c8', // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false // 默认false，启用探查器。
    }),
    // 🌸 环境变量替换
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    }),
    // 🌸 复制静态文件
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
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          isDev
            ? 'You application is running here http://localhost:3000'
            : 'Completed!!'
        ],
        notes: [
          'Some additional notes to be displayed upon successful compilation'
        ]
      }
    })
  ],
  // 🌸 热更新
  devServer: {
    hot: true
  },
  cache: {
    type: 'filesystem'
  }
}
