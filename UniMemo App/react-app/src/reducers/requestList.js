import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes'

export default (state={}, action) => {
  switch(action.type){
    case HOME_PAGE_LOADED:
      return {
        ...state,
        requests: action.payload.requests
      }
    case HOME_PAGE_UNLOADED:
      return {}
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        requests: action.payload[1].requests,
        requestsCount: action.payload[1].requestsCount
      }
    case PROFILE_PAGE_UNLOADED:
      return {}
    default:
  }
  return state
}
