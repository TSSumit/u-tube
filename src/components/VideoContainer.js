import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import { Link } from 'react-router-dom';

function VideoContainer() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getVideos();
    console.log("data fetched sucessfully"+videos);
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
    <div className='max-w-[94vw] sm:w-[100vw] h-full flex  flex-wrap justify-around items-start border-[1px] overflow-y-scroll'>
      {videos.map(video => (
        <Link key={video.id}
          to={{
            pathname: '/watch',
            search: `?v=${video.id}`,
            state: { videoData: video }
          }}>
          <VideoCard key={video.id} info={video}/>
        </Link>
      ))}
    </div>
  );
}

export default VideoContainer;
