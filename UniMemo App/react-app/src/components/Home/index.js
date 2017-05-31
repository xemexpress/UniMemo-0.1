import React from 'react'
import { connect } from 'react-redux'

import Banner from './Banner'
import MainView from './MainView'
import Tags from './Tags'
import agent from '../../agent'

import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.home,
  token: state.common.token,
  appName: state.common.appName
})

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, payload) => dispatch({
    type: HOME_PAGE_LOADED,
    payload,
    tab
  }),
  onUnload: () => dispatch({
    type: HOME_PAGE_UNLOADED
  }),
  onClickTag: (tag, payload) => dispatch({
    type: APPLY_TAG_FILTER,
    tag,
    payload
  })
})

class Home extends React.Component {
  componentWillMount(){
    const tab = this.props.token ? 'collect' : 'all'
    const requestsPromise = this.props.token ?
      agent.Requests.collect() : agent.Requests.all()

    this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), requestsPromise]))
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    return (
      <div className='home-page'>

        <Banner appName={this.props.appName} />

        <div className='container page'>
            <div className='row'>
              <MainView />

              <div className='col-md-3'>
                <div className='sidebar'>
                  <p>Popular Tags</p>
                  <Tags
                    tags={this.props.tags}
                    onClickTag={this.props.onClickTag} />
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
