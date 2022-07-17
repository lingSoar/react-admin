/**
 * redux 的类型声明文件
 */

// dispatch 派发action 的类型定义
interface IDispatchPayload {
  type: string
  payload?: any
}

// 用户登录信息的类型定义
interface IUser {
  username: string
  password: string
}