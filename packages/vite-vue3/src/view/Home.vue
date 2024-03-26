<template>
  <div class="flex h-full w-full flex-col">
    <header
      class="flex h-14 w-full items-center justify-between px-4 text-white"
    >
      <div class="flex items-center">
        <img class="h-16 w-16" src="assets/images/logo.png" alt="" />
        <span class="text-xl"></span>
      </div>
      <div class="flex items-center text-black">
        <div class="mr-5">{{}}</div>
        <span class="mx-1 rounded-md bg-sky-500/75 p-1 text-purple-50">{{
          hour
        }}</span>
        :
        <span class="mx-1 rounded-md bg-sky-500/75 p-1 text-purple-50">{{
          min
        }}</span>
        :
        <span class="mx-1 rounded-md bg-sky-500/75 p-1 text-purple-50">{{
          second
        }}</span>
      </div>
    </header>
    <section class="flex h-auto w-full flex-col items-center justify-center">
      <img class="h-96 w-96" src="assets/images/logo.png" alt="" />
      <div class="flex">
        <div class="mr-10 rounded-md bg-sky-500 px-5 py-2 text-white">文档</div>
        <div class="btn">Github</div>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getClock } from 'utils/formatTimeUtils'
import { getNumberIP, getWeather } from 'api/index'

const hour = ref()
const min = ref()
const second = ref()
const weather = ref()
onMounted(() => {
  formatTime()
  getNumberIPFun()
  getWeatherFun()
  setInterval(() => {
    formatTime()
  })
})
// 🌸 post 测试
const getNumberIPFun = async (): Promise<any> => {
  const res = await getNumberIP({
    mobile: 15588741204
  })
  console.log(res.data)
}
const getWeatherFun = async (): Promise<any> => {
  const res = await getWeather({
    areacode: 101010200
  })
  console.log(res.data)
  weather.value = res.data
}
const formatTime = (): void => {
  const time = getClock(new Date())
  hour.value = time.h
  min.value = time.m
  second.value = time.s
}
</script>

<style scoped>
.btn {
  @apply rounded-md bg-sky-500 px-5 py-2 text-white;
}
</style>
