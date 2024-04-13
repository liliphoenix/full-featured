import { PnpmDetector, NpmDetector, YarnDetector } from "./detector";
import { PackageManagerType } from "../enums/PackageManager";
import { errorToast } from "../../../utils/errorToast";
import { loadNpmModules } from "../loadModules/loadModules";
import { NpmResolver } from "../resolver/NpmResolver";
const detectors = [PnpmDetector, NpmDetector, YarnDetector];

export class ResolverFactory {
  getDependenciesGraph(root: string, depth: number) {
    // 判读是什么包管理器 npm pnpm yarn
    console.log(root);

    let pkgManager: PackageManagerType | null = null;
    detectors.forEach((detector) => {
      if (pkgManager === null) {
        pkgManager = new detector().detect(root);
      }
    });
    console.log(pkgManager);

    if (pkgManager === null) {
      errorToast("No such project found in your directory or file");
      return;
    }

    switch (pkgManager) {
      case PackageManagerType.npm:
        console.log(loadNpmModules(root, depth), depth);
        return new NpmResolver(loadNpmModules(root, depth), depth);
        break;
      case pkgManager === PackageManagerType.pnpm:
        return new NpmResolver(loadNpmModules(root, depth), depth);
        break;
    }
    // 然后根据管理器类型 使用对应的resolver
  }
}
