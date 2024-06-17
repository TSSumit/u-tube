import React from 'react';

const VideoCardShimmer = () => {
  return (
    <div className='inline-block grow min-w-[12rem] md:min-w-[18rem] max-w-[22rem] sm:w-[100vw] h-auto m-2 bg-gray-100 rounded-xl animate-pulse'>
      <div className='w-full h-40 bg-gray-200 rounded-t-xl'></div>
      <div className='p-3'>
        <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-2/4 mb-2'></div>
        <div className='flex items-center space-x-3'>
          <div className='h-4 bg-gray-200 rounded w-1/4'></div>
          <div className='h-4 bg-gray-200 rounded w-2/6'></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardShimmer;
