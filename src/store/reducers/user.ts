// eslint-disable-next-line import/no-named-as-default
import produce from 'immer'
import { SET_USERINF, REMOVE_USERINF, CHANGE_USERINF } from '../constant'
import storage from '@/utils/storage'

const userInf = storage.getStorage('userInf')
const initState: IUserState = {
  roles: userInf?.roles || ['admin'],
  user: userInf || {}
}

/**
 * @description 处理登录后，个人信息的reducer
 * @param {IUserState} state 初始化的state
 * @param {IDispatchPayload<T>} action 派发的action
 * @return void
 */
const userReducer = (state: IUserState = initState, { type, payload }: IDispatchPayload<any>) => {

  // 使用produce 进行深复制，就可以直接操作了
  return produce(state, cloneState => {
    switch (type) {
      case SET_USERINF:
        cloneState.user = payload
        cloneState.roles = payload?.roles

        storage.setStorage('userInf', payload)
        break
      case REMOVE_USERINF:
        cloneState.user = {}
        cloneState.roles = []

        storage.removeStorage(payload)
        break
      case CHANGE_USERINF:
        cloneState.user = { ...cloneState.user, roles: [payload] }
        break
      default:
        break
    }
  })
}

export default userReducer