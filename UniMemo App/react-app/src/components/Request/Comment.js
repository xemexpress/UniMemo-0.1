import React from 'react'
import { Link } from 'react-router'

import DeleteButton from './DeleteButton'

const Comment = props => {
  const comment = props.comment
  const show = props.currentUser &&
    props.comment.author.username === props.currentUser.username

  return (
    <div className='card'>
      <div className='card-block'>
        <div className='card-text'>
          {comment.body}
        </div>
      </div>

      <div className='card-footer'>
        <Link
          className='comment-author'
          to=''>
          <img
            className='comment-author-img'
            src={comment.author.proPic}
            alt={comment.author.username} />
        </Link>
        &nbsp;
        <Link
          className='comment-author'
          to=''>
          {comment.author.username}
        </Link>
        &nbsp;
        <span className='date-posted'>
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton show={show} requestId={props.requestId} commentId={comment.id} />
      </div>
    </div>
  )
}

export default Comment
