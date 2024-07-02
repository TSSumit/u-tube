import React, { useEffect, useState, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { getRandomComment, getRandomName } from '../utils/helper';

const LiveChat = () => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(addMessage({
        userName: getRandomName(),
        message: getRandomComment(),
      }));
    }, 500);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    if (autoScroll) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, autoScroll]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(addMessage({
        userName: "You",
        message: message.trim(),
      }));
      setMessage("");
      setAutoScroll(true); // Ensure auto scroll is enabled after sending a message
    }
  };

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = chatContainerRef.current;

    // Check if user has scrolled up to read previous messages
    if (scrollHeight - scrollTop !== clientHeight) {
      setAutoScroll(false); // Disable auto scroll when user scrolls up
    } else {
      setAutoScroll(true); // Enable auto scroll when user scrolls back to bottom
    }
  };

  return (
    <div className='ml-2 my-4 p-2'>
      <div className='w-full h-[600px] p-2 border border-black bg-slate-100 rounded-lg rounded-b-none'>
        <div className='px-4 py-1 font-bold text-xl'>LiveChat</div>
        <div className='h-full'>
          <div
            ref={chatContainerRef}
            className='h-[550px] flex flex-col-reverse overflow-y-auto'
            onScroll={handleScroll}
          >
            {chatMessages.map((c, index) => (
              <ChatMessage key={index} data={c} />
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
      <form className='flex h-auto border-black border-[1px] border-t-0 rounded-lg  p-3 rounded-t-none' onSubmit={(e)=> e.preventDefault()}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-3 mx-2 w-4/6 h-9 bg-transparent outline-none border border-gray-500 text-gray-700 rounded-full"
          placeholder="Chat as a viewer..."
        />
        <button
          onClick={handleSendMessage}
          className='flex-grow p-auto mx-2 w-1/6 h-9 bg-transparent outline-none border border-gray-500 text-gray-700 rounded-full hover:bg-blue-200 active:bg-blue-500 active:text-white'
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
