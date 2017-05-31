import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../agent'

import { Profile, mapStateToProps, mapDispatchToProps} from './Profile'

class ProfileTaken extends Profile {
  componentWillMount(){
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.params.username),
      agent.Requests.helpedBy(this.props.params.username)
    ]))
  }

  renderTabs(canEdit){
    return (
      <ul className='nav nav-pills outline-active'>
        {
          canEdit ?
          <li className='nav-item'>
            <Link
              className='nav-link active'
              to={`@${this.props.profile.username}/taken`}>
              My Undertakings
            </Link>
          </li>
          : null
        }

        <li className='nav-item'>
          <Link
            className='nav-link'
            to={`@${this.props.profile.username}`}>
            My Requests
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            to={`@${this.props.profile.username}/wishes`}>
            Wished Requests
          </Link>
        </li>
      </ul>
    )
  }

  onSetPage(page){
    this.props.onSetPage(
      page,
      agent.Requests.helpedBy(this.props.profile.username, page)
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTaken)
