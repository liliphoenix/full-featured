import { readJsonFile } from "../../../utils/fsUtils";
import { joinPath, posixDirname } from "../../../utils/pathUtils";
import {
  Root,
  PackageInfo,
  PackageJson,
  PackagesSet,
} from "../../../types/PackageJson";
import { globSync } from "glob";
import { npmModulesGlobRules } from "../glob-rules/npmModulesRules";

export function loadNpmModules(
  root: string,
  depth: number
): PackagesSet<PackageJson> {
  let pkgJsonData: PackagesSet<PackageJson> = {};

  pkgJsonData[Root] = readJsonFile<PackageJson>(joinPath(root, "package.json"));
  const pathList = globSync([...npmModulesGlobRules], {
    cwd: root,
    posix: true,
  });

  pathList.forEach((path) => {
    pkgJsonData[posixDirname(path)] = readJsonFile<PackageJson>(
      joinPath(root, path)
    );
  });

  return pkgJsonData;
}
