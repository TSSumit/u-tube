import React from 'react';
import { BiSolidVideos } from 'react-icons/bi';
import { MdHomeFilled, MdSubscriptions } from 'react-icons/md';
import { SiYoutubeshorts } from 'react-icons/si';
import { Link } from 'react-router-dom';

const MobileBottombar = () => {
  return (
    <div className='sm:hidden fixed bottom-0 w-full flex justify-around bg-white border-t'>
      <span className='flex flex-col justify-center items-center py-2 my-1 hover:bg-slate-300 hover:rounded-lg'>
        <Link to={"/"} className="flex flex-col justify-center items-center min-w-[15vw]">  
          <MdHomeFilled className='h-6 w-6'/>
          <span className="text-sm">Home</span>
        </Link>
      </span>
      <span className='flex flex-col justify-center items-center py-2 my-1 hover:bg-slate-300 hover:rounded-lg'>
        <Link to={"/shorts"} className="flex flex-col justify-center items-center min-w-[15vw]">  
          <SiYoutubeshorts className='h-6 w-6 '/>
          <span className="text-sm">Shorts</span>
        </Link>
      </span>
      <span className='flex flex-col justify-center items-center py-2 my-1 hover:bg-slate-300 hover:rounded-lg'>
        <Link to={"/subscriptions"} className="flex flex-col justify-center items-center min-w-[15vw]">
          <MdSubscriptions className='h-6 w-6 '/>
          <span className="text-sm">Subscriptions</span>
        </Link>
      </span>
      <span className='flex flex-col justify-center items-center py-2 my-1 hover:bg-slate-300 hover:rounded-lg'>
        <Link to={"/you"} className="flex flex-col justify-center items-center min-w-[15vw]">  
          <BiSolidVideos className='h-6 w-6 '/>
          <span className="text-sm">You</span>
        </Link>
      </span>
    </div>
  );
}

export default MobileBottombar;
