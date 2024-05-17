import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import { MdHomeFilled, MdSubscriptions } from 'react-icons/md'
import { SiYoutubeshorts } from 'react-icons/si'
import { BiSolidVideos } from 'react-icons/bi'

const MainContainer=()=> {
  return (
    <div className="flex w-[99vw] max-w-[100vw] h-[88vh] border-black">
        <div className=' h-[100%] w-[80px]  flex-row items-center text-xs '>
          <span className='flex flex-col justify-center items-center h-15 w-full my-7 ' >
            <MdHomeFilled className='h-7 w-7'/>
            <text>Home</text>
          </span>
          <span className='flex flex-col justify-center items-center h-15 w-full my-7 ' >
            <SiYoutubeshorts className='h-7 w-7'/>
            <text>Shorts</text>
          </span>
          <span className='flex flex-col justify-center items-center h-15 w-full my-7 ' >
            <MdSubscriptions className='h-7 w-7'/>
            <text>Subscriptions</text>
          </span>
          <span className='flex flex-col justify-center items-center h-15 w-full my-7 ' >
            <BiSolidVideos className='h-7 w-7'/>
            <text>You</text>
          </span>
        </div>
        <div className=' w-[calc(100vw - 64px)] h-[100%]  self-center flex-col p-2'>
          <ButtonList/>
          <div className='w-[1180px]  h-[455px] overflow-y-auto'>
            <VideoContainer/>
          </div>
        </div>
    </div>
  )
}

export default MainContainer;