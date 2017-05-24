import React from 'react'
import { Link } from 'react-router'

import CommentList from './CommentList'
import CommentInput from './CommentInput'

const CommentContainer = props => {
  if(props.currentUser){
    return (
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <CommentList
          comments={props.comments}
          requestId={props.requestId}
          currentUser={props.currentUser} />

        <CommentInput
          errors={props.errors}
          requestId={props.requestId}
          currentUser={props.currentUser} />
      </div>
    )
  }

  return (
    <div className='col-xs-12 col-md-8 offset-md-2'>
      <CommentList
        comments={props.comments}
        requestId={props.requestId}
        currentUser={props.currentUser} />

      <p>
        <Link to='login'>Sign in</Link>
      &nbsp;or&nbsp;
        <Link to='register'>Sign up</Link>
      &nbsp;to add comments to this request
      </p>
    </div>
  )
}

export default CommentContainer
