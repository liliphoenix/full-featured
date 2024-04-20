import { dependenciesType } from '../core/dependencies/enums/dependenciesType'

export const Root: string = ''
export type PackagesSet<T> = { [path: string]: T }
type DependenciesMap = { [packageName: string]: string }
interface PackageJson {
  name: string
  version: string
  workspaces?: string[]
  license?: string | object[]
  [dependenciesType.Dependencies]?: DependenciesMap
  [dependenciesType.DevDependencies]?: DependenciesMap
  [dependenciesType.PeerDependencies]: DependenciesMap
  [dependenciesType.OptionalDependencies]?: DependenciesMap
  bundledDependencies?: string[]
  depth?: number
  dev?: boolean
}
interface PackageInfo {
  name: string
  version: string
  path: string
  depth: number
  id: number
}

export { PackageJson, PackageInfo, DependenciesMap }
