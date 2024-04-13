#!/usr/bin/env node
import { program } from "commander";
import inquirerCommand from "./core/template/inquirerCommand";
import { AnalyzerFactory } from "./core/dependencies/Analyzer/analyzer";
import { getPwdPath } from "./utils/pathUtils";
import { createDataServer } from "./core/dependencies/server/server";
import { parseConfig } from "./config/dependencyConfig";

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
    .option("--root [root]", "Input your root path")
    .option("--depth <depth>", "Input your root path")
    .action(({ root, path }) => {
      const config = parseConfig(root, path);
      // // 🌸 获取当前进程路径
      const dependencyGraph = AnalyzerFactory(config.root, config.depth);
      if (dependencyGraph) {
        createDataServer(dependencyGraph, "../ui");
      }
    });
  return program;
}

function main() {
  createProgram().parse();
}
export default main;
