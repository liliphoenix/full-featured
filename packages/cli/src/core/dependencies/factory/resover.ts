import { PnpmDetector, NpmDetector, YarnDetector } from "./detector";
import { PackageManagerType } from "../enums/PackageManager";
import { errorToast } from "@utils/errorToast";
const detectors = [PnpmDetector, NpmDetector, YarnDetector];

export class ResolverFactory {
  getDependenciesGraph(root: string) {
    // 判读是什么包管理器 npm pnpm yarn
    let pkgManager: PackageManagerType | null = null;
    detectors.forEach((detector) => {
      pkgManager = new detector().detect(root);
      console.log(pkgManager);
    });
    if (pkgManager === null) {
      errorToast("No such project found in your directory or file");
      return;
    }
    switch (pkgManager) {
      case PackageManagerType.npm || PackageManagerType.yarn:
        break;
      case PackageManagerType.pnpm:
        break;
    }
    // 然后根据管理器类型 使用对应的resolver
  }
}
