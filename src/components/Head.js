import React, { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { BsList } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiVideoAddLine } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import SearchBar from './SearchBar';

const Head = () => {
  const dispatch = useDispatch();

  const handleShowList = useCallback(() => {
    //console.log("call to handleShowList");
    dispatch(toggleMenu());
  }, [dispatch]);

  

  return (
    <header className='px-4 py-1  w-full flex justify-between items-center h-15'>
      <div className="flex items-center w-auto md:w-[12vw] min-w-[150px] md:min-w-[190px] pr-2 md:pr-5 h-full">
        <button 
          className=' hidden sm:block p-1 hover:bg-gray-300 rounded-full active:bg-gray-500' 
          onClick={handleShowList}
        >
          <BsList className="w-6 h-6 md:w-7 md:h-7" />
        </button>
        <img 
          src='https://logos-download.com/wp-content/uploads/2016/02/YouTube_Logo_2017.png' 
          alt='YouTube Logo' 
          className='h-6 md:h-7 ml-2' 
        />
      </div>
      <div className="flex items-center  min-w-[300px]  h-full">
        <SearchBar/>
      </div>
      <div className='hidden sm:block'>
        <div className="flex items-center  w-fit h-full space-x-3 md:space-x-4 ">
          <RiVideoAddLine className="h-[30px] w-[30px]" />
          <FaBell className="h-[30px] w-[30px]" />
          <CgProfile className="h-[30px] w-[30px]" />
        </div>
      </div>
    </header>
  );
}

export default Head;
