import React from 'react';

const VideoPlayerShimmer = () => {
  return (
    <div className="flex justify-center items-center p-4 w-full h-fit">
      <div className="w-[640px] h-[390px] bg-gray-200 rounded-xl animate-pulse"></div>
    </div>
  );
};

export default VideoPlayerShimmer;
