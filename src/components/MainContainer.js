import React from 'react'
import ButtonList from './ButtonList.js'
import VideoContainer from './VideoContainer.js'
import DefoultSlideBar from './DefoultSlidebar.js'
import MobileBottombar from './MobileBottombar.js'
import HeadBar from "./HeadBar.js";

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