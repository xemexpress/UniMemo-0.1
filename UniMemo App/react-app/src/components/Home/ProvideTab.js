import React from 'react'

import agent from '../../agent'

class ProvideTab extends React.Component {
  constructor(){
    super()

    this.handleProvide = tab => ev => {
      ev.preventDefault()
      this.props.onTabClick(
        tab,
        agent.Gifts.providedBy(this.props.currentUser.username, tab.slice(8))
      )
    }
  }

  render(){
    if(this.props.tab && this.props.tab.startsWith('provide')){
      return (
        <div>
          <li className='nav-item'>
            <a
              className={this.props.tab === 'provide-sent' ? 'nav-link active' : 'nav-link'}
              onClick={this.props.tab !== 'provide-sent' ? this.handleProvide('provide-sent') : null}>
              <i className='ion-android-send'></i>&nbsp;Gifts I've sent
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={this.props.tab === 'provide-nSent' ? 'nav-link active' : 'nav-link'}
              onClick={this.props.tab !== 'provide-nSent' ? this.handleProvide('provide-nSent') : null}>
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
            onClick={this.handleProvide('provide-sent')}>
            <i className='ion-wand'></i>&nbsp;Gifts I provide
          </a>
        </li>
      )
    }
  }
}

export default ProvideTab
