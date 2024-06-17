import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import VideoPlayer from './VideoPlayer';
import { useLocation } from 'react-router-dom';
import { API_Key, YOUTUBE_API_BASE_URL } from '../utils/constants';
import VideoInfo from './VideoInfo';
import Description from './Description';
import CommentsContainer from './CommentsContainer';
import RelatedVideosContainer from './RelatedVideosContainer';
import ErrorPage from './ErrorPage';

const WatchPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoId = queryParams.get('v');

  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSmallWindow, setIsSmallWindow] = useState(true);

  useEffect(() => {
    dispatch(closeMenu());
    
    
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`${YOUTUBE_API_BASE_URL}videos?part=snippet,statistics&id=${videoId}&key=${API_Key}`);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
          return;
        }
        const video = data.items[0];
        setVideoData(video);
        fetchChannelData(video?.snippet?.channelId);
      } catch (error) {
        console.error("Error fetching video data:", error);
        setError(error.message);
      }
    };

    const fetchChannelData = async (channelId) => {
      try {
        const response = await fetch(`${YOUTUBE_API_BASE_URL}channels?part=snippet,statistics&id=${channelId}&key=${API_Key}`);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
          return;
        }
        setChannelData(data?.items[0]);
      } catch (error) {
        console.error("Error fetching channel data:", error);
        setError(error.message);
      }
    };

    const fetchCommentsData = async () => {
      try {
        const response = await fetch(`${YOUTUBE_API_BASE_URL}commentThreads?part=snippet&videoId=${videoId}&maxResults=30&key=${API_Key}`);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
          return;
        }
        setCommentsData(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError(error.message);
      }
    };

    fetchVideoData();
    fetchCommentsData();
    setLoading(false);

    const handleResize = () => {
      setIsSmallWindow(window.innerWidth <= 1024); // Adjust 768 based on your breakpoint
    };
    handleResize();// Initial check on component mount
    window.addEventListener('resize', handleResize);// Event listener for window resize
    return () => {
      window.removeEventListener('resize', handleResize);
    };// Cleanup the event listener on component unmount

  }, [dispatch, videoId]);

  const initialCommentsData = {
    comments: commentsData?.items, // Array of comments
    nextPageToken: commentsData?.nextPageToken, // Initial nextPageToken
    noOfComments: videoData?.statistics?.commentCount, // Total number of comments
    videoId: videoData?.id // Video ID
  };

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (loading || !videoData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isSmallWindow ? (
        <div className="container mx-auto p-4">
          <VideoPlayer />
          <VideoInfo data={[videoData, channelData]} />
          <Description data={videoData} />
          {videoId && <RelatedVideosContainer videoId={videoId} />}
          <CommentsContainer initialCommentsData={initialCommentsData} />
        </div>
      ) : (
        <div className="container mx-auto p-2 w-full">
          <div className="flex">
            <div className="w-3/5 pr-4">
              <VideoPlayer />
              <VideoInfo data={[videoData, channelData]} />
              <Description data={videoData} />
              <CommentsContainer initialCommentsData={initialCommentsData} />
            </div>
            <div className="w-2/5 min-w-[450px] ml-5">
              {videoId && <RelatedVideosContainer videoId={videoId} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchPage;
