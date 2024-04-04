#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
// 🌸 生成模版文件
const init = async () => {
  const root = process.cwd();
  // 🌸 获取目标路径
  const targetDir = argv._[0];
  const targetPath = path.join(root, targetDir);
  // 🌸 获取目标模版
  const tempDir = path.join(__dirname, `../${argv.temp}`);
  // 🌸 判断目标文件夹是否存在
  await fs.existsSync(targetPath);
  fs.readdir(targetPath, (log) => {
    console.log(log);
  });
};
init();
