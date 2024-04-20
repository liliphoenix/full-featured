import { Queue } from '@datastructures-js/queue'
interface Edge<E> {
  to: number
  from: number
  info: E
}
class Graph<T> {
  edges: Array<Array<Edge<T>>>
  invEdges: Array<Array<Edge<T>>>

  constructor(N: number) {
    this.edges = Array.from({ length: N }, () => Array.from({ length: 0 }))
    this.invEdges = Array.from({ length: N }, () => Array.from({ length: 0 }))
  }
  indexCheck(idx: number) {
    return idx >= 0 && idx < this.edges.length
  }

  addEdge(from: number, to: number, info: T) {
    if (!this.indexCheck(to) || !this.indexCheck(from)) {
      return this
    }
    this.edges[from]!.push({
      from: from,
      to: to,
      info: info
    })
    this.invEdges[to]!.push({
      from: to,
      to: from,
      info: info
    })
    return this
  }

  // 这一层导出边集以及 索引->包的关系
  exportEdges(): Edge<T>[] {
    return this.edges.reduce((res, e) => res.concat(e), [])
  }

  // 某个包为什么会被install?
  // 即找出某个顶点的所有直接、间接前驱
  // 在构建图时， 保存了每条边的反向(相当于建了一个无向图)， 所以使得这部分异常容易
  findPredecessors(id: number) {
    const res = this.subGraph(id, -1, true)
    res.edges = res.edges.map((e) => {
      return {
        from: e.to,
        to: e.from,
        info: e.info
      }
    })
    return res
  }

  // 获得指定深度的子图
  subGraph(root: number, depthLimit: number, inv?: boolean) {
    const depth = Array.from({ length: this.edges.length }, () => 0)
    let resultEdges: Array<Edge<T>> = []
    const resultNodes: { id: number; depth: number }[] = []
    const edgesSource: Array<Array<Edge<T>>> =
      inv === true ? this.invEdges : this.edges
    const queue = new Queue<number>()
    queue.push(root)
    depth[root] = 1

    while (!queue.isEmpty()) {
      const front = queue.dequeue()
      resultNodes.push({
        id: front,
        depth: depth[front] as number
      })
      if (depth[front] === depthLimit) {
        continue
      }
      resultEdges = resultEdges.concat(edgesSource[front]!)
      for (const e of edgesSource[front]!) {
        if (depth[e.to] === 0) {
          depth[e.to] = depth[front]! + 1
          queue.push(e.to)
        }
      }
    }
    return {
      nodes: resultNodes,
      edges: resultEdges
    }
  }
}

export { Graph, Edge }
