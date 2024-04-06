const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
// const argv = require("minimist")(process.argv.slice(2));
const init = require("./create");
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
const command = () => {
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
module.exports = command;
