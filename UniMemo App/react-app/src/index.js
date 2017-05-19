import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './components/App'
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

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))
