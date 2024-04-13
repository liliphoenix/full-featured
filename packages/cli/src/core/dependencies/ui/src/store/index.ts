import { getEdges, getNodes } from '@/api'
import type { resType } from '@/types/axios'
import type { Node, Edge } from '@/types/graph'

import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      nodes: [],
      edges: []
    }
  },
  actions: {
    async getNodes() {
      try {
        const nodes: resType<Node[]> = await getNodes()
        nodes.forEach((node: Node, index) => {
          console.log(index * 10)
          this.nodes.push({
            id: String(node.id),
            x: 100 + Number(node.depth) * 210,
            y: 100 + index * 10,
            size: [100, 100],
            type: 'rect',
            style: {
              lineWidth: 0.2
            },
            labelCfg: {
              style: {
                fontSize: 15
              }
            },
            label: node.name,
            depth: node.depth,
            version: node.version,
            path: node.path
          })
        })
      } catch (error) {
        console.log(error.message)
      }
    },
    async getEdges() {
      try {
        const edges: resType<Edge[]> = await getEdges()

        edges.forEach((item: Edge, index) => {
          this.edges.push({
            id: String(index),
            source: String(item.from),
            target: String(item.to),
            color: 'red',
            info: item.info,
            style: {}
          })
        })
      } catch (error) {
        console.log(error.message)
      }
    }
  }
})
