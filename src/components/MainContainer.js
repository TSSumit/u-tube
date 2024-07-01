import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import DefoultSlideBar from './DefoultSlidebar'
import MobileBottombar from './MobileBottombar'
import HeadBar from "./HeadBar";

const MainContainer=()=> {
  return (
    <div className='flex flex-col overflow-x-hidden max-h-screen max-w-screen'>
      <HeadBar />
      <div className="flex w-[100vw] h-[88vh] px-5">
        <DefoultSlideBar/>
        <div className="flex flex-col flex-grow ">
          <ButtonList />
          <div className="flex-grow overflow-y-auto">
            <VideoContainer />
          </div>
          <MobileBottombar/>
        </div>        
      </div>
    </div>
  )
}

export default MainContainer;