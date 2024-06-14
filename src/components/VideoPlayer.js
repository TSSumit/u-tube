import React from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

const VideoPlayer = () => {
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

  return (
    <div className="flex justify-center items-center p-4 w-full h-fit">
      <YouTube videoId={videoId} opts={opts} className="inline-block align-middle" />
    </div>
  );
};

export default VideoPlayer;
