<template>
  <div class="flex h-full w-full flex-col">
    <header
      class="flex h-14 w-full items-center justify-between bg-sky-400 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 text-white shadow-xl"
    >
      <div class="logo-container">full-featured-vite</div>
      <div class="flex items-center">
        <div class="mr-5">北京</div>
        <span class="mx-1 rounded-md bg-purple-500/75 p-1 text-purple-50">{{
          hour
        }}</span>
        :
        <span class="mx-1 rounded-md bg-purple-500/75 p-1 text-purple-50">{{
          min
        }}</span>
        :
        <span class="mx-1 rounded-md bg-purple-500/75 p-1 text-purple-50">{{
          second
        }}</span>
      </div>
    </header>
    <section>123</section>
    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getClock } from 'utils/formatTimeUtils'
const hour = ref()
const min = ref()
const second = ref()
onMounted(() => {
  formatTime()
  setInterval(() => {
    formatTime()
  })
})
const formatTime = (): void => {
  const time = getClock(new Date())
  hour.value = time.h
  min.value = time.m
  second.value = time.s
}
</script>

<style lang="scss" scoped></style>
