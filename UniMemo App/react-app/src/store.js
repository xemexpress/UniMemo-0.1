import { applyMiddleware, createStore, combineReducers } from 'redux'

import common from './reducers/common'
import auth from './reducers/auth'
import home from './reducers/home'
import { promiseMiddleware, localStorageMiddleware } from './middleware'

const reducer = combineReducers({
  common,
  auth,
  home
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducer, middleware)

export default store
