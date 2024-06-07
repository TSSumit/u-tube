import React from 'react';
import getRelativeTime from '../utils/getRelativeTime';

// Utility function to format view count
const formatViewCount = (views) => {
  if (views === 1) {
    return '1 view';
  } else if (views >= 100000000) {
    return (views / 100000000).toFixed(1) + 'B views';
  } else if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M views';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K views';
  }
  return views + ' views';
};

const truncateTitle = (title, maxLength) => {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...';
  }
  return title;
};

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  console.log(info);

  return (
    <div className='inline-block grow min-w-[12rem]  md:min-w-[18rem] max-w-[22rem] sm:w-[100vw] h-auto m-2 bg-gray-100 rounded-xl'>
      <img
        alt='video thumbnail'
        src={thumbnails.medium.url}
        className='w-full h-auto rounded-t-xl'
      />
      <div className='p-3'>
        <p className='text-md font-bold -mt-1'>{truncateTitle(title, 69)}</p>
        <div className='flex items-center'>
          <div>
            <p className='text-sm'>{channelTitle}</p>
            <p className='text-sm text-gray-600'>
              {formatViewCount(statistics.viewCount)} &middot; {getRelativeTime(publishedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;