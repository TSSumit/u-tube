import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';
import VideoPlayerShimmer from '../Shimmers/VideoPlayerShimmer'; // Adjust the import path as necessary

const VideoPlayer = () => {
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState(null); // State to store videoId
  const location = useLocation();

  // useMemo to initialize queryParams
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    const id = queryParams.get('v');
    if (id) {
      setVideoId(id); // Set videoId if available in URL params
    }
  }, [queryParams]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      mute: 1, 
    },
  };

  const handleReady = () => {
    setLoading(false);
  };

  const handleStateChange = (event) => {
    if (event.data === 1) { // Video is playing
      setLoading(false);
    }
  };

  const handleError = () => {
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center p-4 w-full h-fit">
      {loading && <VideoPlayerShimmer />}
      {videoId && ( // Check if videoId is available before rendering YouTube component
        <YouTube
          videoId={videoId}
          opts={opts}
          className={`inline-block align-middle  ${loading ? 'hidden' : ''} rounded-md `}
          onReady={handleReady}
          onStateChange={handleStateChange}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
