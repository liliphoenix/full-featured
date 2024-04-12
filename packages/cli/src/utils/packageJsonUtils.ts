// 遍历包的一种依赖
// 产生(包名, 版本)为参数的回调
import { DependenciesMap, PackageJson } from "../types/PackageJson";

import { dependenciesType } from "../core/dependencies/enums/dependenciesType";

export function iterateDependenciesMap(
  dependencies: DependenciesMap | undefined,
  callback: (name: string, version: string) => void
): void {
  if (dependencies === undefined) {
    return;
  }
  for (const packageName of Object.getOwnPropertyNames(dependencies)) {
    // 版本号有很多格式， 其中semver只能解析正常的版本号
    // 但还可能会有链接形式
    // 如npm:...., file:..., http://....
    // 详见(https://docs.npmjs.com/cli/v8/configuring-npm/package-json?v=true#dependencies)
    // 对于特殊格式, 实际的依赖可能需要解析才能得到, 如A: npm:B@^1.0.0， 存储的目录以及引用时看似是A包， 但其实真正安装使用的是B包
    // 是否需要去解析？ 目前的做法是， npm链接可以准确的得到包名和版本， 可以解析一下正确， 免得检查报错
    const version = dependencies[packageName];
    if (version.startsWith("npm:")) {
      const split = version.split("@");
      callback(packageName, split[1]);
    } else {
      callback(packageName, version);
    }
  }
}

// 增加一个指定类型的依赖项
export function addDependency(
  packageJson: PackageJson,
  pkgName: string,
  pkgVersion: string,
  type: dependenciesType
) {
  if (packageJson[type] === undefined) {
    packageJson[type] = {};
  }
  (packageJson[type] as DependenciesMap)[pkgName] = pkgVersion;
}

//
export function getDependencyMap(
  packageJson: PackageJson
): Map<string, dependenciesType> {
  const result = new Map<string, dependenciesType>();
  if (packageJson[dependenciesType.Dependencies] !== undefined) {
    Object.getOwnPropertyNames(
      packageJson[dependenciesType.Dependencies]
    ).forEach((e) => result.set(e, dependenciesType.Dependencies));
  }
  if (packageJson[dependenciesType.DevDependencies] !== undefined) {
    Object.getOwnPropertyNames(
      packageJson[dependenciesType.DevDependencies]
    ).forEach((e) => result.set(e, dependenciesType.DevDependencies));
  }
  if (packageJson[dependenciesType.OptionalDependencies] !== undefined) {
    Object.getOwnPropertyNames(
      packageJson[dependenciesType.OptionalDependencies]
    ).forEach((e) => result.set(e, dependenciesType.OptionalDependencies));
  }
  if (packageJson[dependenciesType.PeerDependencies] !== undefined) {
    Object.getOwnPropertyNames(
      packageJson[dependenciesType.PeerDependencies]
    ).forEach((e) => result.set(e, dependenciesType.PeerDependencies));
  }
  return result;
}
