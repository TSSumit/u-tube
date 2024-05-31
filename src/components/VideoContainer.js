import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { YOUTUBE_VIDEOS_API } from '../utils/constants';

function VideoContainer() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEOS_API);
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className='w-full h-full flex flex-row flex-wrap border-2 overflow-y-scroll'>
      {videos.map(video => (
        <VideoCard key={video.id} info={video} />
      ))}
    </div>
  );
}

export default VideoContainer;
