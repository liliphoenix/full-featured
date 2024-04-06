const { program } = require("commander");
const command = require("./command");

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
    command();
  });
// 执行
module.exports = program;
