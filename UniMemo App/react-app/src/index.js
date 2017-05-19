import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './components/App'

import {

} from './constants/actionTypes'

const defaultState = {
  appName: 'UniMemo',
  requests: null
}
const reducer = (state=defaultState, action) => {
  switch(action.type){
    default:
  }
  return state
}

const store = createStore(reducer)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))
