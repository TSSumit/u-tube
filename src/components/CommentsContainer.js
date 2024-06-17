import React, { useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import { API_Key, YOUTUBE_API_BASE_URL } from '../utils/constants';
import CommentBoxShimmer from '../Shimmers/CommentBoxShimmer';
import ErrorPage from './ErrorPage';

// Sample API function to fetch comments
const fetchComments = async (videoId, nextPageToken = '') => {
  try {
    // console.log(videoId + " --------- " + nextPageToken);
    const response = await fetch(`${YOUTUBE_API_BASE_URL}commentThreads?part=snippet&videoId=${videoId}&pageToken=${nextPageToken}&maxResults=20&key=${API_Key}`);
    const data = await response.json();
    if (data.error) {
      throw data.error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
};

const CommentsContainer = ({ initialCommentsData }) => {
  const [comments, setComments] = useState(initialCommentsData?.comments || []);
  const [nextPageToken, setNextPageToken] = useState(initialCommentsData?.nextPageToken || '');
  const [noOfComments, setNoOfComments] = useState(initialCommentsData?.noOfComments || 0);
  const [videoId, setVideoId] = useState(initialCommentsData?.videoId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Update state if initialCommentsData changes
    if (initialCommentsData) {
      setComments(initialCommentsData.comments || []);
      setNextPageToken(initialCommentsData.nextPageToken || '');
      setNoOfComments(initialCommentsData.noOfComments || 0);
      setVideoId(initialCommentsData.videoId || '');
    }
  }, [initialCommentsData]);

  console.log('videoId is ' + videoId + " and comments are " + comments);

  const loadMoreComments = async () => {
    setLoading(true);
    const data = await fetchComments(videoId, nextPageToken);
    if (data.error) {
      setError(data.error);
    } else if (data) {
      setComments((prevComments) => [...prevComments, ...data.items]);
      setNextPageToken(data?.nextPageToken);
    }
    setLoading(false);
  };

  if (!initialCommentsData) {
    return <div>Loading initial comments...</div>;
  }
  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='p-4'>
      <div className='text-xl font-bold pb-3'>{`${noOfComments} Comments`}</div>
        <div>
        {comments ? (
          comments.map(comment => (
            <CommentBox key={comment.id} data={comment} />
          ))
        ) : (
          Array.from({ length: 20 }).map((_, index) => (
            <CommentBoxShimmer key={index} />
          ))
        )}
      </div>
      {nextPageToken &&
        <div className='w-full h-1 flex justify-center'>
          <button
            className='text-blue-500 font-bold'
            onClick={loadMoreComments}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      }
    </div>
  );
};

export default CommentsContainer;
