import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import DefoultSlideBar from './DefoultSlidebar'
import MobileBottombar from './MobileBottombar'

const MainContainer=()=> {
  return (
    <div className="flex w-[100vw] h-[88vh] px-2">
        <DefoultSlideBar/>
        <div className="flex flex-col flex-grow ">
          <ButtonList />
          <div className="flex-grow overflow-y-auto">
            <VideoContainer />
          </div>
          <MobileBottombar/>
        </div>

        
    </div>
  )
}

export default MainContainer;