import produce from 'immer'
import { SET_USERINF, REMOV_USERINF, CHANGE_USERINF } from '../constant'
import { setUserInf, getUserInf, removeUserInf } from '@/utils/storage/user'

const userInf = getUserInf('userInf')
const initState = {
  roles: userInf?.roles || ['admin'],
  user: userInf || {}
}

export default function user(state = initState, { type, payload }: IDispatchPayload) {

  // 使用produce 进行深复制，就可以直接操作了
  return produce(state, cloneState => {
    switch (type) {
      case SET_USERINF:
        cloneState.user = payload
        cloneState.roles = payload?.roles        
        setUserInf(payload)
        break;
      case REMOV_USERINF:
        cloneState.user = {}
        cloneState.roles = []
        removeUserInf(payload)
        break;
      case CHANGE_USERINF:
        cloneState.user = {...cloneState.user, roles: [payload]}
        break;
      default:
        break;
    }
  })
}