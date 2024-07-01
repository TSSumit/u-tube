import React from 'react';
import { BiLike, BiDislike } from 'react-icons/bi';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization
import { Link } from 'react-router-dom';

const CommentBox = ({ data }) => {
  // Return null if data or snippet is not available
  if (!data) {
    console.error('CommentBox: data is undefined or null', data);
    return null;
  }
  
  if (!data.snippet) {
    console.error('CommentBox: data.snippet is undefined or null', data);
    return null;
  }

  const { snippet } = data;
  const { topLevelComment, totalReplyCount } = snippet;

  if (!topLevelComment || !topLevelComment.snippet) {
    console.error('CommentBox: topLevelComment or topLevelComment.snippet is undefined or null', topLevelComment);
    return null;
  }

  const {
    authorDisplayName,
    textDisplay,
    authorProfileImageUrl,
    authorChannelId,
    likeCount,
    publishedAt,
    updatedAt,
  } = topLevelComment.snippet;

  const comments = data?.snippet?.replies;
  if(comments){
    console.log(textDisplay+"  "+comments)
  }

  // Sanitize textDisplay to allow certain HTML tags like <br>, <a>, etc.
  const sanitizedTextDisplay = DOMPurify.sanitize(textDisplay);

  return (
    <>
      <div className='flex flex-col w-full p-4 bg-slate-100 shadow-md rounded-lg mb-4'>
        <div className='flex items-center mb-2'>
          <img src={authorProfileImageUrl} className='w-10 h-10 mr-3 rounded-full items-start align-top' alt='profile img' />
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <Link to={`/channel-${authorDisplayName}`} key={authorChannelId?.value} className='font-semibold'>
                {authorDisplayName}
              </Link>
              {publishedAt !== updatedAt && <span className='text-xs text-gray-600 mx-2 font-semibold'>(edited)</span>}
            </div>
            <p className='text-sm text-gray-500'>{new Date(publishedAt).toLocaleString()}</p>
          </div>
        </div>
        <div className='ml-2'>
          <div className='mb-2'>
            <p dangerouslySetInnerHTML={{ __html: sanitizedTextDisplay }} />
          </div>
          <div className='flex items-center mt-2 space-x-4 font-bold text-gray-700'>
            <div className='flex items-center space-x-1'>
              {likeCount > 0 && <span className='text-sm'>{likeCount}</span>}
              <BiLike className='text-lg cursor-pointer hover:text-blue-500' />
            </div>
            <div className='flex items-center space-x-1'>
              <BiDislike className='text-lg cursor-pointer hover:text-blue-500' />
            </div>
            <span className='text-sm text-gray-600'>{totalReplyCount} Replies</span>
          </div>
        </div>
      </div>
      {comments && (
        <div className='border-gray-300 border-l-[2px] pl-5'>
          {comments.map(comment => (
            <CommentBox key={comment.id} data={comment} />
          ))}
        </div>
      )}
    </>
  );
}

export default CommentBox;
