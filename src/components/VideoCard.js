import React from 'react';
import getRelativeTime from '../utils/getRelativeTime';

// Utility function to format view count
const formatViewCount = (views) => {
  if(views === 1){
    return '1 view';
  }  else if(views >= 100000000){
    return (views / 100000000).toFixed(1) + 'B views';
  }  else if (views >= 1000000) {
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
  console.log(info);
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  // Placeholder for channel logo URL
  const channelLogoUrl = 'https://via.placeholder.com/50'; // Update this as necessary

  return (
    <div className='inline-block min-w-[16rem] max-w-[28vw] min-h-[15rem] max-h-[50vh] m-3 bg-gray-100 rounded-xl'>
      <img
        alt='video thumbnail'
        src={thumbnails.medium.url}
        className='w-full rounded-t-xl'
      />
      <div className='p-3'>
        <p className='text-md font-bold -mt-1'>{truncateTitle(title, 69)}</p>
        <div className='flex items-center'>
          <img
            alt='channel logo'
            src={channelLogoUrl}
            className='w-10 h-10 rounded-full mr-2 top-0'
          />
          <div >
            <p className='text-sm '>{channelTitle}</p>
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
