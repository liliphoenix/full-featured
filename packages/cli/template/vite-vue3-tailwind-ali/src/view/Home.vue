<template>
  <div class="flex h-full w-full flex-col">
    <header
      class="flex h-14 w-full items-center justify-between px-4 text-white"
    >
      <div class="flex items-center">
        <img class="h-16 w-16" src="assets/logo.png" alt="" />
        <demo-canvas :can-height="35" :can-font="30"></demo-canvas>
      </div>
      <div class="flex w-72 items-center text-black">
        <div class="mr-5">
          <a-select v-model:value="lang" class="w-24" @change="handleChange">
            <a-select-option :value="$t('zh')">{{ $t('zh') }}</a-select-option>
            <a-select-option :value="$t('en')">{{ $t('en') }}</a-select-option>
          </a-select>
        </div>
        <div>
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
      </div>
    </header>
    <section class="flex h-auto w-full flex-col items-center justify-center">
      <img class="h-72 w-72" src="assets/logo.png" alt="" />
      <demo-canvas></demo-canvas>

      <div class="flex">
        <div class="btn mr-10">
          <a
            target="_blank"
            href="https://liliphoenix.github.io/full-featured/"
          >
            {{ $t('doc') }}
          </a>
        </div>
        <div class="btn mr-10">
          <a target="_blank" href="https://github.com/liliphoenix/full-featured"
            >Github</a
          >
        </div>
        <div class="btn" @click="jump">{{ $t('test') }}</div>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import { userInfoStore } from '@/store/userInfo'
import { ref, onMounted } from 'vue'
import { getClock } from 'utils/formatTimeUtils'
import { getNumberIP, getWeather } from 'api/index'
import i18n from 'i18n/index'
import { useI18n } from 'vue-i18n'
import { router } from '@/router'
const { locale } = useI18n()
const t = i18n.global.t
const store = userInfoStore()

// const $t = getVueGlobalValue().$trans()
const hour = ref()
const min = ref()
const second = ref()
const weather = ref()
const lang = ref(t('en'))
const testSet = 0
onMounted(() => {
  formatTime()
  getNumberIPFun()
  getWeatherFun()
  setInterval(() => {
    formatTime()
  })
  store.username = 'bobi'
  store.password = '不许看！！'
  console.log(testSet)
})
// 🌸 语言切换
const handleChange = (value): void => {
  if (value === '中文' || value === 'Chinese') {
    locale.value = 'zh'
    lang.value = t('zh')
  }
  if (value === '英语' || value === 'English') {
    locale.value = 'en'
    lang.value = t('en')
  }
}

// 🌸 跳转

const jump = (): void => {
  router.push('/test')
}

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
  @apply cursor-pointer rounded-md bg-sky-500 px-5 py-2 text-white hover:bg-sky-600;
}
</style>
