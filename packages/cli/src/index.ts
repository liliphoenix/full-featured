#!/usr/bin/env node
import { program } from "commander";
import inquirerCommand from "./core/viteTemplate/inquirerCommand";
import { AnalyzerFactory } from "./core/dependencies/Analyzer/analyzer";
import {
  ESdirname,
  getPwdPath,
  joinPath,
  posixPathJoin,
} from "./utils/pathUtils";
import { createDataServer } from "./core/dependencies/server/server";
import { parseConfig } from "./config/dependencyConfig";
import { readJsonFile } from "./utils/fsUtils";
import { PackageJson } from "./types/packageType";
import { PackageFile } from "./core/cz/packageFile/PackageFile";
import { NodeTemplate } from "./core/node-template/inquirery/inquirery";
import { Doctor } from "./core/cz/doctor/doctor";

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
    .option("--vite", "Generate a full-featured Vite template")
    .option("--node", "Generate a full-featured Node template")
    .option("--commit", "Add an out-of-the-box code commit check scheme")
    .description("Initialize a full-featured project as prompted")
    .action((opt) => {
      if (opt.vite) {
        inquirerCommand();
      } else if (opt.node) {
        const nodeTemp = new NodeTemplate(process.cwd());
        nodeTemp.runPrompt();
      } else if (opt.commit) {
        const packageJson = readJsonFile<PackageJson>(
          joinPath(process.cwd(), "package.json")
        );
        const packageFile = new PackageFile(packageJson);
        packageFile.addScript();
      }
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
        createDataServer(
          dependencyGraph,
          posixPathJoin(ESdirname(), "../dist")
        );
      }
    });

  return program;
}

function main() {
  createProgram().parse();
}
export default main;
