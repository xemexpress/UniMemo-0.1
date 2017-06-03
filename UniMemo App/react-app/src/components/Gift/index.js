import React from 'react'
import { connect } from 'react-redux'

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

    return (
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>
            <h1>{gift.text}</h1>
            <li className='tag-default tag-pill tag-info'>
              {
                gift.tagList.filter(tag =>
                  ['personal', 'public', 'openPublic'].indexOf(tag) !== -1
                )[0]
              }
            </li>
          </div>
        </div>

        <div className='container page'>
          <div className='row article-content'>
            <div className='col-xs-12'>
              <ul className='tag-list'>
                {
                  gift.tagList.filter(tag =>
                    ['personal', 'public', 'openPublic'].indexOf(tag) === -1
                  ).map(tag => {
                    if(['delivering', 'giveOrLend', 'know', 'deliver'].indexOf(tag) !== -1){
                      return (
                        <li
                          className='tag-default tag-pill tag-success'
                          key={tag}>
                          {tag}
                        </li>
                      )
                    }
                    return (
                      <li
                        className='tag-default tag-pill tag-outline'
                        key={tag}>
                        {tag}
                      </li>
                    )
                  })
                }
              </ul>

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
