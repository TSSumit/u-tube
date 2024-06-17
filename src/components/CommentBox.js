import React from 'react';
import { BiLike, BiDislike } from 'react-icons/bi';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization
import { Link } from 'react-router-dom';

const CommentBox = ({ data }) => {
  const { snippet } = data;
  const { topLevelComment, totalReplyCount } = snippet;
  const {
    authorDisplayName,
    textDisplay,
    textOriginal,
    authorProfileImageUrl,
    authorChannelId,
    likeCount,
    publishedAt,
    updatedAt
  } = topLevelComment.snippet;

  // Sanitize textDisplay to allow certain HTML tags like <br>, <a>, etc.
  const sanitizedTextDisplay = DOMPurify.sanitize(textDisplay);

  // console.log(`Total Replies: ${totalReplyCount}, Author: ${authorDisplayName}, Text: ${sanitizedTextDisplay}, Original Text: ${textOriginal}, Profile Image: ${authorProfileImageUrl}, Author Channel ID: ${authorChannelId?.value}, Likes: ${likeCount}, Published At: ${publishedAt}, Updated At: ${updatedAt}`);

  return (
    <div className='flex flex-col w-full p-4 bg-slate-100 shadow-md rounded-lg mb-4'>
      <div className='flex items-center mb-2'>
        <img src={authorProfileImageUrl} className='w-10 h-10 mr-3 rounded-full items-start align-top' alt='profile img'/>
        <div className='flex flex-col'>
            <div className='flex items-center'>
                <Link to={`/${authorDisplayName}`} key={authorChannelId?.value} className='font-semibold'>
                  {authorDisplayName}
                </Link>  
                {publishedAt !== updatedAt && <span className='text-xs text-gray-600 mx-2 font-semibold'>(edited)</span>}
            </div>
            <p className='text-sm text-gray-500'>{new Date(publishedAt).toLocaleString()}</p>
        </div>
      </div>
      <div className='ml-2'>
        <div className='mb-2 '>
          <p dangerouslySetInnerHTML={{ __html: sanitizedTextDisplay }} />
        </div>
        <div className='flex items-center mt-2 space-x-4 font-bold text-gray-700'>
          <div className='flex items-center space-x-1'>
            {likeCount > 0 && <span className='text-sm'>{likeCount}</span>}
            <BiLike className='text-lg cursor-pointer hover:text-blue-500'/>
          </div>
          <div className='flex items-center space-x-1'>
            <BiDislike className='text-lg cursor-pointer hover:text-blue-500'/>
          </div>
          <span className='text-sm text-gray-600'>{totalReplyCount} Replies</span>
          
        </div>
      </div>
    </div>
  );
}

export default CommentBox;