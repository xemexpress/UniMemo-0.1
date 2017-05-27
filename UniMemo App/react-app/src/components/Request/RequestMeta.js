import React from 'react'
import { Link } from 'react-router'

import RequestActions from './RequestActions'

const RequestMeta = ({ request, canModify }) => {
  return (
    <div className='article-meta'>

      <Link to={`@${request.poster.username}`}>
        <img src={request.poster.proPic} alt={request.poster.username} />
      </Link>

      <div className='info'>
        <Link to={`@${request.poster.username}`} className='author'>
          {request.poster.username}
        </Link>
        <span className='date'>
          {new Date(request.createdAt).toDateString()}
        </span>
      </div>

      <RequestActions canModify={canModify} request={request} />

    </div>
  )
}

export default RequestMeta
