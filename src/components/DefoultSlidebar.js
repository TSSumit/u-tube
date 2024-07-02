import React from 'react'
import { BiSolidVideos } from 'react-icons/bi'
import { GoHistory } from 'react-icons/go'
import { MdHomeFilled, MdSubscriptions } from 'react-icons/md'
import { SiYoutubeshorts } from 'react-icons/si'
import { Link } from 'react-router-dom'

const DefoultSlideBar = () => {
  return (
    <div className=' sm:block  w-[80px] h-[100%]    flex-row items-center text-xs '>
      <span className='flex flex-col justify-center items-center h-15 w-full py-5 my-2 hover:bg-slate-300  hover:rounded-md' >
        <Link to={"/home"} className="flex flex-col justify-center items-center">  
            <MdHomeFilled className='h-7 w-7'/>
            <span>Home</span>
        </Link>
      </span>
      <span className='flex flex-col justify-center items-center h-15 w-full py-5 my-2 hover:bg-slate-300  hover:rounded-md' >
        <Link to={"/shorts"} className="flex flex-col justify-center items-center">  
            <SiYoutubeshorts className='h-7 w-7'/>
            <span>Shorts</span>
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
            <span>You</span>
        </Link>
      </span>
      <span className='flex flex-col justify-center items-center h-15 w-full py-5 my-2 hover:bg-slate-300  hover:rounded-md' >
        <Link to={"/history"} className="flex flex-col justify-center items-center">  
            <GoHistory className='h-7 w-7'/>
            <span>History</span>
        </Link>
      </span>
    </div>
  )
}

export default DefoultSlideBar