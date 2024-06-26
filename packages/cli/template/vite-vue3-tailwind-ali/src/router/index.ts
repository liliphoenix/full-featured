import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './basicRoutes'

export const router = createRouter({
  routes: basicRoutes,
  history: createWebHashHistory()
})

// 全局路由前置守卫
// router.beforeEach((to, _, next) => {
//   const token = getToken()
//   if (token === null) {
//     if (to.name === 'login') {
//       next()
//     } else {
//       next({ path: 'login' })
//     }
//   } else {
//     next()
//   }
// })
