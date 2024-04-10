import { PackageManagerType } from "../enums/PackageManager";
import { isFileExists } from "../../../utils/fsUtils";
export abstract class PackageManagerDetector {
  abstract detect(root: string): null | PackageManagerType;
}

class NpmDetector extends PackageManagerDetector {
  detect(root: string): PackageManagerType | null {
    return isFileExists(root, "package.json") ? PackageManagerType.npm : null;
  }
}
class PnpmDetector extends PackageManagerDetector {
  detect(root: string): PackageManagerType | null {
    return isFileExists(root, "pnpm-lock.yaml")
      ? PackageManagerType.pnpm
      : null;
  }
}

class YarnDetector extends PackageManagerDetector {
  detect(root: string): PackageManagerType | null {
    return isFileExists(root, "yarn.lock") ? PackageManagerType.yarn : null;
  }
}
export { NpmDetector, PnpmDetector, YarnDetector };
