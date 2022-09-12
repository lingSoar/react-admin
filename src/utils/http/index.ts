import service from './request'

const fetch = (url: string, payload: any = {}, methos: 'GET' = 'GET') => {
  return new Promise((resolve, reject) => {
    const promise = methos === 'GET' ? service.get(url, { params: payload }) : service.post(url, payload);

    promise.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default fetch