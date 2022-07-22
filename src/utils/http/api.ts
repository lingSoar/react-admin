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

// 模拟一个数据库，存储登录用户的用户名及密码
interface IUserStore {
  admin: Array<string>,
  visitor: Array<string>,
  editor: Array<string>,
  [propName: string]: Array<string>  // 支持添加用户: 用户名: [密码]
}
const userStore: IUserStore = {
  admin: ['admin'],
  visitor: ['visitor'],
  editor: ['editor'],
  ling: ['123'],
}

// 模拟一个接口请求
function mockApi(url: string, payload: ILogin) {
  const login = (data: ILogin) => {
    return new Promise((resolve, reject) => {
      const { username, password } = data
      const success = (role: string): IResponseUser => ({ code: 0, roles: [role], success: '登录成功' })
      const error = (error: string): IResponseUser => ({ code: 101, error })

      // 如果没有用户，直接返回
      if (!userStore[username]) return reject(error('用户不存在'))
      // 有用户，但是用户密码错误，则直接返回
      if (userStore[username] && !userStore[username]?.includes(password)) return reject(error('用户密码错误'))
      resolve(success(username))
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
