import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../../agent'

import {
  DELETE_REQUEST,
  TAKE_REQUEST,
  UNTAKE_REQUEST
} from '../../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  onDel: payload => dispatch({
    type: DELETE_REQUEST,
    payload
  }),
  onTake: requestId => dispatch({
    type: TAKE_REQUEST,
    payload: agent.Requests.take(requestId)
  }),
  onUntake: requestId => dispatch({
    type: UNTAKE_REQUEST,
    payload: agent.Requests.untake(requestId)
  })
})

const RequestActions = props => {
  const request = props.request

  const del = () => {
    props.onDel(agent.Requests.del(request.requestId))
  }

  const handleTake = ev => {
    ev.preventDefault()
    if(request.taking){
      props.onUntake(request.requestId)
    }else{
      props.onTake(request.requestId)
    }
  }

  if(props.canModify){
    return (
      <span>
        {
          request.tagList.indexOf('ongoing') !== -1 ?
          <Link
            to={`editor/${request.requestId}`}
            className='btn btn-outline-secondary btn-sm'>
            <i className='ion-edit'></i> Edit Request
          </Link>
          : null
        }
        &nbsp;&nbsp;&nbsp;
        <button
          className='btn btn-outline-danger btn-sm'
          onClick={del}>
          <i className='ion-trash-a'></i> Delete Request
        </button>
      </span>
    )
  }else if(request.tagList.indexOf('ongoing') !== -1){
    return (
      <span>
        <button
          className={request.taking ? 'btn btn-sm action-btn btn-info' : 'btn btn-sm action-btn btn-outline-info'}
          onClick={handleTake}>
          <i className='ion-android-happy'></i>&nbsp;
          {
            request.taking ? 'Untake' : 'Take'
          }
        </button>
      </span>
    )
  }else{
    return null
  }
}

export default connect(()=>({}), mapDispatchToProps)(RequestActions)
