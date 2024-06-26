// 数据存储到sessionStorage中
import { defineStore } from 'pinia'

export const userInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      username: 'name',
      password: '123456'
    }
  },
  actions: {},
  // 是否将数据存储到sessionStorage
  persist: {
    enabled: true
  }
})
