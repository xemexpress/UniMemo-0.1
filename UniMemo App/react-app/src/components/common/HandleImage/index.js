import React from 'react'

import ImageUrl from './ImageUrl'
import ImageUpload from './ImageUpload'

const HandleImage = props => {
  return (
    <div>
      <ImageUpload
        uploadImage={props.uploadImage} />
              
      <ImageUrl
        image={props.image}
        changeImage={props.changeImage} />
    </div>
  )
}

export default HandleImage
