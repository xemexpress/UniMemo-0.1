import {
  GIFT_EDITOR_UNLOADED,
  UPDATE_FIELD_GIFT,
  ADD_TAG_GIFT,
  REMOVE_TAG_GIFT,
  ASYNC_START,
  SUBMIT_GIFT
} from '../constants/actionTypes'

const defaultState = {
  text: '',
  image: '',
  expireAt: '',
  receiver: '',
  access: 'personal',
  tagInput: '',
  tagList: []
}

export default (state=defaultState, action) => {
  switch(action.type){
    case GIFT_EDITOR_UNLOADED:
      return defaultState
    case UPDATE_FIELD_GIFT:
      return {
        ...state,
        [action.key]: action.value
      }
    case ADD_TAG_GIFT:
      if(action.tag){
        return {
          ...state,
          access: action.tag
        }
      }else{
        return {
          ...state,
          tagList: state.tagList.concat([state.tagInput]),
          tagInput: ''
        }
      }
    case REMOVE_TAG_GIFT:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      }
    case ASYNC_START:
      if(action.subtype === SUBMIT_GIFT){
        return {
          ...state,
          inProgress: true
        }
      }
      break
    case SUBMIT_GIFT:
      return {
        ...state,
        inProgress: false,
        error: action.error ? action.payload.errors : null
      }
    default:
  }
  return state
}
