import {
  GIFT_PAGE_LOADED,
  GIFT_PAGE_UNLOADED
} from '../constants/actionTypes'

export default (state={}, action) => {
  switch(action.type){
    case GIFT_PAGE_LOADED:
      return {
        ...state,
        gift: action.error ? null : action.payload.gift
      }
    case GIFT_PAGE_UNLOADED:
      return {}
    default:
  }
  return state
}
