import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import VideoPlayer from './VideoPlayer';
import { useLocation } from 'react-router-dom';
import { YOUTUBE_API_BASE_URL } from '../utils/constants';

const API_KEY = 'YOUR_API_KEY';

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
        const response = await fetch(`${YOUTUBE_API_BASE_URL}videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`);
        const data = await response.json();
        const video = data.items[0];
        setVideoData(video);
        fetchChannelData(video.snippet.channelId);
    };

    const fetchChannelData = async (channelId) => {
      const response = await fetch(`${YOUTUBE_API_BASE_URL}channels?part=snippet&id=${channelId}&key=${API_KEY}`);
      const data = await response.json();
      setChannelData(data.items[0]);
    };

    const fetchComments = async () => {
      const response = await fetch(`${YOUTUBE_API_BASE_URL}commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`);
      const data = await response.json();
      setComments(data.items);
    };

    const fetchRelatedVideos = async () => {
      const response = await fetch(`${YOUTUBE_API_BASE_URL}search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${API_KEY}`);
      const data = await response.json();
      setRelatedVideos(data.items);
    };

    fetchVideoData();
    fetchComments();
    fetchRelatedVideos();
  }, [dispatch, videoId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Watch Video</h1>
      {videoData && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{videoData.snippet.title}</h2>
          <p className="text-sm text-gray-600">{videoData.snippet.description}</p>
          <p>Likes: {videoData.statistics.likeCount}</p>
          <p>Comments: {videoData.statistics.commentCount}</p>
        </div>
      )}
      {channelData && (
        <div className="mb-4">
          <img src={channelData.snippet.thumbnails.default.url} alt="Channel Logo" />
          <p className="text-xl font-semibold">{channelData.snippet.title}</p>
        </div>
      )}
      <VideoPlayer videoId={videoId} />
      <div className="comments-section mt-4">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        {comments.map(comment => (
          <div key={comment.id} className="comment mb-2">
            <p className="font-semibold">{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
            <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
          </div>
        ))}
      </div>
      <div className="related-videos-section mt-4">
        <h2 className="text-xl font-bold mb-2">Related Videos</h2>
        {relatedVideos.map(video => (
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
