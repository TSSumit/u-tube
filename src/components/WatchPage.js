import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import VideoPlayer from './VideoPlayer';
import { useLocation } from 'react-router-dom';

const WatchPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoId = queryParams.get('v');
  const videoData = location.state?.videoData;
  console.log("videoId is "+videoId)
  console.log("videoData is "+videoData)
  useEffect(()=>{
    dispatch(closeMenu());
  },[])
  return (
    <div className="container mx-auto p-4">
      {/* {videoId}
      {videoData} */}
      <h1 className="text-2xl font-bold mb-4">Watch Video</h1>
      <VideoPlayer videoId={videoId} />
    </div>
  )
}

export default WatchPage;
