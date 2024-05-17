import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// TODO:踩坑 使用 import * as path 引入
import * as path from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vitePluginRequire from 'vite-plugin-require'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import legacy from '@vitejs/plugin-legacy'
import svgLoader from 'vite-svg-loader'
import postcsspxtoviewport from 'postcss-px-to-viewport'
// 🌸 vite压缩图片资源
// 🌸 icon生成雪碧图压缩
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
const env =
  loadEnv('development', process.cwd()).VITE_ENV === 'development'
    ? loadEnv('development', process.cwd())
    : loadEnv('production', process.cwd())

export default defineConfig({
  plugins: [
    vue(),
    // TODO: http2 优化

    svgLoader(),
    // TODO: svg变成雪碧图
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/svgs')]
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    }),
    // TODO: 踩坑：require使用vite-plugin-require插件适配
    // @ts-expect-error
    vitePluginRequire.default(),
    chunkSplitPlugin({
      // TODO: 踩坑：包分离优化使用正则 ，用数组会报错
      strategy: 'default',
      customSplitting: {
        // `react` and `react-dom` 会被打包到一个名为`render-vendor`的 chunk 里面(包括它们的一些依赖，如 object-assign)
        'vue-vendor': [/node_modules\/vue/],
        'vue-third-party': [
          /node_modules\/vue-router/,
          /node_modules\/lodash*/,
          /node_modules\/axios/
        ],
        pinia: [/node_modules\/pinia/],
        antd: [/node_modules\/ant-design-vue/],
        'ali-oss': [/node_modules\/ali-oss/]
      }
    }),
    // TODO: polyfills 垫片
    legacy({
      targets: ['ie >= 11']
    })
  ],
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度，一般写 320
          // 下面的不常用，上面的常用
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          landscape: false // 是否处理横屏情况
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/base.scss";'
      }
    }
  },
  resolve: {
    // TODO:踩坑：忘了在tsconfig.json中命名
    alias: {
      '@': path.join(__dirname, './src'),
      // prettier-ignore
      'com': path.resolve(__dirname, 'src/components'),
      // prettier-ignore
      'assets': path.resolve(__dirname, 'src/assets'),
      // prettier-ignore
      'utils': path.resolve(__dirname, 'src/utils'),
      // prettier-ignore
      'types': path.resolve(__dirname, 'src/types'),
      // prettier-ignore
      'router': path.resolve(__dirname, 'src/router'),
      // prettier-ignore
      'view': path.resolve(__dirname, 'src/view'),
      // prettier-ignore
      'api':path.resolve(__dirname, 'src/api'),
      // prettier-ignore
      'store': path.resolve(__dirname, 'src/store'),
      // prettier-ignore
      'i18n':path.resolve(__dirname,'src/i18n')
    },
    extensions: ['.js', '.cjs', '.json', '.ts', '.vue']
  },
  optimizeDeps: {
    force: true // 强制进行依赖预构建
  },
  server: {
    hmr: true,
    open: true,
    host: true, // 在局域网内进行热更新,
    // TODO: http2 优化
    proxy: {
      '/api': {
        target: env.VITE_TEST_HOST,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/upload': {
        target: env.VITE_TEST_HOST_UPLOAD,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upload/, '')
      }
    }
  },
  // 配置静态资源基础路径
  base: env.NODE_ENV === 'development' ? '' : env.ASSETS_PATH,
  build: {
    outDir: './dist',
    assetsDir: './static',
    // 单文件or內联临界值
    assetsInlineLimit: 8 * 1024,
    rollupOptions: {
      // external: Object.keys(externalGlobalsObj)
    }
  }
})
