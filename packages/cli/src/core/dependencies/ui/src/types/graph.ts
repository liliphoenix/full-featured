export interface Node {
  depth: string
  id: number
  name: string
  path: string
  version: string
}
export interface Edge {
  from: number
  to: number
  info: string
}
export interface storeData {
  nodes: Node[]
  edges: Edge[]
}
