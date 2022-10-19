import { combineReducers } from 'redux'
import user from './user'
import tables from './tables'

export default combineReducers({
  user,
  tables
})