---
outline: deep
---

### 前言

axios进行二次封装、axios所有的方法和变量都已经添加了ts类型，如果进行修改的话可以根据类型提示进行修改

### 请求拦截器

具体实现

- 检查用户的登录状态
- token身份验证
- 自定义请求头
  通过参数重添加selfHeader,即可实现自定义请求头的添加

```js

export const getWeather = (params = {}): dataType => {
  return request({
    url: '/456456/weather/v001/now',
    method: 'get',
    params,
    // 🌸 自定义请求头的添加
    selfHeader: {
      'X-APISpace-Token	': 'n30k9jlfyucfa7k4ogr58xeuxjb3ghqh'
    }
  })
}

```

### 响应拦截器

对各种状态码进行错误信息提示

```js
          case 400:
            message = '请求错误(400)'
            break
          case 401:
            message = '未授权，请重新登录(401)'
            // 这里可以做清空storage并跳转到登录页的操作
            break
          case 403:
            message = '拒绝访问(403)'
            break
          case 404:
            message = '请求出错(404)'
            break
          case 408:
            message = '请求超时(408)'
            break
          case 500:
            message = '服务器错误(500)'
            break
          case 501:
            message = '服务未实现(501)'
            break
          case 502:
            message = '网络错误(502)'
            break
          case 503:
            message = '服务不可用(503)'
            break
          case 504:
            message = '网络超时(504)'
            break
          case 505:
            message = 'HTTP版本不受支持(505)'
            break
```

### 具体使用案例

```js
// upload 上传请求
export const initOssApi = (params = {}): dataType => {
  return upload({
    url: '',
    method: 'get',
    params,
    selfHeader: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-APISpace-Token	': 'yzhc6eziyefcvr8o1luh8wl1rifkka1u'
    }
  })
}
// 普通请求
export const getWeather = (params = {}): dataType => {
  return request({
    url: '/456456/weather/v001/now',
    method: 'get',
    params,
    selfHeader: {
      'X-APISpace-Token	': 'n30k9jlfyucfa7k4ogr58xeuxjb3ghqh'
    }
  })
}

```

### 展望和补充

还缺少普通的一些文件上传函数的封装，后续会补充上
