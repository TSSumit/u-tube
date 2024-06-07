import React from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';

const VideoPlayer = ({videoId}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  console.log("aaaa"+videoId);
  videoId = queryParams.get('v');
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    // Access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div className="flex justify-center items-center p-4">
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />

    </div>
  );
};

export default VideoPlayer;
