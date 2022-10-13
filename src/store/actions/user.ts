import { fetchLogin } from '@/utils/http/api'
import { SET_USERINF, REMOVE_USERINF, CHANGE_USERINF } from '../constant'


/**
 * @description 存储用户信息
 * @param {IUser} payload 用户的账号密码
 * @return () => void
 */
export const setUserInf = (payload: IUser) => {
  return async (dispatch: (arg0: IDispatchPayload<any>) => void) => {
    // 发送请求，登录
    const res = await fetchLogin(payload) as any

    if (res.code === 0) {
      dispatch({ type: SET_USERINF, payload: res })
    }
  }
}

/**
 * @description 删除用户信息
 * @param {string} payload 本地存储的键名
 * @return () => IDispatchPayload<T>
 */
export const removeUserInf = (payload: string): IDispatchPayload<any> => ({ type: REMOVE_USERINF, payload })

/**
 * @description 修改用户信息
 * @param {string} payload 用户名
 * @return () => IDispatchPayload<T>
 */
export const changeUserInf = (payload: string): IDispatchPayload<any> => ({ type: CHANGE_USERINF, payload })