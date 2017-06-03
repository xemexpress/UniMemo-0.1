import React from 'react'
import { connect } from 'react-redux'

import ListErrors from './common/ListErrors'
import TagList from './common/TagList'
import agent from '../agent'

import {
  SUBMIT_REQUEST,
  REQUEST_EDITOR_LOADED,
  REQUEST_EDITOR_UNLOADED,
  UPDATE_FIELD_REQUEST,
  ADD_TAG_REQUEST,
  REMOVE_TAG_REQUEST
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.requestEditor
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: REQUEST_EDITOR_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: REQUEST_EDITOR_UNLOADED
  }),
  onUpdateField: (key, value) => dispatch({
    type: UPDATE_FIELD_REQUEST,
    key,
    value
  }),
  onAddTag: () => dispatch({
    type: ADD_TAG_REQUEST
  }),
  onRemoveTag: tag => dispatch({
    type: REMOVE_TAG_REQUEST,
    tag
  }),
  onSubmit: payload => dispatch({
    type: SUBMIT_REQUEST,
    payload
  })
})

class RequestEditor extends React.Component {
  constructor(){
    super()

    this.state = {
      checked: false
    }

    this.expand = () => this.setState({
      checked: !this.state.checked
    })

    this.changeStartTime = ev => this.props.onUpdateField('startTime', ev.target.value)
    this.changeStartPlace = ev => this.props.onUpdateField('startPlace', ev.target.value)
    this.changeEndTime = ev => this.props.onUpdateField('endTime', ev.target.value)
    this.changeEndPlace = ev => this.props.onUpdateField('endPlace', ev.target.value)
    this.changeText = ev => this.props.onUpdateField('text', ev.target.value)
    this.changeImage = ev => this.props.onUpdateField('image', ev.target.value)
    this.changeTagInput = ev => this.props.onUpdateField('tagInput', ev.target.value)

    this.watchForEnter = ev => {
      if(ev.keyCode === 13 && ['ongoing', 'ongoing-taken', 'done', ''].indexOf(this.props.tagInput.toLowerCase()) === -1){
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
                      onChange={this.changeText} />
                  </fieldset>

                  <label htmlFor='toggleStart'>
                    <strong>Optional:</strong> Set when it starts
                  </label>
                  &nbsp;&nbsp;
                  <input
                    id='toggleStart'
                    type='checkbox'
                    checked={this.state.checked}
                    onChange={this.expand} />

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
                      type='text'
                      placeholder='Enter tags. Recommend choosing 1 from &#39;delivering&#39;, &#39;production&#39; & &#39;shopping&#39;'
                      // except &#39;ongoing&#39;, &#39;ongoing-taken&#39;, &#39;done&#39;
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} />

                    <TagList unit={this.props} removeTag={this.removeTag} />
                  </fieldset>

                  <div className='text-xs-center'>
                    <i className='ion-information-circled'></i>&nbsp;
                    Get URL by uploading your custom pic&nbsp;
                    <a
                      className='nav-link'
                      href='https://photouploads.com/'
                      target='_blank'>here</a>
                  </div>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='url'
                      placeholder='An image URL (you may leave it if you don&#39;t have one)'
                      value={this.props.image}
                      onChange={this.changeImage} />
                  </fieldset>

                  {
                    this.props.image ?
                      <img
                        className='img-fluid'
                        src={this.props.image}
                        alt='preview' /> : null
                  }

                  <button
                    className='btn btn-lg pull-xs-right btn-primary'
                    type='button'
                    onClick={this.submitForm}
                    disabled={this.props.inProgress}>
                    Post Request
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestEditor)
