<template>
  <div>
    <div>
      <h1 class="bg-black">{{ $t('hello') }}</h1>
    </div>
    <Button type="primary" @click="getNumberIPFun">testAxios-Post</Button>
    <Button type="primary" @click="getWeatherFun">testAxios-Get</Button>
    <!-- <a-upload name="file" action="" :custom-request="uploadFile"> -->

    <a-button>
      <upload-outlined></upload-outlined>
      Click to Upload (multipart)
    </a-button>

    <a-table :data-source="dataSource" :columns="columns" />
    <a-input-search
      v-model:value="filename"
      placeholder="input search text"
      enter-button="download"
      size="large"
    />

    <SvgCom name="logo-a"></SvgCom>
    <img src="assets/images/pit1.png" alt="" />
    <img src="assets/images/pit1copy.png" alt="" />
    <img src="assets/images/jpg1.jpeg" alt="" />
    <img src="assets/images/jpg2.jpg" alt="" />
    <!-- <a-upload name="file" action="" :custom-request="streamUploadFile">
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload (stream)
      </a-button>
    </a-upload> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { Button } from 'ant-design-vue'
import { getNumberIP, getWeather } from 'api/index'
const dataSource = ref([
  {
    name: 'xx',
    url: 'xxx'
  }
])
const filename = ref()
const columns = ref([
  {
    title: '文件名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'url',
    dataIndex: 'url',
    key: 'url'
  }
])
onMounted(async () => {})
// 🌸 post 测试
const getNumberIPFun = async (): Promise<any> => {
  const res = await getNumberIP({
    mobile: 15588741204
  })
  console.log(res.data)
}
// 🌸 get测试
const getWeatherFun = async (): Promise<any> => {
  const res = await getWeather({
    areacode: 110101
  })
  console.log(res.data)
}
</script>

<style lang="sass" scoped></style>
