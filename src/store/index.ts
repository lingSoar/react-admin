import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk'
import reducers from './reducers'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

let store = createStore(reducers, compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(logger),
  ))

 store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store