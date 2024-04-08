<template>
  <div class="container">
    <div>
      <Button class="btn" type="primary" @click="getNumberIPFun">{{
        $t('postTest')
      }}</Button>
      <div class="search-container">
        <a-input-search
          v-model="phoneNumber"
          :placeholder="$t('inputNumber')"
          :enter-button="$t('search')"
          size="large"
          @search="getNumberIPFun"
        />
      </div>
      <span>{{ $t('phoneNumberCity') }}{{ postTest }}</span>
    </div>
    <div>
      <Button class="btn" type="primary" @click="getWeatherFun">{{
        $t('getTest')
      }}</Button>
      <div>{{ $t('weatherFromBeijing') }}{{ getTest }}</div>
    </div>
    <!-- <a-upload name="file" action="" :custom-request="uploadFile"> -->

    <SvgCom name="vite-test1"></SvgCom>
    <SvgCom name="vite-test2"></SvgCom>
    <div
      class="cloud fixed right-2 top-2 cursor-pointer rounded-xl bg-sky-600 p-2 text-white"
      @click="jump"
    >
      Back
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Button } from 'ant-design-vue'
import { getNumberIP, getWeather } from 'api/index'
import { getUserDevice } from 'utils/locationUtils'
import { router } from '@/router'

const postTest = ref()
const getTest = ref()
const phoneNumber = ref()
onMounted(async () => {
  console.log(getUserDevice())
})
// 🌸 post 测试
const getNumberIPFun = async (): Promise<any> => {
  const res = await getNumberIP({
    mobile: phoneNumber.value
  })
  postTest.value = res.data.city
  console.log(res.data)
}
// 🌸 get测试
const getWeatherFun = async (): Promise<any> => {
  const res = await getWeather({
    areacode: 101010100
  })
  getTest.value = res.result.realtime.text
}

// 🌸 跳转
const jump = (): void => {
  router.push('/home')
}
</script>

<style lang="less" scoped>
.container {
  .flex-col();
  div,
  input,
  span,
  button {
    margin: 5px;
  }
  .search-container {
    width: 400px;
  }
  .cloud {
    position: fixed;
    cursor: pointer;
    right: 20px;
    top: 20px;
    padding: 10px 10px;
    border-radius: 20px;
    color: white;
    background: #3875f6;
  }
  .cloud:hover {
    background: #1856dc;
  }
}
</style>
