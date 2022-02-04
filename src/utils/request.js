// 请求模块
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://www.liulongbin.top:8000', // 接口的基准路径

  // 自定义后端返回的原始数据
  // data 就是后端返回的原始数据，说白了就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

const jsonStr = '{ "art_id": 123481515486413515 }'
console.log(JSON.parse(jsonStr))
// JSON.stringify()

// JSONBig 可以处理数据中超出 JavaScript 安全整数范围的问题
console.log(JSONBig.parse(jsonStr)) // 把JSON 格式的字符串转为 JsonScript 能识别的

// 使用的时候需要把 BigNumber 类型的数据转为字符串来使用
console.log(JSONBig.parse(jsonStr).art_id.toString())

// 需要转换为数字类型
console.log(JSONBig.stringify(JSONBig.parse(jsonStr)))

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // Do something before request is sent
  // config 配置对象：本次请求的请求配置对象
  console.log(config)
  console.log(store)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 如果请求出错了（还没发出去） 会进入这里
  // Do something with request error
  return Promise.reject(error)
})

export default request
