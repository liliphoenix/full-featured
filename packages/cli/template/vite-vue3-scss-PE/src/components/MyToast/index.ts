import toastTemplate from './index.vue'
import { createElement, render } from 'vue'
export interface IProps {
  value?: string
  duration?: number
  type?: string
}
const defaultOpt = {
  // 创建默认参数
  duration: 3000
}
const Toast = (options: IProps): any => {
  const divDom = document.createElement('div')
  const optionsAll = { ...defaultOpt, ...options }
  const vNode = createElement(toastTemplate, optionsAll)
  render(vNode, divDom)
  document.appendChild(divDom)
  const destory = (): void => {
    if (document.querySelector('.toast-container')) {
      document.querySelector('.toast-container').classList.add('remove')
      const t = setTimeout(() => {
        render(null, divDom)
        document.removeChild(divDom)
        clearTimeout(t)
      }, 500)
    }
  }
  if (optionsAll.duration) {
    const timer = setTimeout(() => {
      destory()
      clearTimeout(timer)
    }, optionsAll.duration)
  }
  return () => {
    destory()
  }
}
export default Toast
