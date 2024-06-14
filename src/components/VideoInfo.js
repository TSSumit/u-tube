import React from 'react';
import { BiLike } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const VideoInfo = ({data}) => {
// Utility function to format  count
const formatCount = (count) => {
    if(count===1){
        return 1;
    } else if (count >= 100000000) {
      return (count / 100000000).toFixed(1) + 'B ';
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M ';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K ';
    }
    return count + ' ';
  };
  const channelId=data[1]?.id;
  return (
    <div className="flex-row justify-center items-center p-4 w-[100%]">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{data[0]?.snippet?.title}</h2>
        <div className='h-[40px] border-black border-2 flex justify-between'>
            <div className='flex'>
                <Link key={channelId} to={"/"+channelId} className='flex h-[100%]'>
                    <img src={data[1]?.snippet?.thumbnails?.medium?.url} alt="Channel Logo" className='h-[40px] w-[40px] rounded-full mr-2' />
                    <div className='flex-row'>
                      <li className='text-[1rem] p-0 font-bold list-none leading-tight mb-0'>
                        {data[1]?.snippet?.title}
                      </li>
                      <li className='text-[0.85rem] text-gray-800 p-0 list-none leading-tight mb-0'>
                        {formatCount(data[0]?.statistics?.likeCount)}
                        <span>
                          <BiLike />
                        </span>
                      </li>
                      <li className='text-[0.85rem] text-gray-800 p-0 list-none leading-tight mb-0'>
                        {formatCount(data[0]?.statistics?.likeCount)}
                        <span>
                          <BiLike />
                        </span>
                      </li>
                    </div>
                </Link>
                <button className=' bg-gray-50 ml-4 border-black border-[1.5px] rounded-full px-2'>Subscribe</button>
              </div> 
              <div className='flex'>
                  <li className='text-[1rem] p-0 font-bold list-none leading-tight mb-0'>
                    {data[1]?.snippet?.title}
                  </li>
                  <li className='text-[0.85rem] text-gray-800 p-0 list-none leading-tight mb-0'>
                    {formatCount(data[1]?.statistics?.subscriberCount)}M subscribers
                  </li>
              </div>
            <div className='flex'></div>
        </div>
        {/* <p>Views: {data[0]?.statistics?.viewCount} views</p>
        <p>date: {data[0]?.snippet?.publishedAt} date</p>
        <p>Likes: {data[0]?.statistics?.likeCount}</p>
        <p>Comments: {data[0]?.statistics?.commentCount}</p> */}
        {/* <p className="text-sm text-gray-600">{data[0]?.snippet?.description}</p> */}
      </div>

      <div className="mb-4">
        <img src={data[1]?.snippet?.thumbnails?.medium?.url} alt="Channel Logo" />
        <h1 className="text-xl font-semibold">{data[1]?.snippet?.title}</h1>  
      </div>
    </div>
  );
};

export default VideoInfo;
