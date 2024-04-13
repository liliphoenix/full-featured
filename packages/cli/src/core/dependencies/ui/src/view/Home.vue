<template>
  <div class="flex h-full w-full flex-col">
    <div id="container" class="h-screen w-screen"></div>
  </div>
</template>

<script lang="ts" setup>
import G6 from '@antv/g6'
import { ref, onMounted } from 'vue'
import { useStore } from '@/store'
const store = useStore()
const graph = ref()

onMounted(() => {
  graph.value = new G6.Graph({
    container: document.getElementById('container') ?? 'error',
    width: 1510,
    height: 830,
    fitView: true,
    fitViewPadding: 10,
    modes: {
      default: ['drag-canvas', 'drag-node', 'click-select', 'zoom-canvas']
    }
  })
  setNodeShape()
  renderData()
})
const renderData = async (): Promise<any> => {
  await store.getNodes()
  await store.getEdges()
  handleGraph()
}

const handleGraph = (): void => {
  console.log(store.nodes)
  console.log(store.edges)

  graph.value.data({
    nodes: store.nodes,
    edges: store.edges
  })
  graph.value.render()

  // setNodeShape()
}
const setNodeShape = (): void => {
  const group = graph.value.getGroup()
  group.addShape('rect', {
    name: 'rect-shape',
    attrs: {
      fill: 'red',

      shadowColor: 'blue',
      shadowBlur: 10,
      opacity: 0.8
    }
  })
}
</script>

<style scoped>
.btn {
  @apply cursor-pointer rounded-md bg-sky-500 px-5 py-2 text-white hover:bg-sky-600;
}
</style>
