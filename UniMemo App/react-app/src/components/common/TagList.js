import React from 'react'

const TagList = ({ unit }) => {
  if(!unit.requestId && !unit.giftId){
    return null
  }

  const statusList = unit.requestId ? ['done', 'ongoing', 'ongoing-taken'] : ['personal', 'public', 'openPublic']
  const typeList = unit.requestId ? ['delivering', 'production', 'shopping'] : ['delivering', 'giveOrLend', 'know']

  return (
    <ul className='tag-list'>
      {
        unit.tagList.map(tag => {
          if(statusList.indexOf(tag) !== -1){
            return (
              <li className='tag-default tag-pill tag-info' key={tag}>
                {tag}
              </li>
            )
          }else if(typeList.indexOf(tag) !== -1){
            return (
              <li className='tag-default tag-pill tag-success' key={tag}>
                {tag}
              </li>
            )
          }
          return (
            <li className='tag-default tag-pill tag-outline' key={tag}>
              {tag}
            </li>
          )
        })
      }
    </ul>
  )
}

export default TagList
