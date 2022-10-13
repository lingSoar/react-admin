// eslint-disable-next-line import/no-named-as-default
import produce from 'immer'
import storage from '@/utils/storage'
import { SET_TABLES, REMOVE_TABLES, CLEAR_TABLES } from '../constant'

const tableList = storage.getStorage('header_tables')
const initTableList = [
  {
    title: '首页',
    path: '/home'
  }
]

const initState: ITableState = {
  tableList: tableList || initTableList
}

/**
 * @description 处理头部的tabs 标签页
 * @param {ITableState} state 初始化的state
 * @param {IDispatchPayload<T>} action 派发的action
 * @return void
 */
const tableReducer = (state: ITableState = initState, { type, payload }: IDispatchPayload<any>) => {

  return produce(state, cloneState => {
    switch (type) {
      case SET_TABLES:
        cloneState.tableList = [...state.tableList, payload]
        storage.setStorage('header_tables', cloneState.tableList)
        break
      case REMOVE_TABLES:
        cloneState.tableList = payload
        storage.setStorage('header_tables', payload)
        break
      case CLEAR_TABLES:
        cloneState.tableList = initTableList
        storage.setStorage('header_tables', initTableList)
        break
      default:
        break
    }
  })
}

export default tableReducer