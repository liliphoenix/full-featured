<template>
  <div class="container">
    <header class="nav">
      <div class="flex items-center">
        <img src="assets/logo.png" alt="" />
      </div>
      <div class="info-container">
        <div class="language-container">
          <a-select v-model="lang" @change="handleChange">
            <a-select-option :value="$t('zh')">{{ $t('zh') }}</a-select-option>
            <a-select-option :value="$t('en')">{{ $t('en') }}</a-select-option>
          </a-select>
        </div>
        <div class="time-container">
          <span>{{ hour }}</span>
          :
          <span>{{ min }}</span>
          :
          <span>{{ second }}</span>
        </div>
      </div>
    </header>
    <section class="main-container">
      <img src="assets/logo.png" alt="" />
      <div class="link-container">
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
import { ref, onMounted } from 'vue'
import { getClock } from 'utils/formatTimeUtils'
import { getNumberIP, getWeather } from 'api/index'
import i18n from 'i18n/index'
import { useI18n } from 'vue-i18n'
import { router } from '@/router'
const { locale } = useI18n()
const t = i18n.global.t
// const $t = getVueGlobalValue().$trans()
const hour = ref()
const min = ref()
const second = ref()
const weather = ref()
const lang = ref(t('en'))
onMounted(() => {
  formatTime()
  getNumberIPFun()
  getWeatherFun()
  setInterval(() => {
    formatTime()
  })
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

<style lang="less" scoped>
.container {
  .flex-col-cen();
  .nav {
    .flex-row-cen();
    justify-content: space-between;
    height: 50px;
    width: 100%;
    padding: 4px;
    & img {
      height: 60px;
      width: 60px;
    }
    .info-container {
      .flex-row-cen();
      width: 300px;
      .language-container {
        margin-right: 30px;
      }
    }
    .time-container {
      .flex-row-cen();
      width: 160px;
      & span {
        display: block;
        margin: 0 5px;
        padding: 3px 8px;
        border-radius: 15px;
        color: white;
        background-color: #6fabdc;
      }
    }
  }
  .main-container {
    .flex-col-cen();
    width: 100%;
    height: auto;
    & img {
      width: 520px;
      height: 520px;
    }
    .link-container {
      display: flex;
    }
    .btn {
      cursor: pointer;
      margin-right: 20px;
      border-radius: 10px;
      padding: 10px;
      color: white;
      background-color: #30b5e1;
    }
    .btn:hover {
      background-color: #218fb4;
    }
  }
}
</style>
