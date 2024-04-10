#!/usr/bin/env node
import { program } from "commander";
import inquirerCommand from "./core/template/inquirerCommand";
import { AnalyzerFactory } from "./core/dependencies/Analyzer/analyzer";
import { getPwdPath } from "./utils/pathUtils";

function createProgram() {
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
  program
    .command("analyze")
    .description("Analyze the dependencies in your project")
    .action((arg: any) => {
      // 🌸 获取当前进程路径
      const root = getPwdPath();
      AnalyzerFactory(root, 1);

      console.log(Array.from({ length: 4 }, () => Array.from({ length: 0 })));
    });
  return program;
}

function main() {
  createProgram().parse();
}
export default main;
