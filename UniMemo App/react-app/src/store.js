import { applyMiddleware, createStore, combineReducers } from 'redux'

import common from './reducers/common'
import auth from './reducers/auth'
import home from './reducers/home'
import profile from './reducers/profile'
import settings from './reducers/settings'
import request from './reducers/request'
import contentList from './reducers/contentList'
import requestEditor from './reducers/requestEditor'
import { promiseMiddleware, localStorageMiddleware } from './middleware'

const reducer = combineReducers({
  common,
  auth,
  home,
  profile,
  settings,
  request,
  contentList,
  requestEditor
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducer, middleware)

export default store
