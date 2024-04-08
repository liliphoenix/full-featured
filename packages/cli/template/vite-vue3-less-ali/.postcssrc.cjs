// let autoprefixer = require('autoprefixer')
// let mixins = require('postcss-mixins')
// let importPlugin = require('postcss-import')
// let presetEnv = require('postcss-preset-env')
// let tailwindCss = require('tailwindcss')
module.exports = {
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
  important: '#app'
}
