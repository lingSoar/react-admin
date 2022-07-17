import fetch from '.';

interface ILogin {
  username: string
  password: string
}

// 模拟一个接口请求
function mockApi(url: string, payload: ILogin) {
  const login = (data: ILogin) => {
    return new Promise((resolve, reject) => {
      const { username, password } = data
      
      if (username === 'admin' && password === 'admin') {
        resolve({ code: 0, roles: ['admin'], success: '登录成功' })
      } else if (username === 'visitor' && password === 'visitor') {
        resolve({ code: 0, roles: ['visitor'], success: '登录成功' })
      } else if (username === 'editor' && password === 'editor') {
        resolve({ code: 0, roles: ['editor'], success: '登录成功' })
      } else {
        reject({ code: 101, error: '账号不存在或者是账密错误' })
      }
    })
  }

  switch (url) {
    case '/login':
      return login(payload)
    default:
      break;
  }

}
export const fetchLogin = ({ username, password }: ILogin) => mockApi('/login', { username, password })
