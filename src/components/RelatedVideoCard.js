import React from 'react';
import { Link } from 'react-router-dom';
import getRelativeTime from '../utils/getRelativeTime';

const RelatedVideoCard = ({ video }) => {
  const { snippet } = video;
  const { title, thumbnails, channelTitle, publishedAt } = snippet;

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  

  return (
    <Link to={`?v=${video.id.videoId}`} className='flex mb-4'>
      <img
        alt='video thumbnail'
        src={thumbnails.medium.url}
        className='w-60 h-33 object-cover rounded-lg'
      />
      <div className='ml-4'>
        <p className='text-md font-bold -mt-1'>{truncateTitle(title, 30)}</p>
        <p className=' text-sm font-semibold text-gray-600'>{channelTitle}</p>
        <p className='text-sm font-semibold text-gray-600'>{getRelativeTime(publishedAt)}</p>
      </div>
    </Link>
  );
};

export default RelatedVideoCard;
