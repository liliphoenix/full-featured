// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/bobi/code/full-featured/node_modules/.pnpm/vite@5.2.8_@types+node@20.11.30_terser@5.29.2/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/bobi/code/full-featured/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@5.2.8_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import * as path from "path";
import Components from "file:///Users/bobi/code/full-featured/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///Users/bobi/code/full-featured/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.js";
import vitePluginRequire from "file:///Users/bobi/code/full-featured/node_modules/.pnpm/vite-plugin-require@1.1.14_css-loader@6.10.0_prettier@3.2.5_react-dom@18.2.0_react@18.2.0_vite@5.2.8/node_modules/vite-plugin-require/dist/index.js";
import svgLoader from "file:///Users/bobi/code/full-featured/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.4.21/node_modules/vite-svg-loader/index.js";
import { createSvgIconsPlugin } from "file:///Users/bobi/code/full-featured/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.8/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/bobi/code/full-featured/template-lite";
var env = loadEnv("development", process.cwd()).VITE_ENV === "development" ? loadEnv("development", process.cwd()) : loadEnv("production", process.cwd());
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    vue(),
    // TODO: http2 优化
    svgLoader(),
    // TODO: svg变成雪碧图
    createSvgIconsPlugin({
      iconDirs: [path.join(__vite_injected_original_dirname, "src/assets/svgs")]
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
          // css in js
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
      "@": path.join(__vite_injected_original_dirname, "./src"),
      // prettier-ignore
      "com": path.resolve(__vite_injected_original_dirname, "src/components"),
      // prettier-ignore
      "assets": path.resolve(__vite_injected_original_dirname, "src/assets"),
      // prettier-ignore
      "utils": path.resolve(__vite_injected_original_dirname, "src/utils"),
      // prettier-ignore
      "types": path.resolve(__vite_injected_original_dirname, "src/types"),
      // prettier-ignore
      "router": path.resolve(__vite_injected_original_dirname, "src/router"),
      // prettier-ignore
      "view": path.resolve(__vite_injected_original_dirname, "src/view"),
      // prettier-ignore
      "api": path.resolve(__vite_injected_original_dirname, "src/api"),
      // prettier-ignore
      "store": path.resolve(__vite_injected_original_dirname, "src/store"),
      // prettier-ignore
      "i18n": path.resolve(__vite_injected_original_dirname, "src/i18n")
    },
    extensions: [".js", ".cjs", ".json", ".ts", ".vue"]
  },
  optimizeDeps: {
    force: true
    // 强制进行依赖预构建
  },
  server: {
    hmr: true,
    open: true,
    host: true,
    // 在局域网内进行热更新,
    // TODO: http2 优化
    proxy: {
      "/api": {
        target: env.VITE_TEST_HOST,
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      },
      "/upload": {
        target: env.VITE_TEST_HOST_UPLOAD,
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/upload/, "")
      }
    }
  },
  build: {
    outDir: "./dist",
    assetsDir: "./static",
    // 单文件or內联临界值
    assetsInlineLimit: 8 * 1024,
    target: "es2015",
    rollupOptions: {
      // external: Object.keys(externalGlobalsObj)
    },
    minify: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYm9iaS9jb2RlL2Z1bGwtZmVhdHVyZWQvdGVtcGxhdGUtbGl0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2JvYmkvY29kZS9mdWxsLWZlYXR1cmVkL3RlbXBsYXRlLWxpdGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2JvYmkvY29kZS9mdWxsLWZlYXR1cmVkL3RlbXBsYXRlLWxpdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG4vLyBUT0RPOlx1OEUyOVx1NTc1MSBcdTRGN0ZcdTc1MjggaW1wb3J0ICogYXMgcGF0aCBcdTVGMTVcdTUxNjVcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBBbnREZXNpZ25WdWVSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCB2aXRlUGx1Z2luUmVxdWlyZSBmcm9tICd2aXRlLXBsdWdpbi1yZXF1aXJlJ1xuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInXG4vLyBcdUQ4M0NcdURGMzggdml0ZVx1NTM4Qlx1N0YyOVx1NTZGRVx1NzI0N1x1OEQ0NFx1NkU5MFxuLy8gXHVEODNDXHVERjM4IGljb25cdTc1MUZcdTYyMTBcdTk2RUFcdTc4QTdcdTU2RkVcdTUzOEJcdTdGMjlcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuY29uc3QgZW52ID1cbiAgbG9hZEVudignZGV2ZWxvcG1lbnQnLCBwcm9jZXNzLmN3ZCgpKS5WSVRFX0VOViA9PT0gJ2RldmVsb3BtZW50J1xuICAgID8gbG9hZEVudignZGV2ZWxvcG1lbnQnLCBwcm9jZXNzLmN3ZCgpKVxuICAgIDogbG9hZEVudigncHJvZHVjdGlvbicsIHByb2Nlc3MuY3dkKCkpXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcuLycsXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICAvLyBUT0RPOiBodHRwMiBcdTRGMThcdTUzMTZcbiAgICBzdmdMb2FkZXIoKSxcbiAgICAvLyBUT0RPOiBzdmdcdTUzRDhcdTYyMTBcdTk2RUFcdTc4QTdcdTU2RkVcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICBpY29uRGlyczogW3BhdGguam9pbihfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL3N2Z3MnKV1cbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICBBbnREZXNpZ25WdWVSZXNvbHZlcih7XG4gICAgICAgICAgaW1wb3J0U3R5bGU6IGZhbHNlIC8vIGNzcyBpbiBqc1xuICAgICAgICB9KVxuICAgICAgXVxuICAgIH0pLFxuICAgIC8vIFRPRE86IFx1OEUyOVx1NTc1MVx1RkYxQXJlcXVpcmVcdTRGN0ZcdTc1Mjh2aXRlLXBsdWdpbi1yZXF1aXJlXHU2M0QyXHU0RUY2XHU5MDAyXHU5MTREXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHZpdGVQbHVnaW5SZXF1aXJlLmRlZmF1bHQoKVxuICBdLFxuXG4gIHJlc29sdmU6IHtcbiAgICAvLyBUT0RPOlx1OEUyOVx1NTc1MVx1RkYxQVx1NUZEOFx1NEU4Nlx1NTcyOHRzY29uZmlnLmpzb25cdTRFMkRcdTU0N0RcdTU0MERcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgJ2NvbSc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cycpLFxuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAnYXNzZXRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMnKSxcbiAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgJ3V0aWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlscycpLFxuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAndHlwZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3R5cGVzJyksXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICdyb3V0ZXInOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3JvdXRlcicpLFxuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAndmlldyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdmlldycpLFxuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAnYXBpJzpwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2FwaScpLFxuICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAnc3RvcmUnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0b3JlJyksXG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICdpMThuJzpwYXRoLnJlc29sdmUoX19kaXJuYW1lLCdzcmMvaTE4bicpXG4gICAgfSxcbiAgICBleHRlbnNpb25zOiBbJy5qcycsICcuY2pzJywgJy5qc29uJywgJy50cycsICcudnVlJ11cbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZm9yY2U6IHRydWUgLy8gXHU1RjNBXHU1MjM2XHU4RkRCXHU4ODRDXHU0RjlEXHU4RDU2XHU5ODg0XHU2Nzg0XHU1RUZBXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhtcjogdHJ1ZSxcbiAgICBvcGVuOiB0cnVlLFxuICAgIGhvc3Q6IHRydWUsIC8vIFx1NTcyOFx1NUM0MFx1NTdERlx1N0Y1MVx1NTE4NVx1OEZEQlx1ODg0Q1x1NzBFRFx1NjZGNFx1NjVCMCxcbiAgICAvLyBUT0RPOiBodHRwMiBcdTRGMThcdTUzMTZcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogZW52LlZJVEVfVEVTVF9IT1NULFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcbiAgICAgIH0sXG4gICAgICAnL3VwbG9hZCc6IHtcbiAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9URVNUX0hPU1RfVVBMT0FELFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC91cGxvYWQvLCAnJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICcuL2Rpc3QnLFxuICAgIGFzc2V0c0RpcjogJy4vc3RhdGljJyxcbiAgICAvLyBcdTUzNTVcdTY1ODdcdTRFRjZvclx1NTE2N1x1ODA1NFx1NEUzNFx1NzU0Q1x1NTAzQ1xuICAgIGFzc2V0c0lubGluZUxpbWl0OiA4ICogMTAyNCxcbiAgICB0YXJnZXQ6ICdlczIwMTUnLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIGV4dGVybmFsOiBPYmplY3Qua2V5cyhleHRlcm5hbEdsb2JhbHNPYmopXG4gICAgfSxcbiAgICBtaW5pZnk6IGZhbHNlXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNULFNBQVMsY0FBYyxlQUFlO0FBQzVWLE9BQU8sU0FBUztBQUVoQixZQUFZLFVBQVU7QUFDdEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyx1QkFBdUI7QUFDOUIsT0FBTyxlQUFlO0FBR3RCLFNBQVMsNEJBQTRCO0FBVnJDLElBQU0sbUNBQW1DO0FBV3pDLElBQU0sTUFDSixRQUFRLGVBQWUsUUFBUSxJQUFJLENBQUMsRUFBRSxhQUFhLGdCQUMvQyxRQUFRLGVBQWUsUUFBUSxJQUFJLENBQUMsSUFDcEMsUUFBUSxjQUFjLFFBQVEsSUFBSSxDQUFDO0FBRXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQTtBQUFBLElBRUosVUFBVTtBQUFBO0FBQUEsSUFFVixxQkFBcUI7QUFBQSxNQUNuQixVQUFVLENBQU0sVUFBSyxrQ0FBVyxpQkFBaUIsQ0FBQztBQUFBLElBQ3BELENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVc7QUFBQSxRQUNULHFCQUFxQjtBQUFBLFVBQ25CLGFBQWE7QUFBQTtBQUFBLFFBQ2YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGLENBQUM7QUFBQTtBQUFBO0FBQUEsSUFHRCxrQkFBa0IsUUFBUTtBQUFBLEVBQzVCO0FBQUEsRUFFQSxTQUFTO0FBQUE7QUFBQSxJQUVQLE9BQU87QUFBQSxNQUNMLEtBQVUsVUFBSyxrQ0FBVyxPQUFPO0FBQUE7QUFBQSxNQUVqQyxPQUFZLGFBQVEsa0NBQVcsZ0JBQWdCO0FBQUE7QUFBQSxNQUUvQyxVQUFlLGFBQVEsa0NBQVcsWUFBWTtBQUFBO0FBQUEsTUFFOUMsU0FBYyxhQUFRLGtDQUFXLFdBQVc7QUFBQTtBQUFBLE1BRTVDLFNBQWMsYUFBUSxrQ0FBVyxXQUFXO0FBQUE7QUFBQSxNQUU1QyxVQUFlLGFBQVEsa0NBQVcsWUFBWTtBQUFBO0FBQUEsTUFFOUMsUUFBYSxhQUFRLGtDQUFXLFVBQVU7QUFBQTtBQUFBLE1BRTFDLE9BQVcsYUFBUSxrQ0FBVyxTQUFTO0FBQUE7QUFBQSxNQUV2QyxTQUFjLGFBQVEsa0NBQVcsV0FBVztBQUFBO0FBQUEsTUFFNUMsUUFBWSxhQUFRLGtDQUFVLFVBQVU7QUFBQSxJQUMxQztBQUFBLElBQ0EsWUFBWSxDQUFDLE9BQU8sUUFBUSxTQUFTLE9BQU8sTUFBTTtBQUFBLEVBQ3BEO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixPQUFPO0FBQUE7QUFBQSxFQUNUO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQTtBQUFBLElBRU4sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUSxJQUFJO0FBQUEsUUFDWixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxNQUM5QztBQUFBLE1BQ0EsV0FBVztBQUFBLFFBQ1QsUUFBUSxJQUFJO0FBQUEsUUFDWixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxhQUFhLEVBQUU7QUFBQSxNQUNqRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUE7QUFBQSxJQUVYLG1CQUFtQixJQUFJO0FBQUEsSUFDdkIsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBO0FBQUEsSUFFZjtBQUFBLElBQ0EsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
