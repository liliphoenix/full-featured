import { defineConfig } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import esbuild from "rollup-plugin-esbuild";
import alias from "@rollup/plugin-alias";

const plugins = [
  babel({ babelHelpers: "bundled" }),
  resolve({
    preferBuiltins: true,
  }),
  json(),

  commonjs(),
  esbuild(),
];

const entries = ["src/index.ts"];

export default [
  ...entries.map((input) => ({
    input,
    output: [
      {
        file: input.replace("src/", "lib/").replace(".ts", ".js"),
        format: "esm",
      },
    ],
    // 处理循环依赖直接外部引入即可
    external: ["readable-stream", "chalk", "semver"],
    plugins,
  })),
];
