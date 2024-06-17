import React from 'react';

const CommentBoxShimmer = () => {
  return (
    <div className='flex flex-col w-full p-4 bg-slate-100 shadow-md rounded-lg mb-4 animate-pulse'>
      <div className='flex items-center mb-2'>
        <div className='w-10 h-10 bg-gray-200 rounded-full mr-3'></div>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <div className='w-40 h-4 bg-gray-200 rounded mb-1'></div>
          </div>
          <div className='w-20 h-4 bg-gray-200 rounded'></div>
        </div>
      </div>
      <div className='ml-2'>
        <div className='mb-2'>
          <div className='w-3/4 h-4 bg-gray-200 rounded mt-1'></div>
          <div className='w-1/2 h-4 bg-gray-200 rounded mt-1'></div>
        </div>
        <div className='flex items-center mt-2 space-x-4 font-bold text-gray-700'>
          <div className='flex items-center space-x-1'>
            <span className='w-10 h-4 bg-gray-200 rounded'></span>
            <span className='w-10 h-4 bg-gray-200 rounded'></span>
          </div>
          <span className='w-16 h-4 bg-gray-200 rounded'></span>
        </div>
      </div>
    </div>
  );
};

export default CommentBoxShimmer;
