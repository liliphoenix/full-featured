<template>
  <div ref="container" class="overflow-scroll" @scroll="setPoll">
    <div class="relative" :style="{ height: `${totalSize}px` }">
      <div
        v-for="item in pool"
        :key="item.id"
        class="absolute left-0 top-0 w-full bg-slate-100"
        :style="{
          height: itemSize + 'px',
          transform: `translateY(${item.position}px)`
        }"
      >
        <slot name="item" :data="item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
const container = ref()
// eslint-disable-next-line vue/require-prop-types
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  itemSize: {
    type: Number,
    default: 100
  }
})
const totalSize = computed(() => {
  return props.items.length * props.itemSize
})
onMounted(() => {
  console.log(props.items)
  setPoll()
})
const setPoll = (): void => {
  const scrollTop = container.value.scrollTop
  const height = container.value.clientHeight
  const startIndex = Math.floor(scrollTop / props.itemSize)
  const endIndex = Math.ceil((scrollTop + height) / props.itemSize)
  const scrollPos = startIndex * props.itemSize

  pool.value = props.items.slice(startIndex, endIndex).map((it: number, i) => {
    return {
      id: it,
      position: scrollPos + i * props.itemSize
    }
  })

  console.log(props.items)
}
const pool = ref([
  {
    id: 0,
    position: 0
  }
])
</script>

<style></style>
