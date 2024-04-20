import config from './rollup.config.default.js'
import replace from '@rollup/plugin-replace'
export const devConfig = () => {
  config.map((conf) => {
    conf.plugins.push(
      replace({
        values: {
          'process.env.NODE_ENV': JSON.stringify('development')
          // 🌸 防止字符串后面有等号然后进行替换
        },
        preventAssignment: true
      })
    )
  })
  return config
}

export default devConfig
