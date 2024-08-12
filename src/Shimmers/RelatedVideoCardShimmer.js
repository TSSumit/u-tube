import React from 'react';

const RelatedVideoCardShimmer = () => {
  return (
    <div className='flex mb-4 animate-pulse'>
      <div className='min-w-60 min-h-20 object-cover  bg-gray-300 rounded-lg'></div>
      <div className='ml-4'>
        <div className='w-40 h-4 bg-gray-300 rounded mb-2'></div>
        <div className='w-24 h-4 bg-gray-300 rounded mb-2'></div>
        <div className='w-20 h-4 bg-gray-300 rounded'></div>
      </div>
    </div>
  );
};

export default RelatedVideoCardShimmer;
