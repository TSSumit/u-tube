import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { addVideoToHistory } from '../utils/historySlice';
import VideoPlayer from './VideoPlayer';
import { useLocation } from 'react-router-dom';
import { API_Key, YOUTUBE_API_BASE_URL } from '../utils/constants';
import VideoInfo from './VideoInfo';
import Description from './Description';
import CommentsContainer from './CommentsContainer';
import RelatedVideosContainer from './RelatedVideosContainer';
import ErrorPage from './ErrorPage';
import ButtonList from './ButtonList';
import HeadBar from './HeadBar';
import LiveChat from './LiveChat';

const WatchPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoId = queryParams.get('v');

  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [error, setError] = useState(null);
  const [isSmallWindow, setIsSmallWindow] = useState(true);

  useEffect(() => {
    dispatch(closeMenu());

    const fetchVideoData = async () => {
      try {
        const response = await fetch(`${YOUTUBE_API_BASE_URL}videos?part=snippet,statistics&id=${videoId}&key=${API_Key}`);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
          console.error("Error fetching video data:", data.error.message);
          return;
        }
        const video = data.items[0];
        setVideoData(video);
        dispatch(addVideoToHistory(video)); // Dispatch the full video data
        fetchChannelData(video?.snippet?.channelId);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
        setError(error.message);
      }
    };

    const fetchChannelData = async (channelId) => {
      try {
        const response = await fetch(`${YOUTUBE_API_BASE_URL}channels?part=snippet,statistics&id=${channelId}&key=${API_Key}`);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
          console.error("Error fetching channel data:", data.error.message);
          return;
        }
        setChannelData(data?.items[0]);
      } catch (error) {
        console.error("Error fetching channel data:", error.message);
        setError(error.message);
      }
    };

    const fetchCommentsData = async () => {
      try {
        const response = await fetch(`${YOUTUBE_API_BASE_URL}commentThreads?part=snippet&videoId=${videoId}&maxResults=30&key=${API_Key}`);
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
          console.error("Error fetching comments:", data.error.message);
          return;
        }
        setCommentsData(data);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
        setError(error.message);
      }
    };

    fetchVideoData();
    fetchCommentsData();

    const handleResize = () => {
      setIsSmallWindow(window.innerWidth <= 1024); // Adjust 1024 based on your breakpoint
    };
    handleResize(); // Initial check on component mount
    window.addEventListener('resize', handleResize); // Event listener for window resize
    return () => {
      window.removeEventListener('resize', handleResize);
    }; // Cleanup the event listener on component unmount

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

  return (
    <>
      {isSmallWindow ? (
        <div className='flex flex-col overflow-x-hidden max-h-screen max-w-screen'>
          <HeadBar />
          <div className="container mx-auto p-4">
            <VideoPlayer videoId={videoId} />
            <VideoInfo data={[videoData, channelData]} />
            <Description data={videoData} />
            <LiveChat/>
            {videoId && <RelatedVideosContainer videoId={videoId} />}
            <CommentsContainer initialCommentsData={initialCommentsData} />
          </div>
        </div>
      ) : (
        <div className='flex flex-col overflow-x-hidden max-h-screen max-w-screen'>
          <HeadBar />
          <div className=" p-5 w-full flex justify-center">
            <div className="w-3/6 min-w-[640px] pr-1">
              <VideoPlayer videoId={videoId} />
              <VideoInfo data={[videoData, channelData]} />
              <Description data={videoData} />
              <CommentsContainer initialCommentsData={initialCommentsData} />
            </div>
            <div className="w-2/6 min-w-[450px] pl-1">
              <LiveChat/>
              <ButtonList />
              {videoId && <RelatedVideosContainer videoId={videoId} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchPage;
