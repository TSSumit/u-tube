import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from './VideoCard';
import { API_Key, YOUTUBE_API_BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import VideoCardShimmer from '../Shimmers/VideoCardShimmer';
import ErrorPage from './ErrorPage';

function SearchPage() {
  const { keyword } = useParams();
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${YOUTUBE_API_BASE_URL}search?part=snippet&type=video&maxResults=30&q=${encodeURIComponent(keyword)}&key=${API_Key}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const videoDetailsResponse = await fetch(`${YOUTUBE_API_BASE_URL}videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_Key}`);
      const videoDetailsData = await videoDetailsResponse.json();
      setVideos(videoDetailsData.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("An error occurred while fetching videos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, [keyword]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='w-full h-full flex flex-wrap justify-around items-start border-[1px] overflow-y-scroll'>
      {loading ? (
        Array.from({ length: 30 }).map((_, index) => (
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

export default SearchPage;
