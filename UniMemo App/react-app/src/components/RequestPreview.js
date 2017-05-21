import React from 'react'

const RequestPreview = props => {
  const request = props.request
  return (
    <div className='article-preview'>

      <div className='article-meta'>
        <a>
          <img src={request.poster.proPic} alt={request.poster.username}/>
        </a>

        <div className='info'>
          <a className='author'>
            {request.poster.username}
          </a>
          <span className='date'>
            {new Date(request.createdAt).toDateString()}
          </span>
        </div>

        <div className='pull-xs-right'>
          <button
            className='btn btn-sm btn-outline-primary'>
            <i className='ion-help-buoy'></i> {request.wishesCount}
          </button>
        </div>
      </div>

      <a to={`request/${request.requestId}`} className='preview-link'>

        <h1>{request.text}</h1>

        <p>
          Start Time:&nbsp;{request.startTime ? new Date(request.startTime).toDateString() : 'Before End Time :)'}
          <br />
          Start Place:&nbsp;{request.startPlace ? request.startPlace : 'Not determined yet :)'}
          <br /><br />
          End Time:&nbsp;{new Date(request.endTime).toDateString()}
          <br />
          End Place:&nbsp;{request.endPlace}
        </p>

        <span>Read more...</span>

        <ul className='tag-list'>
          {
            request.tagList.map(tag => {
              return (
                <li className='tag-default tag-pill tag-outline' key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>

      </a>
    </div>
  )
}

export default RequestPreview
