<template>
  <div class="">
    <canvas
      ref="demoCanvas"
      :props="props.canWidth"
      :height="props.canHeight"
    ></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  canWidth: {
    type: Number,
    default: 255
  },
  canHeight: {
    type: Number,
    default: 100
  },
  canFont: {
    type: Number,
    default: 40
  }
})
const demoCanvas = ref<null | HTMLCanvasElement>(null)
onMounted(() => {
  paintCanvas()
})
const paintCanvas = (): void => {
  const ctx = demoCanvas.value?.getContext('2d')
  if (demoCanvas.value && ctx) {
    const can = demoCanvas.value
    ctx.font = `bold ${props.canFont}px Arial`
    const grad = ctx?.createLinearGradient(0, 0, can.width, can.height)
    grad.addColorStop(0, '#33a4db')
    grad.addColorStop(0.35, '#33a4db')
    grad.addColorStop(0.5, '#eca915')
    grad.addColorStop(0.75, '#3070c8')
    grad.addColorStop(1, '#3070c8')
    ctx.fillStyle = grad
    ctx.fillText('Full-Featured', 25, 30)
  }
}
</script>

<style lang="scss" scoped></style>
