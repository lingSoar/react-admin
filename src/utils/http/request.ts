import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { message, Modal } from 'antd'
import storage from '@/utils/storage'
import AdminConfig, { BASE_URL } from '@/config'
interface ResponseData<T> {
  code: number,
  data: T,
  msg: string,
  status: number,
}

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 6000
})

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = storage.getStorage(AdminConfig.TOKEN_KEY)

    // 获取用户token，用于校验
    if (token) {
      (config as any).headers.token = token
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    return response.data.data

    if (!response.data) {
      return Promise.resolve(response)
    }

    // 登录已过期或者未登录
    if (response.data.code === AdminConfig.LOGIN_EXPIRE) {
      Modal.confirm({
        title: '系统提示',
        content: response.data.msg,
        okText: '重新登录',
        onOk() {
          // store.dispatch(clearSideBarRoutes())
          // store.dispatch(logout())
          window.location.href = `${window.location.origin
            }/login?redirectURL=${encodeURIComponent(window.location.href)}`
        },
        onCancel() {
          console.log('取消')
        },
      })

      return Promise.reject(new Error(response.data.msg))
    }

    // 请求成功时
    if (response.data.code === AdminConfig.SUCCESS_CODE && response.data) {
      return response.data as any
    }

    // 请求成功，状态不为成功时
    message.error(response.data.msg)
    return Promise.reject(new Error(response.data.msg))
  },
  (error: AxiosError) => {
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default service