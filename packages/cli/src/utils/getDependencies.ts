import glob, { globSync } from "glob";
import { dependenciesDirectory } from "../core/cz/denpendencyRules/dependcyDiretory";
import { posixGetBasename } from "./pathUtils";
function getDependencies(arr: string[]) {
  let dependencies: string[] = [];
  dependenciesDirectory.forEach((rule) => {
    globSync(rule).forEach((path) => {
      dependencies.push(posixGetBasename(path));
    });
  });
  const filterDependencies = arr.filter((depend) => {
    let flag: Boolean = true;
    dependencies.forEach((item) => {
      if (item === depend) {
        flag = false;
      }
    });
    return flag;
  });
  return filterDependencies;
}
export { getDependencies };
