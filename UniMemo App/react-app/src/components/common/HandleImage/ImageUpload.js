import React from 'react'
import request from 'superagent'
import Dropzone from 'react-dropzone'

const CLOUDINARY_UPLOAD_PRESET = 'unimemo-dfd94'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/unimemo-dfd94/upload'

class ImageUpload extends React.Component {
  constructor(){
    super()
    this.handleImageUpload = file => {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file)
      upload.end((err, response) => {
        if(err){
          console.error(err)
          alert(err)
        }

        if(response.body.secure_url !== ''){
          this.props.uploadImage(response.body.secure_url)
        }
      })
    }

    this.onImageDrop = files => {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', files[0])
      upload.end((err, response) => {
        console.log('error', err, 'response', response)
        if(err){
          console.error(err)
          alert(err)
        }

        if(response.body.secure_url !== ''){
          this.props.uploadImage(response.body.secure_url)
        }
      })
    }
  }

  render(){
    return (
      <div>
        <div className='text-xs-center'>
          <i>
            <i className='ion-information-circled'></i>&nbsp;After you dropped an image, image conversion will be in full swing. Please wait until we display your image.
          </i>
        </div>
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

export default ImageUpload
