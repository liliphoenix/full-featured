import inquirer, { PromptModule } from "inquirer";
import { questions } from "./questions";
import { ESdirname, posixPathJoin } from "../../../utils/pathUtils";
import {
  ensureDirExtra,
  readJsonFile,
  copyFileEx,
  mkDirEx,
} from "../../../utils/fsUtils";
import { PackageJson } from "../../../types/PackageJson";

class NodeTemplate {
  prompt: PromptModule;
  targetTemplate: string;
  targetPath: string;
  root: string;
  constructor(root: string) {
    this.prompt = inquirer.createPromptModule();
    this.root = root;
    this.targetTemplate = "node-template";
    this.targetPath = posixPathJoin(
      ESdirname(),
      `../template/${this.targetTemplate}`
    );
  }
  runPrompt() {
    ensureDirExtra(this.root);
    const packageJson = readJsonFile<PackageJson>(
      posixPathJoin(this.targetPath, "package.json")
    );
    this.prompt(questions).then((res) => {
      packageJson.name = res.name;
      this.root = posixPathJoin(this.root, res.name);
      console.log(this.root);
      copyFileEx(this.targetPath, this.root);
    });
  }
}
export { NodeTemplate };
