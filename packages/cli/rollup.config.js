const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const terser = require("@rollup/plugin-terser");
const del = require("rollup-plugin-delete");
module.exports = {
  input: "./index.js",
  output: [
    {
      file: "./dist/cli.js",
      format: "cjs",
    },
    {
      file: "./dist/cli.min.js",
      format: "cjs",
      plugins: [terser()],
    },
  ],
  plugins: [del({ targets: "dist/*" }), commonjs(), nodeResolve(), json()],
};
