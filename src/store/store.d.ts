/**
 * @description user：用户的state 类型定义
 */
interface IUserState {
  roles: string[],
  user: {
    code?: number,
    roles?: Array<string>,
    success?: string,
    error?: string
  }
}

/**
 * @description tables：头部的tabs 标签页的类型定义
 */
interface ITable {
  title: string
  path: string
}

interface ITableState {
  tableList: ITable[]
}

/**
 * @description dispatch 派发action 的类型定义
 */
interface IDispatchPayload<T> {
  type: string
  payload?: T
}

/**
 * @description 用户登录信息的类型定义
 */
interface IUser {
  username: string
  password: string
}
 
/**
 * @description store 的类型定义
 */
interface IStore {
  user: IUserState
  tables: ITableState
}