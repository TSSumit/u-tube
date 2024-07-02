import React, { useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import { YOUTUBE_API_BASE_URL, nLevelComments } from '../utils/constants';
import CommentBoxShimmer from '../Shimmers/CommentBoxShimmer';
import ErrorPage from './ErrorPage';
import { fetchWithKeyCycling } from '../utils/apiUtils';

const fetchComments = async (videoId, nextPageToken = '') => {
  try {
    const data = await fetchWithKeyCycling(`${YOUTUBE_API_BASE_URL}commentThreads?part=snippet,replies&videoId=${videoId}&pageToken=${nextPageToken}&maxResults=20`);
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
  const [showNLevelComments, setShowNLevelComments] = useState(false);

  useEffect(() => {
    if (initialCommentsData) {
      setComments(initialCommentsData.comments || []);
      setNextPageToken(initialCommentsData.nextPageToken || '');
      setNoOfComments(initialCommentsData.noOfComments || 0);
      setVideoId(initialCommentsData.videoId || '');
    }
  }, [initialCommentsData]);

  const loadMoreComments = async () => {
    setLoading(true);
    const data = await fetchComments(videoId, nextPageToken);
    if (data.error) {
      setError(data.error);
    } else if (data) {
      setComments((prevComments) => [...prevComments, ...data.items]);
      setNextPageToken(data.nextPageToken);
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
        {showNLevelComments ?
          <>
            <button className='w-full p-2 mb-2 bg-blue-200 border-black border-1 hover:bg-blue-400 active:bg-blue-600 rounded-lg' onClick={() => setShowNLevelComments(false)}>Hide N-Level Comments (demo)</button>
            {nLevelComments.map(comment => (
              <CommentBox key={comment.id} data={comment} />
            ))}
          </>
          :
          <button className='w-full p-2 mb-2 bg-blue-200 border-black border-1 hover:bg-blue-400 active:bg-blue-600 rounded-lg' onClick={() => setShowNLevelComments(true)}>Show N-Level Comments (demo)</button>
        }
      </div>
      <div>
        {comments.length > 0 ? (
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
