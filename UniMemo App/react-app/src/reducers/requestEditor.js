import {
  REQUEST_EDITOR_LOADED,
  UPDATE_FIELD_REQUEST,
  EDITOR_PAGE_UNLOADED,
  ADD_TAG_REQUEST,
  REMOVE_TAG_REQUEST,
  ASYNC_START,
  SUBMIT_REQUEST
} from '../constants/actionTypes'

const defaultState = {
  startTime: '',
  startPlace: '',
  endTime: '',
  endPlace: '',
  text: '',
  image: '',
  tagInput: ''
}

export default (state=defaultState, action) => {
  switch(action.type){
    case REQUEST_EDITOR_LOADED:
      return {
        ...state,
        requestId: action.payload ? action.payload.request.requestId : undefined,
        startTime: action.payload ? action.payload.request.startTime ? new Date(action.payload.request.startTime).toISOString().slice(0,16) : '' : '',
        startPlace: action.payload ? action.payload.request.startPlace : '',
        endTime: action.payload ? new Date(action.payload.request.endTime).toISOString().slice(0,16) : '',
        endPlace: action.payload ? action.payload.request.endPlace : '',
        text: action.payload ? action.payload.request.text : '',
        image: action.payload ? action.payload.request.image : '',
        tagInput: '',
        tagList: action.payload ? action.payload.request.tagList : ['ongoing']
      }
    case UPDATE_FIELD_REQUEST:
      return {
        ...state,
        [action.key]: action.value
      }
    case ADD_TAG_REQUEST:
      return {
        ...state,
        tagList: (state.tagList || []).concat([state.tagInput]),
        tagInput: ''
      }
    case REMOVE_TAG_REQUEST:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      }
    case ASYNC_START:
      if(action.subtype === SUBMIT_REQUEST){
        return {
          ...state,
          inProgress: true
        }
      }
      break
    case SUBMIT_REQUEST:
      return {
        ...state,
        inProgress: false,
        error: action.error ? action.payload.errors : null
      }
    case EDITOR_PAGE_UNLOADED:
      return defaultState
    default:
  }
  return state
}
