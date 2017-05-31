import React from 'react'

class HelperList extends React.Component {
  componentWillMount(){
    if(this.props.posterName === this.props.currentUserName){
      this.props.onHelperLoad(this.props.requestId)
    }
  }

  render(){
    const helpers = this.props.helpers
    if(!helpers){
      return null
    }

    if(helpers.length === 0){
      return (
        <div className='article-meta'>
          No helpers are here... yet
        </div>
      )
    }
    return (
      <div className='article-meta'>
        Helpers:&nbsp;
        {
          helpers.map(helper => {
            return (
              <div className='helper' key={helper.username}>
                <img src={helper.proPic} alt={helper.username} />&nbsp;
                {helper.username}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default HelperList
