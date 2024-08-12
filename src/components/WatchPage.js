import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { closeMenu } from '../utils/appSlice.js';
import { addVideoToHistory } from '../utils/historySlice.js';
import VideoPlayer from './VideoPlayer.js';
import { YOUTUBE_API_BASE_URL } from '../utils/constants.js';
import VideoInfo from './VideoInfo.js';
import Description from './Description.js';
import CommentsContainer from './CommentsContainer.js';
import RelatedVideosContainer from './RelatedVideosContainer.js';
import ErrorPage from './ErrorPage.js';
import ButtonList from './ButtonList.js';
import HeadBar from './HeadBar.js';
import LiveChat from './LiveChat.js';
import { fetchWithKeyCycling } from '../utils/apiUtils.js';

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
  const [isSmallWindow, setIsSmallWindow] = useState(window.innerWidth <= 1024); // Initial check

  useEffect(() => {
    dispatch(closeMenu());

    const fetchVideoData = async () => {
      try {
        const data = await fetchWithKeyCycling(`${YOUTUBE_API_BASE_URL}videos?part=snippet,statistics&id=${videoId}`);
        if (data.error) {
          throw new Error(data.error.message);
        }
        const video = data.items[0];
        setVideoData(video);
        dispatch(addVideoToHistory(video));
        fetchChannelData(video.snippet.channelId);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchChannelData = async (channelId) => {
      try {
        const data = await fetchWithKeyCycling(`${YOUTUBE_API_BASE_URL}channels?part=snippet,statistics&id=${channelId}`);
        if (data.error) {
          throw new Error(data.error.message);
        }
        setChannelData(data.items[0]);
      } catch (error) {
        console.error("Error fetching channel data:", error.message);
        setError(error.message);
      }
    };

    const fetchCommentsData = async () => {
      try {
        const data = await fetchWithKeyCycling(`${YOUTUBE_API_BASE_URL}commentThreads?part=snippet&videoId=${videoId}&maxResults=30`);
        if (data.error) {
          setCommentsData(null); // Set commentsData to null if comments are disabled
        }
        setCommentsData(data);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
        if (error.message.includes("commentsDisabled")) {
          setCommentsData(null); // Set commentsData to null if comments are disabled
        } else {
          setError(error.message);
        }
      }
    };

    fetchVideoData();
    fetchCommentsData();

    const handleResize = () => {
      setIsSmallWindow(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, videoId]);

  const initialCommentsData = {
    comments: commentsData?.items,
    nextPageToken: commentsData?.nextPageToken,
    noOfComments: videoData?.statistics?.commentCount,
    videoId: videoData?.id
  };

  if (error && !error.includes("commentsDisabled")) {
    return <ErrorPage error={{ code: 500, title: 'Internal Server Error', message: error }} />;
  }

  if (loading) {
    return <div>Loading...</div>;
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
            <LiveChat />
            {videoId && <RelatedVideosContainer videoId={videoId} />}
            {commentsData !== null ? (
              <CommentsContainer initialCommentsData={initialCommentsData} />
            ) : (
              <div>No comments available.</div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col overflow-x-hidden max-h-screen max-w-screen'>
          <HeadBar />
          <div className="p-5 w-full flex justify-center">
            <div className="w-3/6 min-w-[640px] pr-1">
              <VideoPlayer videoId={videoId} />
              <VideoInfo data={[videoData, channelData]} />
              <Description data={videoData} />
              {commentsData !== null ? (
                <CommentsContainer initialCommentsData={initialCommentsData} />
              ) : (
                <div>No comments available.</div>
              )}
            </div>
            <div className="w-2/6 min-w-[450px] pl-1">
              <LiveChat />
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
