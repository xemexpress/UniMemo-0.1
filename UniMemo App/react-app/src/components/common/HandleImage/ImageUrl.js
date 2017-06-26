import React from 'react'

import ToGetPicUrl from './ToGetPicUrl'

const ImageUrl = props => {
  return (
    <div>
      <ToGetPicUrl />

      <fieldset className='form-group'>
        <input
          className='form-control form-control-lg'
          type='url'
          placeholder='An image URL if it helps (optional)'
          value={props.image}
          onChange={props.changeImage} />
      </fieldset>

      <div className='row'>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          {
            props.image ?
              <img
                className='img-fluid'
                src={props.image}
                alt='preview failed. The URL better ends with .jpg/.jpeg or .png' />
              : null
          }
        </div>
      </div>
    </div>
  )
}

export default ImageUrl
