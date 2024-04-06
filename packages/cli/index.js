#!/usr/bin/env node
const { program } = require("commander");
const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();

program
  .name("🌸 Full-Featured 🌸")
  .version("🌈 0.0.1", "-v,--version")
  .description(
    "🚀 A full-featured front-end enterprise-class scaffolding, the frame encapsulates all the functions that \nenterprise-level scaffolding should have, and does not require you to re-encapsulate. There are two \nframework options: Vue and React."
  );

program.option(
  "-p,--path <path>",
  "confirm your path to save your template file",
  "./{project name}"
);
program
  .command("init")
  .description("Initialize a full-featured project as prompted")
  .action(() => {
    inquirerCommand();
  });
// 执行

// const argv = require("minimist")(process.argv.slice(2));
// 🌸 定义问题数组
const questions = [
  {
    type: "input",
    message: "Give your project a name",
    name: "name",
    prefix: "🌈",
    default: "full-featured",
  },
  {
    type: "list",
    name: "framework",
    message: "Which framework do you want to use?",
    prefix: "🌈",
    choices: ["React+Tsx", "Vue+Ts"],
    default: "Vue+Ts",
  },
  {
    type: "list",
    name: "css",
    prefix: "🌈",
    message: "Select the CSS preprocessor you want",
    choices: ["Tailwind CSS", "Scss", "Less"],
    default: "Tailwind CSS",
  },
  {
    type: "confirm",
    name: "aliOss",
    prefix: "🌈",
    message:
      "Specifies whether to use the file upload function encapsulated by Alibaba Cloud OSS",
    default: true,
  },
];
const inquirerCommand = () => {
  prompt(questions).then((answers) => {
    const path = `./${answers.name}`;
    let template;
    const lintStyle = (tempPrefix) => {
      switch (answers.css) {
        case "Tailwind CSS":
          template = `${tempPrefix}-tailwind`;
          break;
        case "Scss":
          template = `${tempPrefix}-scss`;
          break;
        case "Less":
          template = `${tempPrefix}-less`;
          break;
      }
      if (answers.aliOss) {
        template += "-ali";
      }
      console.log(template);
    };
    if (answers.framework == "Vue+Ts") {
      lintStyle("vite-vue3");
    } else {
      lintStyle("vite-react");
    }
    init(path, template);
  });
};

const fs = require("fs-extra");
const path = require("path");
// 🌸 生成模版文件
const init = async function (tarPath, temp) {
  const cwd = process.cwd();
  // 🌸 获取目标路径
  const targetDir = tarPath ? tarPath : "./";
  const targetPath = path.join(cwd, targetDir);
  // 🌸 获取目标模版
  const tempDir = path.join(__dirname, `./template/${temp}`);
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

program.parse();
