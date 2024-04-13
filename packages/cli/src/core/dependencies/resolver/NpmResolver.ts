import { PackageJson, PackagesSet } from "../../../types/PackageJson";
import { Root } from "../../../types/PackageJson";
import { Queue } from "@datastructures-js/queue";
import semver from "semver";
import {
  DependencyGraph,
  DEFAULT_DEPTH,
  DEFAULT_ID,
} from "../dependencies-graph/dependenciesGraph";
import { dependenciesType } from "../enums/dependenciesType";
import { iterateDependenciesMap } from "../../../utils/packageJsonUtils";
import {
  findSpecifiedDirectories,
  posixPathJoin,
} from "../../../utils/pathUtils";

class NpmResolver {
  packageSet: PackagesSet<PackageJson>;
  packageGraph: DependencyGraph;
  pathList: Array<string>;
  depthLimit: number;
  constructor(packageSet: PackagesSet<PackageJson>, depth: number) {
    this.packageSet = packageSet;
    this.packageGraph = this.initDependencyGraph();
    this.depthLimit = depth;
    this.pathList = Object.getOwnPropertyNames(packageSet);
  }
  initDependencyGraph() {
    return new DependencyGraph(
      Object.getOwnPropertyNames(this.packageSet).map((path) => {
        return {
          name: this.packageSet[path].name,
          version: this.packageSet[path].version,
          path,
          depth: DEFAULT_DEPTH,
          id: DEFAULT_ID,
        };
      })
    );
  }
  resolveDependencies(): DependencyGraph {
    const NO_ITE = 0;
    for (let pkg of this.pathList) {
      this.packageSet[pkg].depth = NO_ITE;
    }
    const packageQueue = new Queue<string>();
    // 放进去start队头
    packageQueue.push(Root);
    // 将队头的深度设置为1
    this.packageSet[Root].depth = 1;

    // 广度遍历
    while (!packageQueue.isEmpty()) {
      // 删除队头开始遍历队头
      const front = packageQueue.dequeue();
      this.packageGraph.setPackageDepth(
        front,
        this.packageSet[front].depth as number
      );
      // 若有深度限制, 达到最大深度时， 不再向下搜索
      // 没有深度限制时, 由于depthLimit=-1， 所以同样不会触发退出

      if (this.packageSet[front].depth === this.depthLimit) {
        continue;
      }
      // console.log('front: ', front);
      this.iteratePackageDependency(
        front,
        (depend: string, type: dependenciesType) => {
          // console.log('\t', depend)
          // 给无向图添加边
          this.packageGraph.addDependency(front, depend, type);
          // 未搜索过时， 加入队列
          if (this.packageSet[depend].depth === NO_ITE) {
            packageQueue.push(depend);

            //在这里进行depth的叠加，如果发现没被迭代过，那么就证明是新发现的依赖，也就是当前头节点的字依赖，所以depth+1即可
            this.packageSet[depend].depth =
              (this.packageSet[front].depth as number) + 1;
          }
        }
      );
    }

    return this.packageGraph;
  }
  iteratePackageDependency(
    pth: string,
    callback: (usedPackage: string, type: dependenciesType) => void
  ): void {
    // 该不该遍历其它类型的dependencies呢？
    // 尤其是devDependencies， 一般来说npm包的devDependencies不会被安装， 但项目的devDependencies会被安装
    // 如果为每个包都去匹配devDependencies的话， 可能会出现， 大部分包其实并没有安装devDependencies
    // --但如果你要找， 可能能找到对应的包， 因为项目可能已经安装了对应的包。 幽灵依赖问题

    // 遍历dependencies
    iterateDependenciesMap(
      this.packageSet[pth].dependencies,
      (name, version) => {
        const targetPath = this.matchDependency(pth, name, version);

        // dependencies必须匹配成功

        if (targetPath === undefined) {
          throw new Error(`${pth}的依赖${name}: ${version}未找到`);
        }

        // 当版本要求为链接形式时， 可能会产生这个异常
        // 但不影响包的依赖匹配
        if (!semver.satisfies(this.packageSet[targetPath].version, version)) {
          console.log(
            "版本号不匹配?",
            "src:",
            pth,
            "target:",
            targetPath,
            "目标版本: ",
            version,
            "匹配到的版本: ",
            this.packageSet[targetPath].version
          );
        }
        callback(targetPath, dependenciesType.Dependencies);
      }
    );

    // 遍历开发依赖
    // 开发依赖数量庞大， 且除了根目录的不会被安装
    // 根据dev标注， 只会去遍历开发环境的包的开发依赖
    if (this.packageSet[pth].dev) {
      iterateDependenciesMap(
        this.packageSet[pth].devDependencies,
        (name, version) => {
          const targetPath = this.matchDependency(pth, name, version);
          if (targetPath === undefined) {
            throw new Error(`${pth}的开发依赖${name}: ${version}未找到`);
          }
          callback(targetPath, dependenciesType.DevDependencies);
        }
      );
    }

    // 遍历可选依赖
    // 可选依赖一般会安装, 但即使没有安装也没有关系
    iterateDependenciesMap(
      this.packageSet[pth].optionalDependencies,
      (name, version) => {
        const targetPath = this.matchDependency(pth, name, version);
        if (targetPath !== undefined) {
          callback(targetPath, dependenciesType.OptionalDependencies);
        }
      }
    );

    // 遍历同等依赖
    iterateDependenciesMap(
      this.packageSet[pth].peerDependencies,
      (name, version) => {
        const targetPath = this.matchDependency(pth, name, version);

        // peerDependencies必须匹配成功
        if (targetPath === undefined) {
          throw new Error(`${pth}的peer依赖${name}: ${version}未找到`);
        }
      }
    );
  }

  matchDependency(pth: string, target: string, version: string): string {
    let result: string | undefined = undefined;
    const option: string[] = [];
    //为了找到当前包下面是否有 node_modules 文件夹，如果有的话那么
    const possibleDir = findSpecifiedDirectories(pth, "node_modules").concat([
      posixPathJoin(pth, "node_modules"),
    ]);
    console.log(possibleDir);

    possibleDir.forEach((dir) => {
      const targetPath = posixPathJoin(dir, target);
      //   这一段就是匹配包
      if (this.packageSet[targetPath] !== undefined) {
        if (
          semver.satisfies(this.packageSet[targetPath].version, version) &&
          result === undefined
        ) {
          result = targetPath;
        }
        option.push(targetPath);
      }
    });

    if (result !== undefined) {
      return result;
    }
    if (option.length === 1) {
      return option[0];
    }
    throw new Error(
      `No dependencies matched， src: ${pth}, target: ${target + "@" + version}`
    );
  }

  getPackageSetOfPackageJson(): PackagesSet<PackageJson> {
    return this.packageSet;
  }
}
export { NpmResolver };
