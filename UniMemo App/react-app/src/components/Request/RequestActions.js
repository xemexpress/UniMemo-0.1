import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../../agent'

import {
  DELETE_REQUEST
} from '../../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({
    type: DELETE_REQUEST,
    payload
  })
})

const RequestActions = props => {
  const request = props.request
  const del = () => {
    props.onClickDelete(agent.Requests.del(request.requestId))
  }

  if(props.canModify){
    return (
      <span>
        <Link
          to={`editor/${request.requestId}`}
          className='btn btn-outline-secondary btn-sm'>
          <i className='ion-edit'></i> Edit Request
        </Link>

        <button
          className='btn btn-outline-danger btn-sm'
          onClick={del}>
          <i className='ion-trash-a'></i> Delete Request
        </button>
      </span>
    )
  }

  return (
    null
  )
}

export default connect(()=>({}), mapDispatchToProps)(RequestActions)
