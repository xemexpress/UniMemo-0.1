import React from 'react'
// import marked from 'marked'
import { connect } from 'react-redux'

import RequestMeta from './RequestMeta'
import CommentContainer from './CommentContainer'
import agent from '../../agent'

import {
  REQUEST_PAGE_LOADED,
  REQUEST_PAGE_UNLOADED
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.request,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: REQUEST_PAGE_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: REQUEST_PAGE_UNLOADED
  })
})

class Request extends React.Component {
  componentWillMount(){
    this.props.onLoad(Promise.all([
      agent.Requests.get(this.props.params.requestId),
      agent.Comments.forRequest(this.props.params.requestId)
    ]))
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    const request = this.props.request

    if(!request){
      return null
    }

    // const image = request.image ? `
    //   <img className='img-fluid' src=${request.image} alt='Image provided by ${request.poster}' />
    //
    //
    //   ` : null
    // const text = `
    //     Start Time: ${request.startTime ? new Date(request.startTime).toDateString() : 'Before End Time :)'}
    //
    //     Start Place: ${request.startPlace ? request.startPlace : 'Not determined yet :)'}
    //
    //
    //     End Time: __${new Date(request.endTime).toDateString()}__
    //
    //     End Place: __${request.endPlace}__
    // `

    const text = `
      <div>
        Start Time:&nbsp;
          <strong>${request.startTime ? new Date(request.startTime).toDateString() : 'Before End Time :)'}</strong>
        <br />
        Start Place:&nbsp;
          <strong>${request.startPlace ? request.startPlace : 'Not determined yet :)'}</strong>
        <br />
        <br />
        End Time:&nbsp;
          <strong>${new Date(request.endTime).toDateString()}</strong>
        <br />
        End Place:&nbsp;
          <strong>${request.endPlace}</strong>
      </div>
    `

    const markup = {
      // __html: marked(image + text)
      __html: text
    }

    const canModify = this.props.currentUser &&
      this.props.currentUser.username === request.poster.username

    return (
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>
            <h1>{request.text}</h1>

            <RequestMeta
              request={request}
              canModify={canModify} />
          </div>
        </div>

        <div className='container page'>
          <div className='row article-content'>
            <div className='col-xs-12'>
              <div dangerouslySetInnerHTML={markup}></div>

              <ul className='tag-list'>
                {
                  request.tagList.map(tag => {
                    return (
                      <li
                        className='tag-default tag-pill tag-outline'
                        key={tag}>
                        {tag}
                      </li>
                    )
                  })
                }
              </ul>

              <hr />

              {
                request.image ?
                  <div className='offset-lg-3 col-lg-6'>
                    <img className='img-fluid' src={request.image} alt={`Provided by ${request.poster.username}`} />
                  </div>
                : null
              }

            </div>
          </div>

          <hr />

          <div className='row'>
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              requestId={this.props.params.requestId}
              currentUser={this.props.currentUser} />
          </div>

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Request)
