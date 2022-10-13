import { SET_TABLES, REMOVE_TABLES, CLEAR_TABLES } from '../constant'

/**
 * @description 存储头部的tabs 标签页
 * @param {ITable} payload 需要存储的标签
 * @return () => IDispatchPayload<T>
 */
export const setTableLists = (payload: ITable): IDispatchPayload<any> => ({ type: SET_TABLES, payload })

/**
 * @description 删除头部某项标签
 * @param {ITable[]} payload 删除头部某项标签后的tabs 标签页
 * @return () => IDispatchPayload<T>
 */
export const removeTableLists = (payload: ITable[]): IDispatchPayload<any> => ({ type: REMOVE_TABLES, payload })

/**
 * @description 清除所有的标签
 * @return () => IDispatchPayload<T>
 */
export const clearTableLists = (): IDispatchPayload<any> => ({ type: CLEAR_TABLES })