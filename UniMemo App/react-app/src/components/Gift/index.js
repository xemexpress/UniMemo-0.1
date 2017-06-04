import React from 'react'
import { connect } from 'react-redux'

import UnitMeta from '../common/UnitMeta'
import TagList from '../common/TagList'
import agent from '../../agent'

import {
  GIFT_PAGE_LOADED,
  GIFT_PAGE_UNLOADED
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.gift,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: GIFT_PAGE_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: GIFT_PAGE_UNLOADED
  })
})

class Gift extends React.Component {
  componentWillMount(){
    this.props.onLoad(agent.Gifts.get(this.props.params.giftId))
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    const gift = this.props.gift

    if(!gift){
      return null
    }

    const text = `
      <div>
        You may use it before:&nbsp;<strong>${new Date(gift.expireAt).toDateString()}</strong>
      </div>
    `

    const markup = {
      __html: text
    }

    const canModify = this.props.currentUser &&
      this.props.currentUser.username === gift.provider.username

    return (
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>
            <h1>{gift.text}</h1>

            <UnitMeta
              unit={gift}
              canModify={canModify} />

            <TagList unit={gift} />

          </div>
        </div>

        <div className='container page'>
          <div className='row article-content'>
            <div className='col-xs-12'>
              <div dangerouslySetInnerHTML={markup}></div>
              <hr />

              {
                gift.image ?
                  <div className='offset-lg-3 col-lg-6'>
                    <img className='img-fluid' src={gift.image} alt={`Provided by ${gift.provider.username}`} />
                  </div>
                : null
              }
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gift)
