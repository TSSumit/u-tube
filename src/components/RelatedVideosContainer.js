// RelatedVideosContainer.js
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from 'react';
import { YOUTUBE_API_BASE_URL } from '../utils/constants.js';
import { fetchWithKeyCycling } from '../utils/apiUtils.js';
import RelatedVideoCard from './RelatedVideoCard.js';
import RelatedVideoCardShimmer from '../Shimmers/RelatedVideoCardShimmer.js';
import ErrorPage from './ErrorPage.js';

const RelatedVideosContainer = ({ videoId }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef(null); // Ref to observe the loading more indicator

  // Function to fetch related video data
  const fetchRelatedVideoData = async () => {
    setLoading(true);
    try {
      const data = await fetchWithKeyCycling(`${YOUTUBE_API_BASE_URL}search?part=snippet&id=${videoId}&type=video&maxResults=20`);
      if (data.error) {
        setError(data.error.message);
        return;
      }
      setRelatedVideos(data.items);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching related videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch more videos when scrolled to bottom
  const fetchMore = async () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await fetchWithKeyCycling(`${YOUTUBE_API_BASE_URL}search?part=snippet&id=${videoId}&type=video&maxResults=20&pageToken=${nextPageToken}`);
      if (data.error) {
        setError(data.error.message);
        return;
      }
      setRelatedVideos(prevVideos => [...prevVideos, ...data.items]);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching more related videos:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Set up Intersection Observer to load more videos on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && !loadingMore && nextPageToken) {
          fetchMore();
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

  useEffect(() => {
    fetchRelatedVideoData();
  }, [videoId]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='flex flex-col w-full p-4'>
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <RelatedVideoCardShimmer key={index} />
        ))
      ) : (
        <>
          {relatedVideos.map(video => (
            <RelatedVideoCard key={video.id.videoId} video={video} />
          ))}
          {/* Shimmer effect for loading more videos */}
          <div ref={observerRef}>
            {loadingMore && Array.from({ length: 4 }).map((_, index) => (
              <RelatedVideoCardShimmer key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RelatedVideosContainer;
