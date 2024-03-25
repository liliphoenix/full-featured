<template>
  <div class="flex h-full w-full flex-col">
    <header
      class="flex h-14 w-full items-center justify-between bg-gradient-to-r from-violet-500 to-cyan-500 px-4 text-white shadow-xl"
    >
      <div class="flex items-center">
        <img class="h-16 w-16" src="assets/images/logo.png" alt="" />
        <span class="text-xl"></span>
      </div>
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
    <section class="flex h-auto w-full flex-col items-center justify-center">
      <img class="h-96 w-96" src="assets/images/logo.png" alt="" />
      <h1 class="text text-5xl">full-featured</h1>
    </section>
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
