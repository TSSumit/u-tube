import React from 'react';

const getRandomColor = () => {
  const colors = ['#4a5568', '#2b6cb0', '#1a202c', '#2d3748', '#718096', '#2c5282', '#2d3a4b'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ChatMessage = ({ data }) => {
  const { userName, message } = data;
  const profileInitial = userName.charAt(0).toUpperCase();
  const bgColor = getRandomColor();

  return (
    <div className='bg-white my-[2px] flex flex-row rounded-xl'>
      <div className='rounded-full mr-3 h-[30px] min-w-[30px] flex items-center justify-center text-white' style={{ backgroundColor: bgColor }}>
        <span className='text-blue-100 font-bold'>{profileInitial}</span>
      </div>
      <span>
        <span className='font-bold pr-3'>{userName}</span>
        {message}
      </span>
    </div>
  );
};

export default ChatMessage;
