/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import VideoCard from './VideoCard.js';
import { YOUTUBE_API_BASE_URL } from '../utils/constants.js';
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

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const observerRef = useRef(null); // Ref to observe the loading more indicator

  const fetchVideos = useCallback(async (pageToken = '') => {
    setLoading(!pageToken); // Set loading state only when initial fetch
    setError(null);
    try {
      const searchUrl = `${YOUTUBE_API_BASE_URL}search?part=snippet&type=video&maxResults=30&q=${encodeURIComponent(keyword)}${pageToken ? `&pageToken=${pageToken}` : ''}`;
      const data = await fetchWithKeyCycling(searchUrl);
      if (data.error) {
        setError(data.error);
        return;
      }
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const videoDetailsUrl = `${YOUTUBE_API_BASE_URL}videos?part=snippet,contentDetails,statistics&id=${videoIds}`;
      const videoDetailsData = await fetchWithKeyCycling(videoDetailsUrl);
      setVideos(prevVideos => [...prevVideos, ...videoDetailsData.items]);
      setNextPageToken(data.nextPageToken || null);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("An error occurred while fetching videos.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [keyword]);

  useEffect(() => {
    if (keyword) {
      fetchVideos();
    }
  }, [keyword, fetchVideos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && !loadingMore && nextPageToken) {
          loadMoreVideos();
        }
      },
      { threshold: 1.0 } // Trigger when 100% of the observed element is visible
    );

    const observedElement = observerRef.current;
    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, [loading, loadingMore, nextPageToken]);

  const loadMoreVideos = () => {
    if (nextPageToken) {
      setLoadingMore(true);
      fetchVideos(nextPageToken);
    }
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='flex flex-col overflow-x-hidden max-h-screen max-w-screen'>
      <HeadBar />
      <div className="flex w-[100vw] h-[88vh] px-5">
        <DefoultSlideBar />
        <div className="flex flex-col flex-grow">
          <ButtonList />
          <div className="flex-grow overflow-y-auto">
            <div className='max-w-[94vw] sm:w-[100vw] h-full flex flex-wrap justify-around items-start border-[1px] overflow-y-auto'>
              {loading && videos.length === 0 ? (
                Array.from({ length: 30 }).map((_, index) => (
                  <VideoCardShimmer key={index} />
                ))
              ) : (
                videos.map(video => (
                  <Link key={video.id} to={`/watch?v=${video.id}`}>
                    <VideoCard info={video} />
                  </Link>
                ))
              )}
              {/* Shimmer effect for loading more videos */}
              {loadingMore && (
                <div className='w-full flex justify-center'>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <VideoCardShimmer key={index} />
                  ))}
                </div>
              )}
              <div ref={observerRef}></div>
            </div>
          </div>
          <MobileBottombar />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
