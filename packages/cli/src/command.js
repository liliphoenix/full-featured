const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();

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
    type: "checkbox",
    name: "lint",
    message: "Choose your code specification and code style checker portfolio",
    prefix: "🌈",
    choices: [
      { name: "Eslint + Prettier", checked: true },
      {
        name: "One-click Code Submission Tool (Cz+Commitlint+Git-Emoji)",
        checked: true,
      },
      { name: "Stylelint (It didn't work when using Tailwind Css)" },
    ],
  },
];
const command = () => {
  prompt(questions).then((answers) => {});
};
module.exports = command;
