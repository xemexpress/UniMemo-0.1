import React from 'react'

import RequestPreview from './RequestPreview'

const RequestList = props => {
  if(!props.requests){
    return (
      <div className='article-preview'>
        Loading...
      </div>
    )
  }

  if(props.requests.length === 0){
    return (
      <div className='article-preview'>
        No requests are here... yet
      </div>
    )
  }

  return (
    <div>
      {
        props.requests.map(request => {
          return (
            <RequestPreview request={request} key={request.requestId}/>
          )
        })
      }
    </div>
  )
}

export default RequestList
