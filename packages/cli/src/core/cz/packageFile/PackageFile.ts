import { ChildProcess, spawn, execSync } from "child_process";
import { PackageJson } from "../../../types/packageType";
import { isFileExists, writeFile } from "../../../utils/fsUtils";
import { getDependencies } from "../../../utils/getDependencies";
import { joinPath } from "../../../utils/pathUtils";
import { errorToast, warningToast } from "../../../utils/errorToast";
import inquirer from "inquirer";
import chalk from "chalk";
import { WriteCommitlintConfig, WriteCzConfig } from "../configFile/configFile";
import { Doctor } from "../doctor/doctor";
const prompt = inquirer.createPromptModule();
class PackageFile {
  packageFile: PackageJson;
  ShouldInstallDependencies: string[];
  packageManager: "npm" | "pnpm" | "yarn";
  constructor(packageJson: PackageJson) {
    this.packageFile = packageJson;
    this.ShouldInstallDependencies = [];
    this.packageManager = "npm";
  }
  runDoctor(type: string) {
    const doctor = new Doctor();
    if (type === "base") {
      doctor.runBaseDoctor();
    } else if (type === "dependency_modules") {
      this.packageManager = doctor.runDependencyManagerDoctor();
    }
  }
  addScript() {
    const writeScript = () => {
      this.packageFile.scripts = {
        ...this.packageFile.scripts,
        commit: "git add . && ./node_modules/full-featured-cz/standalone.js",
      };
      writeFile(
        joinPath(process.cwd(), "package.json"),
        JSON.stringify(this.packageFile, null, 2)
      );
      this.scanDependencies();
    };
    this.runDoctor("base");
    if (this.packageFile.scripts["commit"]) {
      prompt({
        type: "confirm",
        name: "isCover",
        prefix: "",
        message: "\nAre you going to cover the commit script you ever written",
        default: true,
      }).then((res) => {
        res.isCover ? writeScript() : "";
      });
    } else {
      writeScript();
    }
  }
  scanDependencies() {
    this.ShouldInstallDependencies = getDependencies([
      "full-featured-cz",
      "commitlint-config-gitmoji",
      "husky",
    ]);

    if (this.ShouldInstallDependencies.length === 0) {
      this.writeConfig();
    } else {
      this.writeConfig();
      this.installDependencies();
    }
  }
  installDependencies() {
    this.runDoctor("dependency_modules");
    spawn(
      this.packageManager,
      ["install", ...this.ShouldInstallDependencies, "-D"],
      {
        cwd: process.cwd(),
        stdio: "inherit",
      }
    );
  }
  writeConfig() {
    WriteCzConfig();
    WriteCommitlintConfig();
  }
}
export { PackageFile };
