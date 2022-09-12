/* eslint-disable-next-line */
import produce from 'immer'
import { SET_USERINF, REMOV_USERINF, CHANGE_USERINF } from '../constant'
import { setLocal, getLocal, removeLocal } from '@/utils/storage'

const userInf = getLocal('userInf')
const initState: userState = {
  roles: userInf?.roles || ['admin'],
  user: userInf || {}
}

const userReducer = (state: userState = initState, { type, payload }: IDispatchPayload<any>) => {

  // 使用produce 进行深复制，就可以直接操作了
  return produce(state, cloneState => {
    switch (type) {
      case SET_USERINF:
        cloneState.user = payload
        cloneState.roles = payload?.roles
        setLocal('userInf', payload)
        break;
      case REMOV_USERINF:
        cloneState.user = {}
        cloneState.roles = []
        removeLocal(payload)
        break;
      case CHANGE_USERINF:
        cloneState.user = { ...cloneState.user, roles: [payload] }
        break;
      default:
        break;
    }
  })
}

export default userReducer