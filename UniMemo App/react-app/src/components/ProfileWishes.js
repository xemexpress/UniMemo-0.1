import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../agent'

import { Profile, mapStateToProps, mapDispatchToProps} from './Profile'

class ProfileWishes extends Profile {
  componentWillMount(){
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.params.username),
      agent.Requests.wishedBy(this.props.params.username)
    ]))
  }

  renderTabs(){
    return (
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <Link
            className='nav-link'
            to={`@${this.props.profile.username}`}>
            My Requests
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link active'
            to={`@${this.props.profile.username}/wishes`}>
            Wished Requests
          </Link>
        </li>
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWishes)