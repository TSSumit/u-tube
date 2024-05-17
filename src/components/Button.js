import React from 'react'

const Button = ({name}) => {
  return (
    <button className='mx-2 px-4 h-8 min-w-fit  bg-gray-200 rounded-md '>{name}</button>
  )
}

export default Button