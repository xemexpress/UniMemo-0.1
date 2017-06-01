import React from 'react'

import {
  PER_PAGE
} from '../../constants/refs'

class ListPagination extends React.Component {
  // componentDidUpdate(){
  //   console.log(this)
  //   ReactDOM.findDOMNode(this).scrollTop = 0
  // }

  render(){
    if(this.props.requestsCount <= PER_PAGE){
      return null
    }

    const range = []
    for(let i = 0; i < Math.ceil(this.props.requestsCount / PER_PAGE); i++){
      range.push(i)
    }

    return (
      <nav>
        <div className='pagination'>
          {
            range.map(v => {
              const isCurrent = v === this.props.currentPage
              const handleClick = ev => {
                ev.preventDefault()
                this.props.onSetPage(v)
              }
              return (
                <li
                  className={isCurrent ? 'page-item active' : 'page-item'}
                  key={v.toString()}
                  onClick={handleClick}>
                  <a className='page-link'>
                    {v + 1}
                  </a>
                </li>
              )
            })
          }
        </div>
      </nav>
    )
  }
}

export default ListPagination
