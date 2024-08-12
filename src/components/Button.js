import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectButton } from '../utils/buttonListSlice.js';

const Button = ({ name }) => {
  const dispatch = useDispatch();
  const selectedButton = useSelector((state) => state.buttonList.selectedButton);

  const handleButtonClick = (name) => {
    dispatch(selectButton(name));
  };

  return (
    <Link to={`/results?search_query=${encodeURIComponent(name)}`} onClick={() => handleButtonClick(name)}>
      <button 
        className={`mx-1 h-8 px-4 min-w-fit bg-gray-200 rounded-md whitespace-nowrap hover:bg-gray-400 active:bg-gray-600 active:text-white ${selectedButton === name ? 'bg-gray-700 text-white' : ''}`}
      >
        {name}
      </button>
    </Link>
  );
};

export default Button;
