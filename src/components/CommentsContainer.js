
import React from 'react';
import CommentBox from './CommentBox';

const CommentsContainer = ({ commentsData }) => {
  const [comments, noComments] = commentsData; 
  console.log("Number of comments: ", noComments);
  console.log("Comments: ", comments);
  
  return (
    <div className='p-4'>
      <div className=' text-xl font-bold pb-3'>{noComments + " Comments "}</div>
      <div>
        {comments && comments.map(comment => (
          <CommentBox key={comment.id} data={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentsContainer;
