import type { dataType } from '@/types/axios'
import { Request } from './request'
/* 

* @params Baseurl 
* @params timeout 延时
* @params  interceptors 传入的拦截器
* @params  useDefaultReq 是否使用默认的请求拦截器
* @params  interceptors 是否使用默认的相应拦截器
*/

const requestInt = new Request({
  baseURL: '/api',
  timeout: 3000
})
const request = (config): any => {
  return requestInt.request(config)
}

/* 
* get方法
* @params url 
* @params method 传入的参数
* @params params or query 传入的参数

*/

export const getNodes = (params = {}): dataType => {
  return request({
    url: '/api/nodes',
    method: 'get',
    params
  })
}
export const getEdges = (params = {}): dataType => {
  return request({
    url: '/api/edges',
    method: 'get',
    params
  })
}
export const getData = (params = {}): dataType => {
  return request({
    url: '/api/data',
    method: 'get',
    params
  })
}
export const getPackageData = (params = {}): dataType => {
  return request({
    url: '/api/packageData',
    method: 'get',
    params
  })
}
export const getDependencies = (params = {}): dataType => {
  return request({
    url: '/api/dependencies',
    method: 'get',
    params
  })
}
export const getDependenciesList = (params = {}): dataType => {
  return request({
    url: '/api/directDependencyList',
    method: 'get',
    params
  })
}
export const getWhyInstalled = (params = {}): dataType => {
  return request({
    url: '/api/whyInstalled',
    method: 'get',
    params
  })
}
export const searchPackage = (params = {}): dataType => {
  return request({
    url: '/api/searchPackage',
    method: 'get',
    params
  })
}
