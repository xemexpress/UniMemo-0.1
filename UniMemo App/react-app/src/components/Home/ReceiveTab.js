import React from 'react'

import agent from '../../agent'

class ReceiveTab extends React.Component {
  constructor(){
    super()

    this.handleReceive = tab => ev => {
      ev.preventDefault()
      this.props.onTabClick(
        tab,
        agent.Gifts.receivedBy(this.props.currentUser.username, tab.slice(8))
      )
    }
  }

  render(){
    if(this.props.tab && this.props.tab.startsWith('receive')){
      return (
        <div>
          <li className='nav-item'>
            <a
              className={this.props.tab === 'receive-received' ? 'nav-link active' : 'nav-link'}
              onClick={this.props.tab !== 'receive-received'? this.handleReceive('receive-received') : null}>
              <i className='ion-waterdrop'></i>&nbsp;Gifts I've received
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={this.props.tab === 'receive-nReceived' ? 'nav-link active' : 'nav-link'}
              onClick={this.props.tab !== 'receive-nReceived' ? this.handleReceive('receive-nReceived') : null}>
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
            onClick={this.handleReceive('receive-received')}>
            <i className='ion-umbrella'></i>&nbsp;Gifts I could use
          </a>
        </li>
      )
    }
  }
}

export default ReceiveTab
