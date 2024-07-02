import React from 'react';
import { BsList } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import {   MdHomeFilled, MdOutlinePodcasts } from 'react-icons/md';
import { IoIosTrophy } from 'react-icons/io';
import { SiYoutubegaming } from 'react-icons/si';
import { IoNewspaper } from 'react-icons/io5';
import { CiStreamOn } from 'react-icons/ci';
import {  BiSolidMoviePlay } from 'react-icons/bi';
import { RiMusicFill } from 'react-icons/ri';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { FaFire } from 'react-icons/fa';
import { GoHistory } from 'react-icons/go';
import { Link } from 'react-router-dom';

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
          <div className=' h-[78px] w-full border-b-[1px]   border-black flex-col pb-3'>
              <Link to={'/home'} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <MdHomeFilled className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Home</span>
              </Link>
              <Link to={'/history'} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <GoHistory className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>History</span>
              </Link>
          </div>
          <div className=' h-fit w-full border-b-[1px]   border-black flex-col pb-2 '>
              <Link to={`/results?search_query=${encodeURIComponent('explore')}`} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <span className='m-2  text-lg font-bold'>Explore</span>
              </Link>
              <Link to={`/results?search_query=${encodeURIComponent('trainding')}`} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <FaFire className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Trainding</span>
              </Link>
              <Link to={`/results?search_query=${encodeURIComponent('shopping')}`} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <HiMiniShoppingBag className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Shoping</span>
              </Link>
              <Link to={`/results?search_query=${encodeURIComponent('music')}`} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <RiMusicFill className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Music</span>
              </Link>
              <Link to={`/results?search_query=${encodeURIComponent('movies')}`} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <BiSolidMoviePlay className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Movies</span>
              </Link>
              <Link to={`/results?search_query=${encodeURIComponent('live')}`} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <CiStreamOn className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Live</span>
              </Link>
              <Link to={`/results?search_query=${encodeURIComponent('gamming')}`} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <SiYoutubegaming className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Gaming</span>
              </Link>
              <Link to={`/results?search_query=${encodeURIComponent('news')}`} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <IoNewspaper className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>News</span>
              </Link>
              <Link to={`/results?search_query=${encodeURIComponent('sports')}`} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <IoIosTrophy className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Sports</span>
              </Link>
              <Link to={`/results?search_query=${encodeURIComponent('podcast')}`} className='flex items-center py-2 w-full h-9 hover:bg-slate-300 hover:rounded-lg'>
                  <MdOutlinePodcasts className='m-2 h-6 w-6'/>
                  <span className='m-2 ml-4 font-semibold'>Podcast</span>
              </Link>
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
