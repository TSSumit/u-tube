import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import VideoPlayer from './VideoPlayer';
import { useLocation } from 'react-router-dom';
import { API_Key, YOUTUBE_API_BASE_URL } from '../utils/constants';
import VideoInfo from './VideoInfo';
import Description from './Description';
import CommentsContainer from './CommentsContainer';


const WatchPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoId = queryParams.get('v');

  const [videoData, setVideoData] = useState( null);
  const [channelData, setChannelData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    dispatch(closeMenu());

      
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`${YOUTUBE_API_BASE_URL}videos?part=snippet,statistics&id=${videoId}&key=${API_Key}`);
        const data = await response.json();
        const video = data.items[0];
        setVideoData(video);
        fetchChannelData(video?.snippet?.channelId);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    const fetchChannelData = async (channelId) => {
      try{
        const response = await fetch(`${YOUTUBE_API_BASE_URL}channels?part=snippet,statistics&id=${channelId}&key=${API_Key}`);
        const data = await response.json(); 
        setChannelData(data?.items[0]);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    const fetchCommentsData = async () => {
      try{
        const response = await fetch(`${YOUTUBE_API_BASE_URL}commentThreads?part=snippet&videoId=${videoId}&maxResults=30&key=${API_Key}`);
        const data = await response.json();
        setCommentsData(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchRelatedVideos = async () => {
      try{  
        const response = await fetch(`${YOUTUBE_API_BASE_URL}search?part=snippet&relatedToVideo&Id=${videoId}&type=video&maxResults=20&key=${API_Key}`);
        const data = await response.json();
        setRelatedVideos(data?.items);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };
    
    fetchVideoData();
    fetchCommentsData();
    fetchRelatedVideos();
  }, [dispatch, videoId]);
  
  // console.log(commentsdata);

  const initialCommentsData = {
    comments: commentsData?.items, // Array of comments
    nextPageToken: commentsData?.nextPageToken, // Initial nextPageToken
    noOfComments: videoData?.statistics?.commentCount, // Total number of comments
    videoId: videoData?.id // Video ID
  };

  return (
    <div className="container mx-auto p-4">
      <VideoPlayer />
      <VideoInfo data={[videoData,channelData]}/>
      <Description data={videoData} />
      <CommentsContainer initialCommentsData={initialCommentsData} />
      
    </div>
  );
};

export default WatchPage;
