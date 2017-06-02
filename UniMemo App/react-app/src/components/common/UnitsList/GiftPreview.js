import React from 'react'
import { Link } from 'react-router'

const GiftPreview = props => {
  const gift = props.gift

  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link
          className='author'
          to={`@${gift.provider.username}`}>
          <img src={gift.provider.proPic} alt={gift.provider.username} />
        </Link>

        <div className='info'>
          <Link
            className='author'
            to={`@${gift.provider.username}`}>
            {gift.provider.username}
            {/* <span style={{color:'lightyellow'}}>        // yellowStars
              <i className='ion-star'></i>&nbsp;{gift.provider.yellowStars}
            </span> */}
          </Link>
          <span className='date'>
            {new Date(gift.createdAt).toDateString()}
          </span>
        </div>
      </div>

      <Link to={`gift/${gift.giftId}`} className='preview-link'>
        <h1>{gift.text}</h1>

        <p>Before:&nbsp;{new Date(gift.expireAt).toDateString()}</p>

        <span>Read more...</span>

        <ul className='tag-list'>
          {
            gift.tagList.map(tag => {
              return (
                <li className='tag-default tag-pill tag-outline' key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  )
}

export default GiftPreview
