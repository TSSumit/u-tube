import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';
import VideoPlayerShimmer from '../Shimmers/VideoPlayerShimmer'; // Adjust the import path as necessary

const VideoPlayer = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoId = queryParams.get('v');

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
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
      <YouTube
        videoId={videoId}
        opts={opts}
        className={`inline-block align-middle ${loading ? 'hidden' : ''}`}
        onReady={handleReady}
        onStateChange={handleStateChange}
        onError={handleError}
      />
    </div>
  );
};

export default VideoPlayer;
