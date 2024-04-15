import { PackageFile } from "./packageFile/PackageFile";
import { readJsonFile } from "../../utils/fsUtils";
import { joinPath } from "../../utils/pathUtils";
import { PackageJson } from "../../types/packageType";

// 在工程中添加相应的script
function execute() {
  const packageJson = readJsonFile<PackageJson>(
    joinPath(process.cwd(), "package.json")
  );

  const packageFile = new PackageFile(packageJson);
  packageFile.runDoctor("base");
  packageFile.addScript();
}
function main() {
  execute();
}
export default main;
