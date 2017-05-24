import {
  REQUEST_PAGE_LOADED,
  REQUEST_PAGE_UNLOADED,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../constants/actionTypes'

export default (state={}, action) => {
  switch(action.type){
    case REQUEST_PAGE_LOADED:
      return {
        ...state,
        request: action.error ? null : action.payload[0].request,
        comments: action.error ? null : action.payload[1].comments
      }
    case REQUEST_PAGE_UNLOADED:
      return {}
    case ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ? null :
          [action.payload.comment].concat(state.comments || [])
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => action.commentId !== comment.id)
      }
    default:
  }
  return state
}
