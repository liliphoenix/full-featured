// 执行
// const argv = require("minimist")(process.argv.slice(2));
// 🌸 定义问题数组
import init from "./copyTemplate";
import inquirer from "inquirer";
const prompt = inquirer.createPromptModule();
import { questions } from "../../utils/getInquirerData";

function inquirerCommand() {
  let template: string;
  prompt(questions).then((answers) => {
    const path = `./${answers.name}`;
    const lintStyle = (tempPrefix: string) => {
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
    };
    if (answers.framework == "Vue+Ts") {
      lintStyle("vite-vue3");
    } else {
      lintStyle("vite-react");
    }
    init(path, template);
  });
}

export default inquirerCommand;
