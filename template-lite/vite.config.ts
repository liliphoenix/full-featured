import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// TODO:踩坑 使用 import * as path 引入
import * as path from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vitePluginRequire from 'vite-plugin-require'
import svgLoader from 'vite-svg-loader'
// 🌸 vite压缩图片资源
// 🌸 icon生成雪碧图压缩
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
const env =
  loadEnv('development', process.cwd()).VITE_ENV === 'development'
    ? loadEnv('development', process.cwd())
    : loadEnv('production', process.cwd())

export default defineConfig({
  base: './',
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
    vitePluginRequire.default()
  ],

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

  build: {
    outDir: './dist',
    assetsDir: './static',
    // 单文件or內联临界值
    assetsInlineLimit: 8 * 1024,
    target: 'es2015',
    rollupOptions: {
      // external: Object.keys(externalGlobalsObj)
    },
    minify: false
  }
})
