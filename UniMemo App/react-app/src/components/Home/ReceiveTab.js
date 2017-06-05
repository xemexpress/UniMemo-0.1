import React from 'react'

import agent from '../../agent'

class ReceiveTab extends React.Component {
  constructor(){
    super()

    this.state = {
      using: true
    }

    this.handleReceive = ev => {
      ev.preventDefault()

      this.props.onTabClick(
        'receive',
        agent.Gifts.receivedBy(this.props.currentUser.username),
        this.props.currentUser.username,
        this.state.using
      )
      this.setState({ using: !this.state.using})
    }
  }

  render(){
    if(this.props.tab === 'receive'){
      return (
        <div>
          <li className='nav-item'>
            <a
              className={this.state.using ? 'nav-link' : 'nav-link active'}
              onClick={this.state.using ? this.handleReceive : null}>
              <i className='ion-waterdrop'></i>&nbsp;Gifts I've received
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={this.state.using ? 'nav-link active' : 'nav-link'}
              onClick={this.state.using ? null : this.handleReceive}>
              <i className='ion-bonfire'></i>&nbsp;Gifts I could get
            </a>
          </li>
        </div>
      )
    }else{
      return (
        <li className='nav-item'>
          <a
            className='nav-link'
            onClick={this.handleReceive}>
            <i className='ion-umbrella'></i>&nbsp;Gifts I could use
          </a>
        </li>
      )
    }
  }
}

export default ReceiveTab
