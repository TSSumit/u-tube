import React, { forwardRef } from 'react';
import DOMPurify from 'dompurify';
import { BiLike, BiDislike } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const CommentBox = forwardRef(({ data }, ref) => {
  if (!data || !data.snippet || !data.snippet.topLevelComment) {
    return null; // Prevent rendering if data is incomplete
  }

  const { snippet } = data;
  const { topLevelComment, totalReplyCount } = snippet;
  const {
    authorDisplayName,
    textDisplay,
    authorProfileImageUrl,
    authorChannelId,
    likeCount,
    publishedAt,
    updatedAt
  } = topLevelComment.snippet;

  const sanitizedTextDisplay = DOMPurify.sanitize(textDisplay);

  return (
    <div ref={ref} className='flex items-center w-full h-fit mb-4'>
      <img src={authorProfileImageUrl} className='w-[40px] h-[40px] mr-2 rounded-full' alt='profile img'/>
      <div className='flex flex-col'>
        <Link to={`/${authorDisplayName}`} key={authorChannelId?.value} className='font-semibold'>
          {authorDisplayName}
        </Link>
        <p dangerouslySetInnerHTML={{ __html: sanitizedTextDisplay }} />
        {publishedAt !== updatedAt && <span className='text-sm ml-2'>(edited)</span>}
        <CommentActions likeCount={likeCount} totalReplyCount={totalReplyCount} />
      </div>
    </div>
  );
});

const CommentActions = ({ likeCount, totalReplyCount }) => {
  return (
    <div className='flex items-center mt-2 space-x-4'>
      <div className='flex items-center space-x-1'>
        {likeCount > 0 && <span className='text-sm'>{likeCount}</span>}
        <BiLike className='text-lg cursor-pointer hover:text-blue-500'/>
      </div>
      <div className='flex items-center space-x-1'>
        <BiDislike className='text-lg cursor-pointer hover:text-blue-500'/>
      </div>
      <span className='text-sm text-gray-600'>{totalReplyCount} Replies</span>
    </div>
  );
};

export default CommentBox;
