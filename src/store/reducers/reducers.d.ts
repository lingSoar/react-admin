/**
 * reducer 的类型定义
 */

// user 的类型
interface userState {
  roles: string[],
  user: {
    code?: number,
    roles?: Array<string>,
    success?: string,
    error?: string
  }
}