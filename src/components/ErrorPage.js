import React from 'react';
import { MdHomeFilled } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const ErrorPage = ({ error }) => {
  const { code, title, message } = error || {};

  return (
    <div className='fixed inset-0 z-50 bg-gray-100 flex flex-col items-center justify-center'>
      <div className='absolute top-5 left-5 flex items-center justify-center'>
        <Link to="/home" className="flex items-center py-2 px-4 bg-white shadow-md rounded-md hover:bg-slate-300">
          <IoMdArrowRoundBack className='-ml-1 h-6 w-6 mr-2  rounded-full bg-gray-300' />
          <MdHomeFilled className='h-6 w-6 mr-1' />
          <span className='text-lg'>Home</span>
        </Link>
      </div>
      <div className='max-w-md p-8 bg-white shadow-lg rounded-lg text-center'>
        <h1 className='text-9xl font-bold text-red-500 mb-2'>{code || 'Error'}</h1>
        <p className='text-5xl text-gray-700 mb-4'>{title || 'Unexpected Error'}</p>
        <p className='text-2xl text-gray-500 font-bold'>{message || 'This page is currently under development. Sorry for the inconvenience.'}</p>
      </div>
    </div>
  );
}

export default ErrorPage;
