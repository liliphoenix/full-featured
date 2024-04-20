import { PackageInfo } from './PackageJson'
import { dependenciesType } from '../core/dependencies/enums/dependenciesType'

interface Edge {
  from: number
  to: number
  info: dependenciesType
}

interface GraphData {
  nodes: PackageInfo[]
  edges: Edge[]
  licenses: {
    [name: string]: number
  }
}

export { GraphData }
