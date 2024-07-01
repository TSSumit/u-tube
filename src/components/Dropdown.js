import React from 'react';
import { BsList } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { MdArrowForwardIos, MdFeedback, MdHomeFilled, MdOutlineFlag, MdOutlinePodcasts, MdOutlineWatchLater, MdSubscriptions } from 'react-icons/md';
import { IoIosTrophy, IoMdHelpCircle } from 'react-icons/io';
import { SiYoutubegaming, SiYoutubeshorts, SiYoutubestudio } from 'react-icons/si';
import { IoNewspaper } from 'react-icons/io5';
import { CiStreamOn } from 'react-icons/ci';
import { BiSolidLike, BiSolidMoviePlay } from 'react-icons/bi';
import { RiMusicFill, RiVideoFill } from 'react-icons/ri';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { FaFire } from 'react-icons/fa';
import { CgPlayList } from 'react-icons/cg';
import { GoHistory } from 'react-icons/go';
import { ImProfile } from 'react-icons/im';

const Dropdown = () => {
  const isOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  const handleHideList = () => {
    dispatch(closeMenu());
  };

  return (
    <div className='hidden sm:block'>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleHideList}></div>
      )}
      <div className={`fixed z-50 left-0 top-0 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} h-screen w-[14rem]  flex flex-col bg-white overflow-scroll overflow-x-hidden `}>
        <div className="w-full mt-1.5 ml-1 h-16 flex  items-center p-2 border-b border-black">
          <span className="p-1 ml-1 hover:bg-gray-300 rounded-full cursor-pointer" onClick={handleHideList}>
            <BsList className="w-7 h-7" />
          </span>
          <img src="https://logos-download.com/wp-content/uploads/2016/02/YouTube_Logo_2017.png" alt="yt-logo" className="h-7 pl-2" />
        </div>
        <div className='px-3'>
          <div className=' h-[115px] w-full border-b-[1px]   border-black flex-col pb-3'>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <MdHomeFilled className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Home</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <SiYoutubeshorts className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Shorts</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <MdSubscriptions className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Subscriptions</span>
              </div>
          </div>
          <div className=' h-fit w-full border-b-[1px]   border-black flex-col pb-2 '>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <span className='m-2  text-lg font-bold'>You</span>
                  <MdArrowForwardIos className='m-2 h-6 w-6 ml-1'/>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <ImProfile className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Your channel</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <GoHistory className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>History</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <CgPlayList className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>PlayList</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <RiVideoFill className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Your Videos</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <MdOutlineWatchLater className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Watch Later</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <BiSolidLike className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Liked Videos</span>
              </div>
          </div>
          <div className=' h-fit w-full border-b-[1px]   border-black flex-col pb-2 '>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <span className='m-2  text-lg font-bold'>Explore</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <FaFire className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Trainding</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <HiMiniShoppingBag className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Shoping</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <RiMusicFill className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Music</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <BiSolidMoviePlay className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Movies</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <CiStreamOn className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Live</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <SiYoutubegaming className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Gaming</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <IoNewspaper className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>News</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <IoIosTrophy className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Sports</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <MdOutlinePodcasts className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Podcast</span>
              </div>
          </div>
          <div className=' h-fit w-full border-b-[1px]   border-black flex-col pb-2'>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <SiYoutubestudio className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Setting</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <MdOutlineFlag className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Report</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <IoMdHelpCircle className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Help</span>
              </div>
              <div className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <MdFeedback className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Send feedback</span>
              </div>
          </div>
          <div className=' h-fit w-full  px-3  flex-col '>
              <div className='flex justify-start w-full  my-2 text-sm font-sans text-gray-800'>
                  About Press Copyright Contact us Creators Advertise Developers
              </div>
              <div className='flex justify-start w-full  my-2 text-sm font-sans text-gray-800'>
                  Terms Privacy Policy & SafetyHow YouTube worksTest new features
              </div>
              <div className='flex justify-start w-full  my-2 text-xs text-gray-600'>
                  © 2024 Google LLC
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
