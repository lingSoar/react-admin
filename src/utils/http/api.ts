// import fetch from '.';

interface ILogin {
  username: string
  password: string
}

interface IResponseUser {
  code: number
  roles?: string[]
  success?: string
  error?: string
}

// 模拟一个接口请求
function mockApi(url: string, payload: ILogin) {
  const login = (data: ILogin) => {
    return new Promise((resolve, reject) => {
      const { username, password } = data
      const success = (role: string): IResponseUser => ({ code: 0, roles: [role], success: '登录成功' })
      const error: IResponseUser = { code: 101, error: '账号不存在或者是账密错误' }

      if (username === 'admin' && password === 'admin') {
        resolve(success('admin'))
      } else if (username === 'visitor' && password === 'visitor') {
        resolve(success('visitor'))
      } else if (username === 'editor' && password === 'editor') {
        resolve(success('editor'))
      } else {
        reject(error)
      }
    })
  }

  switch (url) {
    case '/login':
      return login(payload)
    default:
      return
  }

}
export const fetchLogin = ({ username, password }: ILogin) => mockApi('/login', { username, password })
