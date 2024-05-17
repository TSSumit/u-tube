import { BsList, BsSearch } from "react-icons/bs";
import React, { useRef } from 'react';
import { CgProfile } from "react-icons/cg";
import { TiMicrophone } from "react-icons/ti";
import { RiVideoAddLine } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenue } from "../utils/appSlice";

const Head=()=> {
  const handleShowList=()=>{
     console.log(1);
     dispatch(toggleMenue());
  }
  const search=useRef();
  const dispatch=useDispatch()
  const handleSearch=()=>{
  }
  return (
    <div className='px-7   w-[100vw]  flex justify-between align-middle h-16 '>
        <div className="w-[15vw] min-w-[190px] pr-5 h-full flex justify-between items-center my-1 ">
        <span className='p-1 hover:bg-gray-300  hover:border-0 hover:rounded-full active:bg-gray-500'>
                <BsList onClick={handleShowList} className="w-7 h-7 min-w-6 min-h-6"/>
            </span>
          <img src='https://logos-download.com/wp-content/uploads/2016/02/YouTube_Logo_2017.png' alt='yt-logo' className=' h-7'/>
        </div>
        <div className=" w-[50vw] h-full flex justify-between items-center ">
            <input type="text" ref={search} className=" h-10 px-3 w-full rounded-l-full border-[1px] border-gray-700 border-r-[0px] " placeholder="Search"/>
            <span onClick={handleSearch} className="  px-3 w-15 h-10 border-[1px]  border-gray-700  rounded-r-full ">
                <BsSearch className="h-10 flex self-center"/>
            </span>
            <TiMicrophone   className="h-10 w-12 min-h-[35px] min-w-[38px] m-2 bg-gray-300 p-2 rounded-full "/>
        </div>
        <div className=" w-[12vw] min-w-20 h-full flex justify-between items-center">
            <RiVideoAddLine className=" size-8 flex" />
            <FaBell className="size-8 " />
            <CgProfile  className=" size-8 "/>
        </div>
    </div>
  )
}

export default Head