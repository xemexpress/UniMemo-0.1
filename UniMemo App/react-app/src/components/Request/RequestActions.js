import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ListErrors from '../common/ListErrors'
import agent from '../../agent'

import {
  DELETE_REQUEST,
  TAKE_REQUEST,
  UNTAKE_REQUEST,
  END_REQUEST
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  memErrors: state.request.memErrors
})

const mapDispatchToProps = dispatch => ({
  onDel: requestId => dispatch({
    type: DELETE_REQUEST,
    payload: agent.Requests.del(requestId)
  }),
  onTake: requestId => dispatch({
    type: TAKE_REQUEST,
    payload: agent.Requests.take(requestId)
  }),
  onUntake: requestId => dispatch({
    type: UNTAKE_REQUEST,
    payload: agent.Requests.untake(requestId)
  }),
  onEnd: (requestId, mem) => dispatch({
    type: END_REQUEST,
    payload: agent.Requests.end(requestId, mem)
  })
})

class RequestActions extends React.Component {
  constructor(){
    super()

    this.state = {
      mem: 10
    }

    this.setMem = ev => {
      this.setState({
        mem: ev.target.value
      })
    }

    this.handleDel = request => ev => {
      ev.preventDefault()
      this.props.onDel(request.requestId)
    }

    this.handleTake = request => ev => {
      ev.preventDefault()
      if(request.taking){
        this.props.onUntake(request.requestId)
      }else{
        this.props.onTake(request.requestId)
      }
    }

    this.handleEnd = (request, mem) => ev => {
      ev.preventDefault()
      this.props.onEnd(request.requestId, mem)
    }
  }

  render(){
    const request = this.props.request

    if(this.props.canModify){
      return (
        <span>
          {
            request.tagList.indexOf('ongoing') !== -1 ?
            <span>
              <Link
                to={`requestEditor/${request.requestId}`}
                className='btn btn-sm btn-outline-secondary'>
                <i className='ion-edit'></i> Edit Request
              </Link>
              &nbsp;&nbsp;&nbsp;
              <button
                className='btn btn-sm btn-outline-danger'
                onClick={this.handleDel(request)}>
                <i className='ion-trash-a'></i> Delete Request
              </button>
            </span>
            : request.tagList.indexOf('ongoing-taken') !== -1 ?
            <span>
              {`${request.helper.username}'s help has saved me`}&nbsp;
              <input
                className='mem'
                type='number'
                value={this.state.mem}
                onChange={this.setMem} />&nbsp;minutes.&nbsp;&nbsp;
              <button
                className='btn btn-outline-danger'
                onClick={this.handleEnd(request, this.state.mem)}>
                <i className='ion-clock'></i>&nbsp;&nbsp;Ends by sending {request.helper.username} {this.state.mem} mem
              </button>
              <ListErrors errors={this.props.memErrors} />
            </span>
            : <span>Thank you! Have a nice day!</span>
          }
        </span>
      )
    }else if(request.tagList.indexOf('ongoing') !== -1){
      return (
        <span>
          <button
            className={request.taking ? 'btn btn-sm btn-info' : 'btn btn-sm btn-outline-info'}
            onClick={this.handleTake(request)}>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestActions)
