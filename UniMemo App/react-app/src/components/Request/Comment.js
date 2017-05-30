import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ListErrors from '../ListErrors'
import agent from '../../agent'

import {
  UPDATE_COMMENT,
  DELETE_COMMENT
} from '../../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  onDel: (payload, commentId) => dispatch({
    type: DELETE_COMMENT,
    payload,
    commentId
  }),
  onUpdate: payload => dispatch({
    type: UPDATE_COMMENT,
    payload
  })
})

class Comment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      canEdit: false,
      body: props.comment.body
    }

    this.canEdit = ev => {
      ev.preventDefault()
      this.setState({
        canEdit: true
      })
    }

    this.setBody = ev => this.setState({
      body: ev.target.value
    })

    this.updateComment = ev => {
      ev.preventDefault()
      const payload = agent.Comments.update(
        this.props.requestId,
        this.props.comment.id,
        { body: this.state.body }
      )
      this.props.onUpdate(payload)
      this.setState({
        canEdit: false
      })
    }

    this.del = ev => {
      ev.preventDefault()
      const payload = agent.Comments.delete(this.props.requestId, this.props.comment.id)
      this.props.onDel(payload, this.props.comment.id)
    }
  }

  render(){
    const comment = this.props.comment
    const show = this.props.currentUser &&
      comment.author.username === this.props.currentUser.username

    return (
      <div className='card'>
        <div className='card-block'>
          <div className='card-text'>
            <ListErrors errors={this.props.errors} />
            {
              this.state.canEdit ?
              <textarea
                className='form-control'
                placeholder='Update Comment...'
                rows='3'
                value={this.state.body}
                onChange={this.setBody}>
              </textarea>
              : comment.body
            }
          </div>
        </div>

        <div className='card-footer'>
          <Link
            className='comment-author'
            to={`@${comment.author.username}`}>
            <img
              className='comment-author-img'
              src={comment.author.proPic}
              alt={comment.author.username} />
          </Link>&nbsp;

          <Link
            className='comment-author'
            to={`@${comment.author.username}`}>
            {comment.author.username}
          </Link>&nbsp;

          <span className='date-posted'>
            {new Date(comment.createdAt).toDateString()}
          </span>

          {
            // Delete Button
            show ?
            <span className='mod-options'>
              <i className='ion-trash-a' onClick={this.del}></i>
            </span>
            : null
          }
          &nbsp;
          {
            // Update-Submit Button
            show && this.state.canEdit ?
            <span className='mod-options'>
              <button
                className='btn btn-sm btn-primary'
                onClick={this.updateComment}>
                Update Comment
              </button>
            </span>
            :
            <span className='mod-options'>
              <i className='ion-edit' onClick={this.canEdit}></i>
            </span>
          }
        </div>

      </div>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(Comment)
