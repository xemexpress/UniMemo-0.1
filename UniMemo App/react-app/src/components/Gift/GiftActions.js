import React from 'react'
import { connect } from 'react-redux'

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
        <button
          className='btn btn-sm btn-outline-danger'
          onClick={this.handleDel(gift)}>
          <i className='ion-trash-a'></i> Delete Gift
        </button>
      )
    }else{
      return null
    }

  }
}

export default connect(()=>({}), mapDispatchToProps)(GiftActions)
