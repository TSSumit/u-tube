import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import VideoPlayer from './VideoPlayer';
import { useLocation } from 'react-router-dom';
import { API_Key, YOUTUBE_API_BASE_URL } from '../utils/constants';
import VideoInfo from './VideoInfo';
import Description from './Description';


const WatchPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoId = queryParams.get('v');

  const [videoData, setVideoData] = useState( null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);
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

    const fetchComments = async () => {
      try{
        const response = await fetch(`${YOUTUBE_API_BASE_URL}commentThreads?part=snippet&videoId=${videoId}&maxResults=20&key=${API_Key}`);
        const data = await response.json();
        setComments(data?.items);
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
    fetchComments();
    fetchRelatedVideos();
  }, [dispatch, videoId]);
  console.log(videoData+" and \n\n"+relatedVideos+" and \n\n"+comments+" and \n\n"+channelData+" and \n\n");

  return (
    <div className="container mx-auto p-4">
      <VideoPlayer />
      <VideoInfo data={[videoData,channelData]}/>
      <Description data={videoData} />
      <div className="comments-section mt-4">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        {comments && comments.map(comment => (
          <div key={comment.id} className="comment mb-2">
            <p className="font-semibold">{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
            <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
          </div>
        ))}
      </div>
      <div className="related-videos-section mt-4">
        <h2 className="text-xl font-bold mb-2">Related Videos</h2>
        {relatedVideos && relatedVideos.map(video => (
          <div key={video.id.videoId} className="related-video mb-2">
            <h3 className="font-semibold">{video.snippet.title}</h3>
            <p>{video.snippet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
