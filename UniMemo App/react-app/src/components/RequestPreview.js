import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../agent'

import {
  WISH_REQUEST,
  UNWISH_REQUEST
} from '../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  wish: requestId => dispatch({
    type: WISH_REQUEST,
    payload: agent.Requests.wish(requestId)
  }),
  unwish: requestId => dispatch({
    type: UNWISH_REQUEST,
    payload: agent.Requests.unwish(requestId)
  })
})

const RequestPreview = props => {
  const request = props.request

  const wishButtonClass = request.wished ?
    'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'

  const handleClick = ev => {
    ev.preventDefault()
    if(request.wished){
      props.unwish(request.requestId)
    }else{
      props.wish(request.requestId)
    }
  }

  return (
    <div className='article-preview'>

      <div className='article-meta'>
        <Link
          className='author'
          to={`@${request.poster.username}`}>
          <img src={request.poster.proPic} alt={request.poster.username} />
        </Link>

        <div className='info'>
          <Link
            className='author'
            to={`@${request.poster.username}`}>
            {request.poster.username}
            {/* <span style={{color:'lightyellow'}}>        // yellowStars
              <i className='ion-star'></i>&nbsp;{request.poster.yellowStars}
            </span> */}
          </Link>
          <span className='date'>
            {new Date(request.createdAt).toDateString()}
          </span>
        </div>

        <div className='pull-xs-right'>
          <button
            className={wishButtonClass}
            onClick={handleClick}>
            <i className='ion-help-buoy'></i> {request.wishesCount}
          </button>
        </div>
      </div>

      <Link to={`request/${request.requestId}`} className='preview-link'>

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

      </Link>
    </div>
  )
}

export default connect(()=>({}), mapDispatchToProps)(RequestPreview)
