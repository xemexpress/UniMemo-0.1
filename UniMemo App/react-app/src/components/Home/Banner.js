import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class Statement extends React.Component {
  componentDidUpdate(){
    ReactDOM.findDOMNode(this).scrollIntoView()
  }

  render(){
    return (
      <p className={this.props.page}>{this.props.statement}</p>
    )
  }
}

const mapStateToProps = state => ({
  currentPage: state.contentList.currentPage
})

const Banner = props => {
  return (
    <div className='banner'>
      <div className='container'>
        <h1 className='logo-font'>
          {props.appName}
        </h1>
        <Statement statement='Convenience from the Convenients' page={props.currentPage}/>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, ()=>({}))(Banner)
