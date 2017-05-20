import { applyMiddleware, createStore, combineReducers } from 'redux'

import common from './reducers/common'
import auth from './reducers/auth'
import home from './reducers/home'
import { promiseMiddleware } from './middleware'

const reducer = combineReducers({
  common,
  auth,
  home
})

const middleware = applyMiddleware(promiseMiddleware)

const store = createStore(reducer, middleware)

export default store
