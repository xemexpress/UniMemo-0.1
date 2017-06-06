import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../../agent'

import {
  DELETE_GIFT,
  UPDATE_GIFT
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onDel: giftId => dispatch({
    type: DELETE_GIFT,
    payload: agent.Gifts.del(giftId)
  }),
  onUpdate: payload => dispatch({
    type: UPDATE_GIFT,
    payload
  })
})

class GiftActions extends React.Component {
  constructor(){
    super()

    this.handleDel = gift => ev => {
      ev.preventDefault()
      this.props.onDel(gift.giftId)
    }

    this.handleReceive = gift => ev => {
      ev.preventDefault()
      this.props.onUpdate(agent.Gifts.update(gift))
    }
  }

  render(){
    const gift = this.props.gift

    const isProvider = this.props.currentUser &&
      this.props.currentUser.username === gift.provider.username

    if(isProvider){
      return (
        <span>
          <Link
            to={`giftEditor/${gift.giftId}`}
            className='btn btn-sm btn-outline-secondary'>
            <i className='ion-edit'></i>&nbsp;Edit Gift
          </Link>
          &nbsp;&nbsp;&nbsp;
          <button
            className='btn btn-sm btn-outline-danger'
            onClick={this.handleDel(gift)}>
            <i className='ion-trash-a'></i>&nbsp;Delete Gift
          </button>
        </span>
      )
    }else{
      return (
        <span>
          <button
            className='btn btn-sm btn-outline-info'
            onClick={this.handleReceive(gift)}>
            {
              gift.receiver.username === this.props.currentUser.username ?
              <span><i className='ion-log-in'></i>&nbsp;Return. Thanks!</span>
              : <span><i className='ion-log-out'></i>&nbsp;Receive</span>
            }
          </button>
        </span>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftActions)
