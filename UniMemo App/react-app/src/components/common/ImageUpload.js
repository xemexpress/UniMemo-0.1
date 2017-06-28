import React from 'react'
import request from 'superagent'
import sha1 from 'sha1'
import Dropzone from 'react-dropzone'

import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_UPLOAD_PRESET
} from '../../constants/imageUploads'

class ImageUpload extends React.Component {
  constructor(){
    super()
    this.state = {
      image: ''
    }

    this.onImageDrop = files => {
      alert('Please don\'t further perform any action until your image is shown below.')
      const image = files[0]

      const timestamp = Date.now() / 1000

      const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + CLOUDINARY_UPLOAD_PRESET
                        + CLOUDINARY_API_SECRET

      const signature = sha1(paramsStr)

      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .attach('file', image)
                          .field('api_key', CLOUDINARY_API_KEY)
                          .field('timestamp', timestamp)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('signature', signature)

      upload.end((err, response) => {
        if(err){
          alert(err)
          return
        }

        if(response.body.secure_url !== ''){
          this.setState({ image: response.body.secure_url })
          this.props.changeImage(response.body.secure_url)
        }
      })
    }
  }

  render(){
    if(this.state.image){
      return (
        <div className='row'>
          <div className='offset-lg-3 col-lg-6 offset-md-1 col-md-10 col-xs-12'>
            <img className='img-fluid' src={this.state.image} alt='Preview uploads failed.' />
          </div>
        </div>
      )
    }else{
      return (
        <div>
          {
            this.props.image ?
            <div className='row'>
              <div className='offset-lg-3 col-lg-6 offset-md-2 col-md-8 col-xs-12'>
                <img className='img-fluid' src={this.props.image} alt='Preview uploads failed.' />
              </div>
            </div>
            :
            null
          }
          <br />
          <Dropzone
            className='card text-xs-center article-preview'
            multiple={false}
            accept='image/*'
            onDrop={this.onImageDrop}>
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>
      )
    }
  }
}

export default ImageUpload
