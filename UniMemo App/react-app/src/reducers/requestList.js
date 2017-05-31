import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  CHANGE_TAB,
  SWITCH_TAKING,
  APPLY_TAG_FILTER,
  SET_PAGE,
  WISH_REQUEST,
  UNWISH_REQUEST
} from '../constants/actionTypes'

export default (state={}, action) => {
  switch(action.type){
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tab: action.tab,
        tag: null,
        requests: action.payload[1].requests,
        requestsCount: action.payload[1].requestsCount,
        currentPage: 0
      }
    case HOME_PAGE_UNLOADED:
      return {}
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        requests: action.payload[1].requests,
        requestsCount: action.payload[1].requestsCount,
        currentPage: 0
      }
    case PROFILE_PAGE_UNLOADED:
      return {}
    case CHANGE_TAB:
      return {
        ...state,
        tag: null,
        tab: action.tab,
        requests: action.payload.requests,
        requestsCount: action.payload.requestsCount,
        currentPage: 0
      }
    case SWITCH_TAKING:
      return {
        ...state,
        requests: action.payload.requests,
        requestsCount: action.payload.requestsCount,
        currentPage: 0
      }
    case APPLY_TAG_FILTER:
      return {
        ...state,
        tag: action.tag,
        tab: null,
        requests: action.payload.requests,
        requestsCount: action.payload.requestsCount,
        currentPage: 0
      }
    case WISH_REQUEST:
    case UNWISH_REQUEST:
      return {
        ...state,
        requests: state.requests.map(request => {
          if(action.payload.request.requestId === request.requestId){
            return {
              ...request,
              wished: action.payload.request.wished,
              wishesCount: action.payload.request.wishesCount
            }
          }
          return request
        })
      }
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.page,
        requests: action.payload.requests,
        requestsCount: action.payload.requestsCount
      }
    default:
  }
  return state
}
