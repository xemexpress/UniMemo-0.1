import React from 'react'

import agent from '../../agent'

const Tags = props => {
  const tags = props.tags
  if(tags){
    return (
      <ul className='tag-list'>
        {
          tags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault()
              if(props.tagType === 'request'){
                return props.onClickTag(tag, agent.Requests.byTag(tag))
              }
              props.onClickTag(tag, agent.Gifts.byTag(tag))
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
  return (
    <div>Loading Tags...</div>
  )
}

export default Tags
