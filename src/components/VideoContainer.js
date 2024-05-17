import React, { useEffect } from 'react'
import VideoCard from './VideoCard'
import { YOUTUBE_VIDEOS_API } from '../utils/constants';

function VideoContainer() {
  useEffect(()=>{
    getVideos();
  },[])
  const getVideos = async()=>{
    const data=await fetch(YOUTUBE_VIDEOS_API);
    const json=await data.json();
    console.log(json);
  }
  return (
    <div className='w-100% h-100%  max flex-row flex-w border-2 overflow-y-scroll'>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>
      <VideoCard/>      
    </div>
  )
}

export default VideoContainer