import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

function ButtonList() {

  const list=["All",'News' , 'Live', 'Gaming','Movie','Commedy','Songs','Cricket','Food', 'Sports', 'Cooking', 'Fruits','Public Speaking', 'Podcast','Rain', 'Recently uploaded', 'Watched', 'New to you']
  return (
    <div className='min-h-12 w-full ml-4 flex-grow px-3  flex overflow-x-scroll overflow-y-hidden rounded-sm '>
      {list.map((item, index) => (
        <Link to={`/results?search_query=${encodeURIComponent(item)}`} >
          <Button key={index} name={item} />
        </Link>
      ))}
    </div>

  )
}

export default ButtonList