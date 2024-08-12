import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import VideoCard from './VideoCard.js';
import {  YOUTUBE_API_BASE_URL } from '../utils/constants.js';
import VideoCardShimmer from '../Shimmers/VideoCardShimmer.js';
import ErrorPage from './ErrorPage.js';
import HeadBar from './HeadBar.js';
import ButtonList from './ButtonList.js';
import DefoultSlideBar from './DefoultSlidebar.js';
import MobileBottombar from './MobileBottombar.js';
import { fetchWithKeyCycling } from '../utils/apiUtils.js';

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('search_query');

  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithKeyCycling(`${YOUTUBE_API_BASE_URL}search?part=snippet&type=video&maxResults=30&q=${encodeURIComponent(keyword)}`);
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const videoDetailsData = await fetchWithKeyCycling(`${YOUTUBE_API_BASE_URL}videos?part=snippet,contentDetails,statistics&id=${videoIds}`);
      setVideos(videoDetailsData.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("An error occurred while fetching videos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) {
      getVideos();
    }
  }, [keyword]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  
  return (
    <div className='flex flex-col overflow-x-hidden max-h-screen max-w-screen'>
      <HeadBar />
      <div className="flex w-[100vw] h-[88vh] px-5">
        <DefoultSlideBar/>
        <div className="flex flex-col flex-grow ">
          <ButtonList />
            <div className="flex-grow overflow-y-auto">
              <div className='max-w-[94vw] sm:w-[100vw] h-full flex flex-wrap justify-around items-start border-[1px] overflow-y-scroll'>
                {loading ? (
                  Array.from({ length: 30 }).map((_, index) => (
                    <VideoCardShimmer key={index} />
                  ))
                ) : (
                  videos.map(video => (
                    <Link key={video.id} to={`/watch?v=${video.id}`}>
                      <VideoCard key={video.id} info={video} />
                    </Link>
                  ))
                )}
              </div>
            </div>
          <MobileBottombar/>
        </div>        
      </div>
    </div>
  );
}

export default SearchPage;
