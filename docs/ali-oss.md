
初始化oss链接API方法，
```js
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

```
在pinia封装好了ali-oss的store仓库，首先派发initOss方法,这里调用了api并且初始化了ali-oss
```js
    initOss: async function (): Promise<any> {
      try {
        const res: any = await initOssApi()
        const oss = new OSS({
          region: 'oss-cn-beijing',
          accessKeyId: res.credentials.AccessKeyId,
          accessKeySecret: res.credentials.AccessKeySecret,
          stsToken: res.credentials.SecurityToken,
          bucket: 'full-featured-test',
          refreshSTSTokenInterval: 300000,
          endpoint: 'oss-cn-beijing.aliyuncs.com'
        })
        this.client = oss
      } catch (error) {
        console.log(error)
      }
    },
```