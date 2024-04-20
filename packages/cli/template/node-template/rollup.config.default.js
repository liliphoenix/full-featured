import { defineConfig } from 'rollup'
import resolver from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import esbuild from 'rollup-plugin-esbuild'
const input = ['index.ts']
const plugins = [
  resolver({
    preferBuiltins: true
  }),
  commonjs(),
  json(),
  terser(),
  esbuild()
]
const config = [
  ...input.map((input) => ({
    input,
    output: {
      file: input.replace('src/', 'lib/').replace('.ts', '.js'),
      format: 'esm'
    },
    plugins,
    external: ['chalk']
  }))
]
export default config
