import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { API_Key, YOUTUBE_API_BASE_URL} from '../utils/constants';
import { Link } from 'react-router-dom';
import VideoCardShimmer from '../Shimmers/VideoCardShimmer';
import ErrorPage from './ErrorPage';

function VideoContainer() {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch(`${YOUTUBE_API_BASE_URL}videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=50&key=${API_Key}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      }
      setVideos(data.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='max-w-[94vw] sm:w-[100vw] h-full flex flex-wrap justify-around items-start border-[1px] overflow-y-scroll'>
      {(loading || !videos) ? (
        Array.from({ length: 20 }).map((_, index) => (
          <VideoCardShimmer key={index} />
        ))
      ) : (
        videos.map(video => (
          <Link key={video.id} to={`watch?v=${video.id}`}>
            <VideoCard key={video.id} info={video} />
          </Link>
        ))
      )}
    </div>
  );
}

export default VideoContainer;
