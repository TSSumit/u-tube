import React from 'react';

const ErrorPage = ({ error }) => {
  const { code, title, message } = error;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-100'>
      <div className='max-w-md p-8 bg-white shadow-lg rounded-lg  text-center'>
        <h1 className='text-9xl font-bold text-red-500 mb-2'>Error {code}</h1>
        <p className='text-5xl text-gray-700 mb-4'>{title}</p>
        <p className='text-2xl text-gray-500 font-bold'>{message}</p>
      </div>
    </div>
  );
}

export default ErrorPage;
