import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../../agent'

import {
  DELETE_GIFT
} from '../../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  onDel: giftId => dispatch({
    type: DELETE_GIFT,
    payload: agent.Gifts.del(giftId)
  })
})

class GiftActions extends React.Component {
  constructor(){
    super()
    this.handleDel = gift => ev => {
      ev.preventDefault()
      this.props.onDel(gift.giftId)
    }
  }

  render(){
    const gift = this.props.gift

    if(this.props.isProvider){
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
      return null
    }
  }
}

export default connect(()=>({}), mapDispatchToProps)(GiftActions)
