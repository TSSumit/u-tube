import React, { useState, useEffect, useRef } from 'react';
import CommentBox from './CommentBox.js';
import { YOUTUBE_API_BASE_URL, nLevelComments } from '../utils/constants.js';
import CommentBoxShimmer from '../Shimmers/CommentBoxShimmer.js';
import ErrorPage from './ErrorPage.js';
import { fetchWithKeyCycling } from '../utils/apiUtils.js';

// Function to fetch comments from YouTube API
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

// CommentsContainer component to display and load comments
const CommentsContainer = ({ initialCommentsData }) => {
  // State to hold the comments, nextPageToken, noOfComments, and videoId
  const [comments, setComments] = useState(initialCommentsData?.comments || []);
  const [nextPageToken, setNextPageToken] = useState(initialCommentsData?.nextPageToken || '');
  const [noOfComments, setNoOfComments] = useState(initialCommentsData?.noOfComments || 0);
  const [videoId, setVideoId] = useState(initialCommentsData?.videoId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNLevelComments, setShowNLevelComments] = useState(false);
  const observerRef = useRef(null); // Ref to track the last comment element for infinite scrolling

  // Effect to initialize comments with initial data
  useEffect(() => {
    if (initialCommentsData) {
      setComments(initialCommentsData.comments || []);
      setNextPageToken(initialCommentsData.nextPageToken || '');
      setNoOfComments(initialCommentsData.noOfComments || 0);
      setVideoId(initialCommentsData.videoId || '');
    }
  }, [initialCommentsData]);

  // Effect to set up Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        // If the observed element is in view and not currently loading, fetch more comments
        if (entries[0].isIntersecting && nextPageToken && !loading) {
          loadMoreComments();
        }
      },
      { threshold: 0.5 } // Trigger when 75% of the observed element is visible
    );

    // Observe the element referenced by observerRef
    const observedElement = observerRef.current;
    if (observedElement) {
      observer.observe(observedElement);
    }

    // Cleanup the observer when the component unmounts or dependencies change
    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, [nextPageToken, loading]);

  // Function to fetch more comments
  const loadMoreComments = async () => {
    setLoading(true);
    const data = await fetchComments(videoId, nextPageToken);
    if (data.error) {
      setError(data.error);
    } else if (data) {
      setComments(prevComments => [...prevComments, ...data.items]);
      setNextPageToken(data.nextPageToken);
    }
    setLoading(false);
  };

  // Render loading state if initial comments data is not available
  if (!initialCommentsData) {
    return <div>Loading initial comments...</div>;
  }
  // Render error page if there's an error
  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='p-4'>
      <div className='text-xl font-bold pb-3'>{`${noOfComments} Comments`}</div>
      <div>
        {showNLevelComments ? (
          <>
            <button
              className='w-full p-2 mb-2 bg-blue-200 border-black border-1 hover:bg-blue-400 active:bg-blue-600 rounded-lg'
              onClick={() => setShowNLevelComments(false)}
            >
              Hide N-Level Comments (demo)
            </button>
            {nLevelComments.map(comment => (
              <CommentBox key={comment.id} data={comment} />
            ))}
          </>
        ) : (
          <button
            className='w-full p-2 mb-2 bg-blue-200 border-black border-1 hover:bg-blue-400 active:bg-blue-600 rounded-lg'
            onClick={() => setShowNLevelComments(true)}
          >
            Show N-Level Comments (demo)
          </button>
        )}
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
      {nextPageToken && (
        <div ref={observerRef}>
          {Array.from({ length: 4 }).map((_, index) => (
            <CommentBoxShimmer key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsContainer;
