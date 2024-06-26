/* eslint-disable no-extra-semi */
import { PackageInfo } from '../../../types/PackageJson'
import { dependenciesType } from '../enums/dependenciesType'
import Fuse from 'fuse.js'

import { Edge, Graph } from './Graph'
import { JsonData } from '../../../types/JsonData'
import { GraphData } from '../../../types/GraphData'
export const DEFAULT_DEPTH = 0
export const DEFAULT_ID = -1
class DependencyGraph {
  graph: Graph<dependenciesType>
  index: Map<string, number>
  packages: Array<PackageInfo>
  constructor(packages: Array<PackageInfo>) {
    this.graph = new Graph(packages.length)
    this.index = new Map<string, number>()
    packages.forEach((v, idx) => {
      this.index.set(v.path, idx)
      v.id = idx
    })
    this.packages = packages
  }
  addDependency(pth1: string, pth2: string, type: dependenciesType) {
    if (this.index.has(pth1) && this.index.has(pth2)) {
      this.graph.addEdge(
        this.index.get(pth1) as number,
        this.index.get(pth2) as number,
        type
      )
    } else {
      throw new Error('传入的路径错误！ by DependencyGraph > addDependency')
    }
  }

  setPackageDepth(pth: string, depth: number): void {
    if (this.index.has(pth)) {
      ;(this.packages[this.index.get(pth) as number] as PackageInfo).depth =
        depth
    }
  }
  exportEdges() {
    return this.graph.exportEdges()
  }

  exportPackages() {
    return this.packages.filter((e) => e.depth !== 0)
  }

  exportToJson() {
    const res: JsonData = {}
    const edges = this.graph.edges
    this.packages.forEach((v, idx) => {
      res[v.path] = {
        name: v.name,
        version: v.version,
        dependencies: []
      }
      ;(edges[idx] as Edge<dependenciesType>[]).forEach((e) => {
        if (
          res[v.path] !== undefined &&
          res[v.path]!['dependencies'] !== undefined
        ) {
          res[v.path]!.dependencies.push(
            (this.packages[e.to] as PackageInfo).path
          )
        }
      })
    })
    for (let i = 0; i < this.packages.length; i++) {
      res[this.packages[i]!.path] = {
        name: this.packages[i]!.name,
        version: this.packages[i]!.version,
        dependencies: []
      }
      for (const edge of edges[i]!) {
        res[this.packages[i]!.path]!.dependencies.push(
          this.packages[edge.to]!.path
        )
      }
    }
    return res
  }

  // 单独查看某个包的依赖
  getSpecifiedPackageDependencies(id: number, depthLimit: number): GraphData {
    const { nodes, edges } = this.graph.subGraph(id, depthLimit)
    return {
      nodes: nodes.map((e) => {
        const info: PackageInfo = { ...this.packages[e.id] } as PackageInfo
        info.depth = e.depth
        return info
      }),
      edges: edges,
      licenses: {}
    }
  }

  // 获得某个包的直接依赖
  getDirectDependency(id: number) {
    return {
      list: this.graph.edges[id]!.map((e) => {
        return this.packages[e.to]
      })
    }
  }

  // why installed it
  whyInstalledIt(id: number): GraphData {
    const { nodes, edges } = this.graph.findPredecessors(id)
    return {
      nodes: nodes.map((e) => {
        const info: PackageInfo = { ...this.packages[e.id] } as PackageInfo
        info.depth = e.depth
        return info
      }),
      edges: edges,
      licenses: {}
    }
  }

  // 包名查询
  queryPackage(searchPattern: string) {
    const fuseOptions = {
      keys: ['name', 'version']
    }
    const fuse = new Fuse(this.packages, fuseOptions)
    return {
      data: fuse.search(searchPattern)
    }
  }
}
export { DependencyGraph }
