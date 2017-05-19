import React from 'react'

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
            <h2 key={request.requestId}>
              {request.requestId}
            </h2>
          )
        })
      }
    </div>
  )
}

export default RequestList
