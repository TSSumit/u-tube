import React from 'react'
import { BiSolidLike, BiSolidMoviePlay } from 'react-icons/bi';
import { BsList } from 'react-icons/bs'
import { CgPlayList } from 'react-icons/cg';
import { CiStreamOn } from 'react-icons/ci';
import { FaFire } from 'react-icons/fa';
import { GoHistory } from 'react-icons/go';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { ImProfile } from 'react-icons/im';
import { IoIosTrophy, IoMdHelpCircle } from 'react-icons/io';
import { IoNewspaper } from 'react-icons/io5';
import { MdArrowForwardIos, MdFeedback, MdHomeFilled, MdOutlineFlag, MdOutlinePodcasts, MdOutlineWatchLater, MdSubscriptions } from 'react-icons/md';
import { RiMusicFill, RiVideoFill } from 'react-icons/ri';
import {  SiYoutubegaming, SiYoutubeshorts, SiYoutubestudio } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';

const Slidebar=()=> {
    const isOpen=useSelector(store=>store.app.isMenuOpen);
    const dispatch=useDispatch()
    const handleHideList=()=>{
        dispatch(toggleMenu());
    }
    if(!isOpen)return null;
  return (
    <div className={` left-0 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} pl-7 pr-2 pt-2 h-screen w-60 border-r-[1px] border-black flex align-center flex-col bg-white overflow-scroll overflow-x-hidden `}>
        <div className="w-[12vw] min-w-40 pr-5  h-16 flex justify-between items-center my-2  ">
            <span className='p-1 hover:bg-gray-300 hover:border-0 hover:rounded-full active:bg-gray-500'>
                <BsList onClick={handleHideList} className="w-7 h-7 min-w-6 min-h-6"/>
            </span>
            <img src='https://logos-download.com/wp-content/uploads/2016/02/YouTube_Logo_2017.png' alt='yt-logo' className='pl-1 h-7'/>
        </div>
        <div>
            <div className=' h-[115px] w-full border-b-[1px]   border-black flex-col pb-2'>
                <div className='flex justify-start w-full h-7 my-2'>
                    <MdHomeFilled className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Home</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <SiYoutubeshorts className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Shorts</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <MdSubscriptions className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Subscriptions</span>
                </div>
            </div>
            <div className=' h-fit w-full border-b-[1px]   border-black flex-col pb-2 '>
                <div className='flex justify-start w-full h-7 my-2'>
                    <span className='m-2  text-lg font-bold'>You</span>
                    <MdArrowForwardIos className='m-2 h-6 w-6 ml-1'/>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <ImProfile className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Your channel</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <GoHistory className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>History</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <CgPlayList className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>PlayList</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <RiVideoFill className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Your Videos</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <MdOutlineWatchLater className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Watch Later</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <BiSolidLike className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Liked Videos</span>
                </div>
            </div>
            <div className=' h-fit w-full border-b-[1px]   border-black flex-col pb-2 '>
                <div className='flex justify-start w-full h-7 my-2'>
                    <span className='m-2  text-lg font-bold'>Explore</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <FaFire className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Trainding</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <HiMiniShoppingBag className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Shoping</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <RiMusicFill className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Music</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <BiSolidMoviePlay className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Movies</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <CiStreamOn className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Live</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <SiYoutubegaming className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Gaming</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <IoNewspaper className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>News</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <IoIosTrophy className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Sports</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <MdOutlinePodcasts className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Podcast</span>
                </div>
            </div>
            <div className=' h-fit w-full border-b-[1px]   border-black flex-col pb-2'>
                <div className='flex justify-start w-full h-7 my-2'>
                    <SiYoutubestudio className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Setting</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <MdOutlineFlag className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Report</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
                    <IoMdHelpCircle className='m-2 h-6 w-6'/>
                    <span className='m-2 ml-4 font-semibold'>Help</span>
                </div>
                <div className='flex justify-start w-full h-7 my-2'>
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
  )
}

export default Slidebar