import React from 'react'

import CommentList from './CommentList'
import CommentInput from './CommentInput'

const CommentContainer = props => {
  return (
    <div className='col-xs-12 col-md-8 offset-md-2'>
      <CommentList
        errors={props.updateErrors}
        comments={props.comments}
        requestId={props.requestId}
        currentUser={props.currentUser} />

      <CommentInput
        errors={props.commentErrors}
        requestId={props.requestId}
        currentUser={props.currentUser} />
    </div>
  )
}

export default CommentContainer
