import React from 'react'

import agent from '../../agent'

class ProvideTab extends React.Component {
  constructor(){
    super()

    this.state = {
      using: false
    }

    this.handleProvide = ev => {
      ev.preventDefault()

      this.props.onTabClick(
        'provide',
        agent.Gifts.providedBy(this.props.currentUser.username),
        this.props.currentUser.username,
        this.state.using
      )
      this.setState({ using: !this.state.using })
    }
  }

  render(){
    if(this.props.tab === 'provide'){
      return (
        <div>
          <li className='nav-item'>
            <a
              className={this.state.using ? 'nav-link' : 'nav-link active'}
              onClick={this.state.using ? this.handleProvide : null}>
              <i className='ion-android-send'></i>&nbsp;Gifts I've sent
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={this.state.using ? 'nav-link active' : 'nav-link'}
              onClick={this.state.using ? null : this.handleProvide}>
              <i className='ion-cube'></i>&nbsp;Gifts not sent
            </a>
          </li>
        </div>
      )
    }else{
      return (
        <li className='nav-item'>
          <a
            className='nav-link'
            onClick={this.handleProvide}>
            <i className='ion-wand'></i>&nbsp;Gifts I provide
          </a>
        </li>
      )
    }
  }
}

export default ProvideTab
