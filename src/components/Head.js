import React, { useRef, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { BsList, BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { TiMicrophone } from "react-icons/ti";
import { RiVideoAddLine } from "react-icons/ri";
import { FaBell } from "react-icons/fa";

const Head = () => {
  const searchRef = useRef();
  const dispatch = useDispatch();

  const handleShowList = useCallback(() => {
    console.log("call to handleShowList");
    dispatch(toggleMenu());
  }, [dispatch]);

  const handleSearch = useCallback(() => {
    const query = searchRef.current.value;
    if (query) {
      console.log(`Searching for: ${query}`);
      // Add search functionality here
    } else {
      console.error("Search query is empty");
    }
  }, []);

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
      <div className="flex items-center  min-w-[200px] w-[35vw] h-full">
        <input 
          type="text" 
          ref={searchRef} 
          className="h-9 md:h-10 px-3 w-full rounded-l-full border border-gray-700 border-r-0 " 
          placeholder="Search" 
        />
        <button 
          onClick={handleSearch} 
          className="px-3 h-9 md:h-10 border border-gray-700 rounded-r-full"
        >
          <BsSearch className="h-full w-5" />
        </button>
        <TiMicrophone className="hidden sm:block h-9 md:h-10 w-10 md:w-12 m-1 md:m-2 bg-gray-300 p-2 rounded-full" />
      </div>
      <div className='hidden sm:block'>
        <div className="flex items-center  max-w-[150px] md:w-[10vw] min-w-[80px] h-full space-x-3 md:space-x-4 ">
          <RiVideoAddLine className="h-6 md:h-8 w-6 md:w-8" />
          <FaBell className="h-6 md:h-8 w-6 md:w-8" />
          <CgProfile className="h-6 md:h-8 w-6 md:w-8" />
        </div>
      </div>
    </header>
  );
}

export default Head;
