import service from './request'

/**
 * @description 封装的请求函数
 * @param {string} url 接口地址
 * @param {ILogin} payload 请求参数
 * @param {GET | POST | undefined } methos 请求的方法，不传默认为post 请求
 * @return Promise
 */
const fetch = (url: string, payload: any = {}, methos?: 'GET' | 'POST' | undefined) => {
  return new Promise((resolve, reject) => {
    const promise = methos === 'GET' ? service.get(url, { params: payload }) : service.post(url, payload)

    promise.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default fetch