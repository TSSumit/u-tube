import React from 'react'
import Button from './Button'

function ButtonList() {

  const list=["All",'News' , 'Live', 'Gaming','Movie','Commedy','Songs','Cricket','Food', 'Sports', 'Cooking', 'Fruits','Public Speaking', 'Podcast','Rain', 'Recently uploaded', 'Watched', 'New to you']
  return (
    <div className=' h-[fit] w-[68%] mx-3 my-2  flex overflow-x-scroll overflow-y-hidden rounded-sm '>
      {list.map((item, index) => (
        <Button key={index} name={item} />
      ))}
    </div>

  )
}

export default ButtonList