import React from 'react'
import { BiSolidVideos } from 'react-icons/bi'
import { MdHomeFilled, MdSubscriptions } from 'react-icons/md'
import { SiYoutubeshorts } from 'react-icons/si'
import { Link } from 'react-router-dom'

const DefoultSlideBar = () => {
  return (
    <div className='hidden sm:block  w-[80px] h-[100%]    flex-row items-center text-xs '>
          <span className='flex flex-col justify-center items-center h-15 w-full py-5 my-2 hover:bg-slate-300  hover:rounded-md' >
            <Link to={"/"} className="flex flex-col justify-center items-center">  
                <MdHomeFilled className='h-7 w-7'/>
                <text>Home</text>
            </Link>
          </span>
          <span className='flex flex-col justify-center items-center h-15 w-full py-5 my-2 hover:bg-slate-300  hover:rounded-md' >
            <Link to={"/shorts"} className="flex flex-col justify-center items-center">  
                <SiYoutubeshorts className='h-7 w-7'/>
                <text>Shorts</text>
            </Link>
          </span>
          <span className='flex flex-col justify-center items-center h-15 w-full py-5 my-2 hover:bg-slate-300 hover:rounded-md'>
            <Link to={"/subscriptions"} className="flex flex-col justify-center items-center">
                <MdSubscriptions className='h-7 w-7'/>
                <span>Subscriptions</span>
            </Link>
          </span>
          <span className='flex flex-col justify-center items-center h-15 w-full py-5 my-2 hover:bg-slate-300  hover:rounded-md' >
            <Link to={"/you"} className="flex flex-col justify-center items-center">  
                <BiSolidVideos className='h-7 w-7'/>
                <text>You</text>
            </Link>
          </span>
        </div>
  )
}

export default DefoultSlideBar