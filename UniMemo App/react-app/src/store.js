import { applyMiddleware, createStore } from 'redux'

import { promiseMiddleware } from './middleware'

import {
  HOME_PAGE_LOADED
} from './constants/actionTypes'

const defaultState = {
  appName: 'UniMemo',
  requests: null
}
const reducer = (state=defaultState, action) => {
  switch(action.type){
    case HOME_PAGE_LOADED:
      return {
        ...state,
        requests: action.payload.requests
      }
    default:
  }
  return state
}

const store = createStore(reducer, applyMiddleware(promiseMiddleware))

export default store
