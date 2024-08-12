/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard.js';
import { YOUTUBE_API_BASE_URL } from '../utils/constants.js';
import VideoCardShimmer from '../Shimmers/VideoCardShimmer.js';
import ErrorPage from './ErrorPage.js';
import { fetchWithKeyCycling } from '../utils/apiUtils.js';

function VideoContainer() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef(null); // Ref to observe the loading more indicator

  // Function to fetch videos
  const fetchVideos = async (pageToken = '') => {
    try {
      setLoading(true);
      const url = `${YOUTUBE_API_BASE_URL}videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=50&pageToken=${pageToken}`;
      const data = await fetchWithKeyCycling(url);
      if (data.error) {
        setError(data.error);
        return;
      }
      setVideos(prevVideos => [...prevVideos, ...data.items]);
      setNextPageToken(data.nextPageToken || null);
      console.log('NextPageToken:', data.nextPageToken); // Logging nextPageToken
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("An error occurred while fetching videos.");
    } finally {
      setLoading(false);
    }
  };

  // Load initial videos
  useEffect(() => {
    fetchVideos();
  }, []);

  // Load more videos on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && !loadingMore && nextPageToken) {
          loadMoreVideos();
        }
      },
      { threshold: 0.75 } // Trigger when 75% of the observed element is visible
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

  // Function to load more videos
  const loadMoreVideos = () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    fetchVideos(nextPageToken)
      .finally(() => setLoadingMore(false));
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='max-w-[94vw] sm:w-[100vw] h-full flex flex-wrap justify-around items-start border-[1px] overflow-y-auto'>
      {loading && videos.length === 0 ? (
        Array.from({ length: 20 }).map((_, index) => (
          <VideoCardShimmer key={index} />
        ))
      ) : (
        videos.map(video => (
          <Link key={video.id} to={`/watch?v=${video.id}`}>
            <VideoCard info={video} />
          </Link>
        ))
      )}

      {/* Show shimmer effects only if loading more and in the same container */}
      {loadingMore && (
        <div className='w-full flex flex-wrap justify-center'>
          {Array.from({ length: 7 }).map((_, index) => (
            <VideoCardShimmer key={index} />
          ))}
        </div>
      )}

      <div ref={observerRef}></div>
    </div>
  );
}

export default VideoContainer;
