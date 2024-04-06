#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
// 🌸 生成模版文件
const init = async function (tarPath, temp) {
  const cwd = process.cwd();
  // 🌸 获取目标路径
  const targetDir = tarPath ? tarPath : "./";
  const targetPath = path.join(cwd, targetDir);
  // 🌸 获取目标模版
  const tempDir = path.join(__dirname, `../template/${temp}`);
  // 🌸 确保目标文件夹存在,也就是说如果不存在就创建一个
  await fs.ensureDir(targetPath);
  fs.readdir(targetPath, (err, files) => {
    if (files.length > 0) {
      console.log("\n📁 Such directory is not empty!\n");
      throw Error("Such directory is not empty!");
      return;
    }
  });

  // 🌸 获取
  const writeFile = (file, content) => {
    const targetTempPath = path.join(tempDir, file);
    const targetFilePath = path.join(targetDir, file);
    if (content) {
      fs.writeFile(targetFilePath, content);
    } else {
      fs.copy(targetTempPath, targetFilePath);
    }
  };
  let fileArr = await fs.readdir(tempDir);
  for (let file of fileArr.filter((item) => item !== "package.json")) {
    writeFile(file);
  }
  // 🌸 获取package.json
  const pkg = require(path.join(tempDir, "package.json"));
  pkg.name = path.basename(targetPath);
  writeFile("package.json", JSON.stringify(pkg, null, 2));
  if (targetDir !== cwd) {
    console.log(`\n ⬆️  cd ${path.relative(cwd, targetDir)} \n`);
  }
  console.log(`\n ⬇️  npm install \n`);
  console.log(`\n ⬇️  npm run dev \n`);
};

module.exports = init;
