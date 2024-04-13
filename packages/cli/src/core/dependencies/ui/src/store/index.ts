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
            y: 100 + index * 50,
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
            id: 'edge' + String(index),
            source: String(item.from),
            target: String(item.to),
            color: 'grey',
            info: item.info,
            style: {
              endArrow: {
                path: 'M 0,0 L 8,4 L 8,-4 Z',
                fill: '#e2e2e2'
              },
              radius: 20
            }
          })
        })
      } catch (error) {
        console.log(error.message)
      }
    }
  }
})
