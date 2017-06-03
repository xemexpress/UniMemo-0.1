import React from 'react'

import agent from '../../agent'

const Tags = props => {
  if(!props.tags){
    return (
      <div>Loading Tags...</div>
    )
  }

  const tags = props.tags

  let payload
  if(props.tagType === 'request'){
    payload = tag => agent.Requests.byTag(tag)
  }else{
    payload = tag => agent.Gifts.byTag(tag)
  }

  return (
    <ul className='tag-list'>
      {
        tags.map(tag => {
          const handleClick = ev => {
            ev.preventDefault()
            return props.onClickTag(tag, payload(tag))
          }
          return (
            <a
              className='tag-default tag-pill'
              key={tag}
              onClick={handleClick}>
              {tag}
            </a>
          )
        })
      }
    </ul>
  )
}

export default Tags
