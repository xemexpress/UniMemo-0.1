import {
  UPDATE_FIELD_AUTH,
  ASYNC_START,
  LOGIN
} from '../constants/actionTypes'

const defaultState = {
  email: '',
  password: ''
}

export default (state = defaultState, action) => {
  switch(action.type){
    case UPDATE_FIELD_AUTH:
      return {
        ...state,
        [action.key]: action.value
      }
    case ASYNC_START:
      if(action.subtype === LOGIN){
        return {
          ...state,
          inProgress: true
        }
      }
      break
    case LOGIN:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }
    default:
  }
  return state
}
