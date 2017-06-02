import React from 'react'
import { connect } from 'react-redux'

import RequestList from '../common/RequestList'
import agent from '../../agent'

import {
  CHANGE_TAB,
  SET_PAGE
} from '../../constants/actionTypes'

const YourCollectionTab = props => {
  if(props.token){
    const handleClick = ev => {
      ev.preventDefault()
      props.onTabClick('collect', agent.Requests.collect())
    }
    return (
      <li className='nav-item'>
        <a
          className={props.tab === 'collect' ? 'nav-link active' : 'nav-link'}
          onClick={handleClick}>
          Your Collection
        </a>
      </li>
    )
  }
  return null
}

const GlobalFeedTab = props => {
  const handleClick = ev => {
    ev.preventDefault()
    props.onTabClick('all', agent.Requests.all())
  }
  return (
    <li className='nav-item'>
      <a
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={handleClick}>
        Global Feed
      </a>
    </li>
  )
}

const TagTab = props => {
  if(!props.tag){
    return null
  }

  return (
    <li className='nav-item'>
      <a className='nav-link active'>
        <i className='ion-pound'></i>&nbsp;{props.tag}
      </a>
    </li>
  )
}

const mapStateToProps = state => ({
  ...state.contentList,
  token: state.common.token
})

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({
    type: CHANGE_TAB,
    payload,
    tab
  }),
  onSetPage: (tab, p, tag) => dispatch({
    type: SET_PAGE,
    page: p,
    payload: tab === 'all' ? agent.Requests.all(p) :
      tag ? agent.Requests.byTag(tag, p) : agent.Requests.collect(p)
  })
})

const MainView = props => {
  const onSetPage = page => props.onSetPage(props.tab, page, props.tag)

  const requestLoaded = props.requests ? true : false

  return (
    <div className='col-md-9'>

      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active'>

          <YourCollectionTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <TagTab tag={props.tag} />

          <label className="switch pull-md-right">
            <input type="checkbox" checked={requestLoaded}/>
            <div className="slider round"></div>
          </label>

        </ul>
      </div>

      <RequestList
        requests={props.requests}
        requestsCount={props.requestsCount}
        currentPage={props.currentPage}
        onSetPage={onSetPage} />

    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
