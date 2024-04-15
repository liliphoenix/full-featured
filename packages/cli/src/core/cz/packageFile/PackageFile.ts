import { ChildProcess, spawn, execSync } from "child_process";
import { PackageJson } from "../../../types/packageType";
import { isFileExists, writeFile } from "../../../utils/fsUtils";
import { getDependencies } from "../../../utils/getDependencies";
import { joinPath } from "../../../utils/pathUtils";
import { errorToast, warningToast } from "../../../utils/errorToast";
import inquirer from "inquirer";
import chalk from "chalk";
import { WriteCommitlintConfig, WriteCzConfig } from "../configFile/configFile";
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
    //检查一下有没有安装git环境;
    switch (type) {
      case "base":
        const isPackageJsonExits = isFileExists(process.cwd(), "package.json");
        const isGitExits = isFileExists(process.cwd(), ".git");
        const isNodeModules = isFileExists(process.cwd(), "node_modules");

        if (isPackageJsonExits) {
          console.log(chalk.green("\npackage.json ✅"));
        } else {
          errorToast("❌ No package.json found in your project");
          return;
        }
        if (isNodeModules) {
          console.log(chalk.green("\nnode_modules ✅"));
        } else {
          errorToast("❌ Did not install the dependencies yet");
        }
        prompt({
          type: "confirm",
          name: "isUseGit",
          prefix: "",
          message: "\nAre you going to use git in your project?\n",
          default: false,
        }).then((res) => {
          if (res.isUseGit) {
            if (isGitExits) {
              console.log(chalk.green("\ngit ✅\n"));
            } else {
              errorToast("❌ No git found in your project");
            }
          } else {
            return;
          }
        });
        break;
      case "config":
        break;
      case "dependency_modules":
        const isYarn = isFileExists(process.cwd(), "yarn.lock");
        const isPnpm = isFileExists(process.cwd(), "pnpm-lock.yaml");
        try {
          execSync("npm --version");
          this.packageManager = "npm";
        } catch (error) {
          errorToast(
            "You Package manager is npm , but we do not find npm in your system \n so here we start to using npm manager"
          );
          return;
        }
        if (isYarn) {
          try {
            execSync("yarn --version");
            this.packageManager = "yarn";
            console.log(chalk.green("\nyarn ✅\n"));
          } catch (error) {
            warningToast(
              "You Package manager is Yarn , but we do not find yarn in your system \n so here we start to using npm manager"
            );
            this.packageManager = "npm";
          }
        } else if (isPnpm) {
          try {
            execSync("pnpm --version");
            this.packageManager = "pnpm";
            console.log(chalk.green("\npnpm ✅\n"));
          } catch (error) {
            warningToast(
              "You Package manager is Pnpm , but we do not find Pnpm in your system \n so here we start to using npm manager"
            );
            this.packageManager = "npm";
          }
        }
        break;
      default:
        break;
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
    if (this.packageFile.scripts["commit"]) {
      errorToast(
        " Filed to write file,script has been existed a script called 'commit'"
      );
      prompt({
        type: "confirm",
        name: "isCover",
        prefix: "",
        message:
          "\nAre you going to cover the commit script you ever written\n",
        default: true,
      }).then((res) => {
        res.isCover ? writeScript() : "";
      });
      return;
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
