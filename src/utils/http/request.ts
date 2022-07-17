import axios from 'axios'

const baseURL = 'http://localhost:3000'
const service = axios.create({
  baseURL: baseURL,
  timeout: 6000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data) {
      return response.data
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service