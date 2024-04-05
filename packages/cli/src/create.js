#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
// 🌸 生成模版文件
module.exports = async function () {
  const root = process.cwd();

  // 🌸 获取目标路径
  const targetDir = argv._[0] ? argv._[0] : "./";
  const targetPath = path.join(root, targetDir);
  // 🌸 获取目标模版
  const tempDir = path.join(__dirname, `../${argv.temp}`);
  // 🌸 确保目标文件夹存在,也就是说如果不存在就创建一个
  await fs.ensureDir(targetPath);
  fs.readdir(targetPath, (err, files) => {
    if (files.length > 0) {
      console.log("\n📁 Such directory is not empty!\n");
      return;
    }
  });

  // 🌸 获取
  const writeFile = (file) => {
    const targetTempPath = path.join(tempDir, file);
    const targetFilePath = path.join(targetDir, file);
    fs.copy(targetTempPath, targetFilePath);
  };
  let fileArr = await fs.readdir(tempDir);
  for (let file of fileArr.filter((item) => item !== "package.json")) {
    writeFile(file);
  }
  // 🌸 获取
};
init().catch((err) => {
  console.log("");
  console.log(err);
});
