import React from 'react'
import { connect } from 'react-redux'

import ListErrors from './ListErrors'
import agent from '../agent'

import {
  SETTINGS_SAVED,
  LOGOUT
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.settings,
  state.common.currentUser
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
