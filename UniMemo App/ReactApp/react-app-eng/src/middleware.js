import agent from './agent'

import {
  ASYNC_START,
  LOGIN,
  REGISTER,
  LOGOUT,
  APP_LOAD
} from './constants/actionTypes'

const promiseMiddleware = store => next => action => {
  if(isPromise(action.payload)){
    store.dispatch({
      type: ASYNC_START,
      subtype: action.type
    })
    
    action.payload.then(
      res => {
        action.payload = res
        store.dispatch(action)
      },
      error => {
        action.error = true
        action.payload = error.response.body
        store.dispatch(action)
      }
    )
    return
  }
  next(action)
}

function isPromise(v) {
  return v && typeof v.then === 'function'
}

const localStorageMiddleware = store => next => action => {
  if(action.type === LOGIN || action.type === REGISTER || (action.type === APP_LOAD && action.payload)){
    if(!action.error){
      window.localStorage.setItem('jwt', action.payload.user.token)
      agent.setToken(action.payload.user.token)
    }else{ 
      window.localStorage.setItem('jwt', '') 
      agent.setToken(null)   
    }
  } else if(action.type === LOGOUT){
    window.localStorage.setItem('jwt', '')
    agent.setToken(null)
  }

  next(action)
}

export {
  promiseMiddleware,
  localStorageMiddleware
}
