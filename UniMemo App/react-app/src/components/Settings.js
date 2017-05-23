import React from 'react'
import { connect } from 'react-redux'

import ListErrors from './ListErrors'
import agent from '../agent'

import {
  SETTINGS_SAVED,
  LOGOUT
} from '../constants/actionTypes'

class SettingsForm extends React.Component {
  constructor(){
    super()

    this.state = {
      proPic: '',
      username: '',
      bio: '',
      password: '',
      mobileNum: ''
    }

    this.updateState = field => ev => {
      const newState = Object.assign(this.state, { [field]: ev.target.value })
      this.setState(newState)
    }

    this.submitForm = ev => {
      ev.preventDefault()

      const user = this.state
      if(!user.password){
        delete user.password
      }

      this.props.onSubmitForm(user)
    }
  }

  componentWillMount(){
    if(this.props.currentUser){
      this.setState({
        proPic: this.props.currentUser.proPic || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        mobileNum: this.props.currentUser.mobileNum
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentUser){
      this.setState({
        proPic: nextProps.currentUser.proPic || '',
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        mobileNum: nextProps.currentUser.mobileNum
      })
    }
  }

  render(){
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>
          <fieldset className='form-group'>
            <input
              className='form-control form-control-lg'
              type='text'
              placeholder='URL of profile picture'
              value={this.state.proPic}
              onChange={this.updateState('proPic')} />
          </fieldset>

          <fieldset className='form-group'>
            <input
              className='form-control form-control-lg'
              type='text'
              placeholder='username'
              value={this.state.username}
              onChange={this.updateState('username')} />
          </fieldset>

          <fieldset className='form-group'>
            <input
              className='form-control form-control-lg'
              type='password'
              placeholder='New Password'
              value={this.state.username}
              onChange={this.updateState('password')} />
          </fieldset>

          <fieldset className='form-group'>
            <textarea
              className='form-control form-control-lg'
              rows='8'
              placeholder='Short bio about you'
              value={this.state.bio}
              onChange={this.updateState('bio')}>
            </textarea>
          </fieldset>

          <fieldset className='form-group'>
            <input
              className='form-control form-control-lg'
              type='tel'
              placeholder='Mobile Number'
              value={this.state.mobileNum}
              onChange={this.updateState('mobileNum')} />
          </fieldset>

          <button
            className='btn btn-lg btn-primary pull-xs-right'
            type='submit'
            disabled={this.props.inProgress}>
            Update Settings
          </button>

        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onSubmitForm: user => dispatch({
    type: SETTINGS_SAVED,
    payload: agent.Auth.save(user)
  }),
  onClickLogout: () => dispatch({
    type: LOGOUT
  })
})

class Settings extends React.Component {
  render(){
    return (
      <div className='settings-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>

              <h1 className='text-xs-center'>
                Your Settings
              </h1>

              {
                this.props.currentUser ?
                  <div className='text-xs-center'>
                    <i className='ion-star'></i>&nbsp;
                    {this.props.currentUser.yellowStars}&nbsp;&nbsp;
                    Mem&nbsp;
                    {this.props.currentUser.mem}
                    <br />
                    <img
                      className='img-fluid'
                      src={ this.props.currentUser.proPic ? this.props.currentUser.proPic : 'https://photouploads.com/images/350646.png' }
                      alt={`${this.props.currentUser.username}'s proPic`} />
                  </div> : null
              }

              <br />

              <div className='text-xs-center'>
                <i className='ion-information-circled'></i>&nbsp;
                Get URL by uploading your custom pic&nbsp;
                <a
                  className='nav-link'
                  href='https://photouploads.com/'
                  target='_blank'>here</a>
              </div>

              <hr />

              <ListErrors errors={this.props.errors} />

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />

              <button
                className='btn btn-outline-danger'
                onClick={this.props.onClickLogout}>
                Or click here to logout.
              </button>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)