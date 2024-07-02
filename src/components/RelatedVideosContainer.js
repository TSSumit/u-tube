// RelatedVideosContainer.js
import React, { useState, useEffect } from 'react';
import { YOUTUBE_API_BASE_URL } from '../utils/constants';
import { fetchWithKeyCycling } from '../utils/apiUtils';
import RelatedVideoCard from './RelatedVideoCard';
import RelatedVideoCardShimmer from '../Shimmers/RelatedVideoCardShimmer';
import ErrorPage from './ErrorPage';

const RelatedVideosContainer = ({ videoId }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
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

    fetchRelatedVideoData();
  }, [videoId]);

  const fetchMore = async () => {
    if (!nextPageToken) return;
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
          {nextPageToken && (
            <button 
              onClick={fetchMore} 
              disabled={loadingMore} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loadingMore ? 'Loading...' : 'Show More'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RelatedVideosContainer;
