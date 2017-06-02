import React from 'react'
import { connect } from 'react-redux'

import UnitsList from '../common/UnitsList'
import agent from '../../agent'

import {
  CHANGE_TAB,
  TOGGLE_TYPES,
  SET_PAGE
} from '../../constants/actionTypes'

// Request Tabs
const YourCollectionTab = props => {
  if(props.currentUser){
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

// Gift Tabs
const ProvideTab = props => {
  const handleClick = ev => {
    ev.preventDefault()
    props.onTabClick('provide', agent.Gifts.providedBy(props.currentUser.username))
  }
  return (
    <li className='nav-item'>
      <a
        className={props.tab === 'provide' ? 'nav-link active' : 'nav-link'}
        onClick={handleClick}>
        Gifts I provide
      </a>
    </li>
  )
}

const ReceiveTab = props => {
  const handleClick = ev => {
    ev.preventDefault()
    props.onTabClick('receive', agent.Gifts.receivedBy(props.currentUser.username))
  }
  return (
    <li className='nav-item'>
      <a
        className={props.tab === 'receive' ? 'nav-link active' : 'nav-link'}
        onClick={handleClick}>
        Gifts I could use
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
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({
    type: CHANGE_TAB,
    payload,
    tab
  }),
  onToggle: payload => dispatch({
    type: TOGGLE_TYPES,
    payload
  }),
  onSetPage: (p, payload) => dispatch({
    type: SET_PAGE,
    page: p,
    payload
  })
})

class MainView extends React.Component {
  constructor(){
    super()

    this.state = {
      loadRequest: true
    }

    this.handleToggle = () => {
      if(this.state.loadRequest){
        this.props.onTabClick('provide', agent.Gifts.providedBy(this.props.currentUser.username))
        this.props.onToggle(agent.Tags.getGifts())
      }else{
        this.props.onTabClick('collect', agent.Requests.collect())
        this.props.onToggle(agent.Tags.getRequests())
      }
      this.setState({loadRequest: !this.state.loadRequest})
    }
  }

  onSetPage(page){
    let payload
    if(this.state.loadRequest){
      payload = this.props.tab === 'all' ? agent.Requests.all(page) :
        this.props.tag ? agent.Requests.byTag(this.props.tag, page) :
        agent.Requests.collect(page)
    }else{
      payload = this.props.tab === 'provide' ? agent.Gifts.providedBy(this.props.currentUser.username, page) :
        this.props.tag ? agent.Gifts.byTag(this.props.tag, page) :
        agent.Gifts.receivedBy(this.props.currentUser.username, page)
    }

    this.props.onSetPage(page, payload)
  }

  render(){
    const onSetPage = page => this.onSetPage(page)
    const currentUser = this.props.currentUser
    return (
      <div className='col-md-9'>

        <div className='feed-toggle'>
          <ul className='nav nav-pills outline-active'>

            {
              this.state.loadRequest ?
              <span>
                <YourCollectionTab
                  currentUser={currentUser}
                  tab={this.props.tab}
                  onTabClick={this.props.onTabClick} />

                <GlobalFeedTab
                  tab={this.props.tab}
                  onTabClick={this.props.onTabClick} />
              </span>
              :
              <span>
                <ProvideTab
                  currentUser={currentUser}
                  tab={this.props.tab}
                  onTabClick={this.props.onTabClick} />
                <ReceiveTab
                  currentUser={currentUser}
                  tab={this.props.tab}
                  onTabClick={this.props.onTabClick} />
              </span>
            }

            <TagTab tag={this.props.tag} />

            {
              currentUser ?
              <label className="switch pull-xs-right">
                <input type="checkbox" onChange={this.handleToggle} checked={this.state.loadRequest}/>
                <div className="slider round"></div>
              </label>
              : null
            }

          </ul>
        </div>

        <UnitsList
          requests={this.props.requests}
          requestsCount={this.props.requestsCount}
          gifts={this.props.gifts}
          giftsCount={this.props.giftsCount}
          currentPage={this.props.currentPage}
          onSetPage={onSetPage} />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
