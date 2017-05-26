import React from 'react'
import { connect } from 'react-redux'

import ListErrors from './ListErrors'
import agent from '../agent'

import {
  REQUEST_SUBMITTED,
  EDITOR_PAGE_LOADED,
  UPDATE_FIELD_EDITOR,
  EDITOR_PAGE_UNLOADED,
  ADD_TAG,
  REMOVE_TAG
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.editor
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: EDITOR_PAGE_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: EDITOR_PAGE_UNLOADED
  }),
  onUpdateField: (key, value) => dispatch({
    type: UPDATE_FIELD_EDITOR,
    key,
    value
  }),
  onAddTag: () => dispatch({
    type: ADD_TAG
  }),
  onRemoveTag: tag => dispatch({
    type: REMOVE_TAG,
    tag
  }),
  onSubmit: payload => dispatch({
    type: REQUEST_SUBMITTED,
    payload
  })
})

class Editor extends React.Component {
  constructor(){
    super()

    this.state = {
      checked: false
    }

    this.changeStartTime = ev => this.props.onUpdateField('startTime', ev.target.value)
    this.changeStartPlace = ev => this.props.onUpdateField('startPlace', ev.target.value)
    this.changeEndTime = ev => this.props.onUpdateField('endTime', ev.target.value)
    this.changeEndPlace = ev => this.props.onUpdateField('endPlace', ev.target.value)
    this.changeText = ev => this.props.onUpdateField('text', ev.target.value)
    this.changeImage = ev => this.props.onUpdateField('image', ev.target.value)
    this.changeTagInput = ev => this.props.onUpdateField('tagInput', ev.target.value)

    this.watchForEnter = ev => {
      if(ev.keyCode === 13){
        ev.preventDefault()
        this.props.onAddTag()
      }
    }

    this.removeTag = tag => ev => {
      ev.preventDefault()
      this.props.onRemoveTag(tag)
    }

    this.submitForm = ev => {
      ev.preventDefault()

      const request = {
        start_time: this.props.startTime,
        start_place: this.props.startPlace,
        end_time: this.props.endTime,
        end_place: this.props.endPlace,
        text: this.props.text,
        image: this.props.image,
        tag_list: this.props.tagList
      }

      const requestId = this.props.requestId
      const promise = requestId ?
        agent.Requests.update(Object.assign(request, { requestId })):
        agent.Requests.create(request)

      this.props.onSubmit(promise)
    }
  }

  componentWillReceiverProps(nextProps){
    if(this.props.params.requestId !== nextProps.params.requestId){
      if(nextProps.params.requestId){
        this.props.onUnload()
        this.setState({ checked: true })
        return this.props.onLoad(agent.Requests.get(this.props.params.requestId))
      }
      this.props.onLoad(null)
    }
  }

  componentWillMount(){
    if(this.props.params.requestId){
      this.props.onLoad(agent.Requests.get(this.props.params.requestId))
      this.setState({ checked: true })
      return
    }
    this.props.onLoad(null)
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    const expand = () => this.setState({
      checked: !this.state.checked
    })

    return (
      <div className='editor-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-10 offset-md-1 col-xs-12'>

              <ListErrors errors={this.props.error} />

              <form>
                <fieldset>
                  <fieldset className='form-group'>
                    <textarea
                      className='form-control form-control-lg'
                      rows='5'
                      placeholder="What's this request about"
                      value={this.props.text}
                      onChange={this.changeText}></textarea>
                  </fieldset>

                  <label htmlFor='toggle'>
                    <strong>Optional:</strong> Set how it starts
                  </label>
                  &nbsp;&nbsp;
                  <input
                    id='toggle'
                    type='checkbox'
                    checked={this.state.checked}
                    onChange={expand} />

                  <div id='expand'>
                    <fieldset className='form-group'>
                      Start Time:
                      <input
                        className='form-control form-control-lg'
                        type='datetime-local'
                        value={this.props.startTime}
                        onChange={this.changeStartTime} />
                    </fieldset>

                    <fieldset className='form-group'>
                      Start Place:
                      <input
                        className='form-control form-control-lg'
                        type='text'
                        placeholder='Where it starts (Optional)'
                        value={this.props.startPlace}
                        onChange={this.changeStartPlace} />
                    </fieldset>
                  </div>

                  <fieldset className='form-group'>
                    End Time:
                    <input
                      className='form-control form-control-lg'
                      type='datetime-local'
                      value={this.props.endTime}
                      onChange={this.changeEndTime} />
                  </fieldset>

                  <fieldset className='form-group'>
                    End Place:
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      placeholder='Where to do it'
                      value={this.props.endPlace}
                      onChange={this.changeEndPlace} />
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='url'
                      placeholder='Image URL that helps to describe this request'
                      value={this.props.image}
                      onChange={this.changeImage} />
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      placeholder='Enter tags'
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} />

                    <div className='tag-list'>
                      {
                        (this.props.tagList || []).map(tag => {
                          return (
                            <span
                              className='tag-default tag-pill'
                              key={tag}>
                              <i
                                className='ion-close-round'
                                onClick={this.removeTag(tag)}></i>
                              {tag}
                            </span>
                          )
                        })
                      }
                    </div>
                  </fieldset>

                  <button
                    className='btn btn-lg pull-xs-right btn-primary'
                    type='button'
                    onClick={this.submitForm}
                    disabled={this.props.inProgress}>
                    Post Request
                  </button>

                  {
                    this.props.image ?
                      <img
                        className='img-fluid'
                        src={this.props.image}
                        alt='preview' /> : null
                  }

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
