import { SET_USERINF, REMOV_USERINF, CHANGE_USERINF } from '../constant'
import { fetchLogin } from '@/utils/http/api'

export const getUserInf = (payload: IUser) => {
  return async (dispatch: (arg0: IDispatchPayload<any>) => void) => {
    // 发送请求，登录
    const res = await fetchLogin(payload) as any

    if (res.code === 0) {
      dispatch({ type: SET_USERINF, payload: res })
    }
  }
}

export const clearUserInf = (payload: string): IDispatchPayload<any> => ({ type: REMOV_USERINF, payload })

export const changeUserInf = (payload: string): IDispatchPayload<any> => ({ type: CHANGE_USERINF, payload })