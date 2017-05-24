import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import RequestList from './RequestList'
import agent from '../agent'

import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../constants/actionTypes'

const EditProfileSettings = props => {
  if(props.isUser){
    return (
      <Link
        className='btn btn-sm btn-outline-secondary action-btn'
        to='settings'>
        <i className='ion-gear-a'></i>&nbsp;Edit Profile Settings
      </Link>
    )
  }
  return null
}

const FollowUserButton = props => {
  if(!props.isUser){
    return null
  }

  let classes
  if(props.user.favoring){
    classes = 'btn btn-sm action-btn btn-secondary'
  }else{
    classes = 'btn btn-sm action-btn btn-outline-secondary'
  }

  const handleClick = ev => {
    ev.preventDefault()
    if(props.user.favoring){
      props.unfavor(props.user.username)
    }else{
      props.favor(props.user.username)
    }
  }
  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className='ion-plus-round'></i>&nbsp;
      {
        props.user.favoring ? 'Unfavor' : 'Favor'
      }
    </button>
  )
}

const mapStateToProps = state => ({
  ...state.requestList,
  profile: state.profile,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: PROFILE_PAGE_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: PROFILE_PAGE_UNLOADED
  }),
  onFavor: username => dispatch({
    type: FOLLOW_USER,
    payload: agent.Profile.favor(username)
  }),
  onUnfavor: username => dispatch({
    type: UNFOLLOW_USER,
    payload: agent.Profile.unfavor(username)
  })
})

class Profile extends React.Component {
  componentWillMount(){
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.params.username),
      agent.Requests.postedBy(this.props.params.username)
    ]))
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  renderTabs(){
    return (
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <Link
            className='nav-link active'
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

  render(){
    const profile = this.props.profile

    if(!profile){
      return null
    }

    const canEdit = this.props.currentUser &&
      this.props.currentUser.username === profile.username

    const canFollow = this.props.currentUser &&
      this.props.currentUser.username !== profile.username

    return (
      <div className='profile-page'>
        <div className='user-info'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-10 offset-md-1'>

                <img
                  className='user-img'
                  src={profile.proPic}
                  alt={profile.username} />

                <h4>
                  {profile.username}
                </h4>

                <p>
                  {profile.bio}
                </p>

                <EditProfileSettings isUser={canEdit} />

                <FollowUserButton
                  isUser={canFollow}
                  user={profile}
                  favor={this.props.onFavor}
                  unfavor={this.props.onUnfavor} />

              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              <div className='articles-toggle'>
                {this.renderTabs()}
              </div>

              <RequestList
                requests={this.props.requests} />

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
export { Profile, mapStateToProps, mapDispatchToProps }
