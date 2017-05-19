import React from 'react'
import { connect } from 'react-redux'

import RequestList from '../RequestList'

const mapStateToProps = state => ({
  requests: state.requests
})

const MainView = props => {
  return (
    <div className='col-md-9'>

      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active'>
          <li className='nav-item'>
            <a
              href=''
              className='nav-link active'>
              Global Feed
            </a>
          </li>
        </ul>
      </div>

      <RequestList
        requests={props.requests} />

    </div>
  )
}

export default connect(mapStateToProps, () => ({}))(MainView)
