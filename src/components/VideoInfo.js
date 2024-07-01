import React from 'react';
import { BiDislike, BiLike } from 'react-icons/bi';
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
    <div className="flex-row justify-center items-center p-4 w-full">
      <div className="mb-2">
        <h2 className="text-xl -mt-4 mb-2 font-bold">{data[0]?.snippet?.title}</h2>
        <div className='h-[40px]  flex justify-between'>
            <div className='w-full flex justify-between '>
                <Link key={channelId} to={"/"+channelId} className='flex h-[100%] rounded-full pr-3  hover:bg-gray-200 hover:border-gray-800 active:bg-gray-800 active:text-gray-50 transition duration-300'>
                    <img src={data[1]?.snippet?.thumbnails?.medium?.url} alt="Channel Logo" className='h-[40px] w-[40px] rounded-full mr-2' />
                    <div className='flex-row'>
                      <li className='text-[1rem] p-0 font-bold list-none leading-tight mb-0'>
                        {data[1]?.snippet?.title}
                      </li>
                      <li className='text-[0.85rem] text-gray-800 p-0 list-none leading-tight mb-0'>
                        {formatCount(data[1]?.statistics?.subscriberCount)} subscribers
                      </li>
                    </div>
                </Link>
              </div> 
              <div className='flex mx-3'>
                <button className='bg-gray-50 mr-3 font-semibold text-center border-black border-[1px] rounded-full py-2 px-4 flex items-center justify-center hover:bg-gray-400 hover:border-gray-800 active:bg-gray-800 active:text-gray-50 transition duration-300'>Join</button>
                <button className='bg-gray-50 mr-3 font-semibold text-center border-black border-[1px] rounded-full py-2 px-3 flex items-center justify-center  hover:bg-gray-400 hover:border-gray-800 active:bg-gray-800 active:text-gray-50 transition duration-300'>Subscribe</button>
                <div className='flex'>
                  <button className='flex items-center justify-center h-full text-[0.85rem] text-center font-bold text-gray-800 py-2 px-3 list-none leading-tight mb-0 align-middle border-black border-[1px] rounded-l-full  hover:bg-gray-400 hover:border-gray-800 active:bg-gray-800 active:text-gray-50 transition duration-300'>
                    {formatCount(data[0]?.statistics?.likeCount)}
                    <BiLike className='w-[25px] h-[25px]' />
                  </button>
                  <button className='flex items-center justify-center h-full text-[0.85rem] text-gray-800 list-none leading-tight mb-0 py-2 px-3 border-black border-[1px] border-l-0 rounded-r-full  hover:bg-gray-400 hover:border-gray-800 active:bg-gray-800 active:text-gray-50 transition duration-300'>
                    <BiDislike className='w-[25px] h-[25px]' />
                  </button>
                </div>
              </div>
            <div className='flex'></div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
