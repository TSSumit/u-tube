import React, { useEffect, useState, useCallback, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { TiMicrophone } from 'react-icons/ti';
import { RxCross1 } from 'react-icons/rx';  // Import the cross icon
import { YoutubeSearchSuggestion_URL } from '../utils/constants';
// import { json } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cacheResults } from '../utils/searchSlice';


const SearchBar = () => {
  // State to manage the search query, suggestions, visibility of suggestions, and input focus state
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchCache= useSelector((store)=> store.search)
  const dispatch=useDispatch();

  // References to the search bar and suggestions elements to handle click outside events
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Function to fetch search suggestions from the YouTube API
  const getSearchSuggestions = useCallback(async () => {
    try {
      const response = await fetch(`${YoutubeSearchSuggestion_URL}${searchQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setSuggestions(json[1]);

      dispatch(cacheResults({
        [searchQuery]:json[1]
      }));
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
    }
  }, [searchQuery,dispatch]);

  // Effect to fetch suggestions with a debounce of 200ms whenever the search query changes
  useEffect(() => {
    // If the search query is empty, do nothing and return early
    if (searchQuery === '') return;

    // Set a timer to call getSearchSuggestions after 200ms
    const timer = setTimeout(() => {
      if(searchCache[searchQuery]){
        setSuggestions(searchCache[searchQuery]);
      }
      else{
       getSearchSuggestions();
     }
    }, 200);

    // Cleanup function to clear the previous timer whenever the effect re-runs or unmounts
    // This prevents multiple API calls for rapidly changing search queries
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, getSearchSuggestions, searchCache]);


  // Effect to handle click outside of search and suggestions elements
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current && !searchRef.current.contains(event.target) &&
        suggestionsRef.current && !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle search action (can be customized as needed)
  const handleSearch = () => {
    console.log('Search initiated for:', searchQuery);
  };

  // Function to clear the search query and suggestions
  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  // Function to handle input change and show suggestions
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  // Functions to handle input focus and blur events
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className='flex items-center w-full sm:w-[300px] md:w-[440px] lg:min-w-[500px] xl:w-[650px] h-full relative' ref={searchRef}>
      <div className="flex items-center h-9 md:h-10 px-2 w-full rounded-l-full border border-gray-700 border-r-0 bg-white">
        {/* Conditionally render the search icon only when input is focused */}
        {isInputFocused && (
          <BsSearch className="h-full w-5 mx-2 text-gray-800 cursor-pointer" />
        )}
        <input 
          type="text" 
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="flex-grow pl-1 h-full bg-transparent outline-none border-none text-gray-700"
          placeholder="Search" 
          onClick={() => setShowSuggestions(true)}
        />
        {searchQuery && (
          <span className="ml-auto">
            <RxCross1 
              onClick={clearSearch}
              className="w-5 h-5 md:w-6 md:h-6 text-gray-800 cursor-pointer"
            />
          </span>
        )}
      </div>

      <button 
        onClick={handleSearch} 
        className="px-3 h-9 md:h-10 border border-gray-700 rounded-r-full"
      >
        <BsSearch className="h-full w-5" />
      </button>
          
      <TiMicrophone className="hidden sm:block h-9 md:h-10 w-10 md:w-12 m-1 md:m-2 bg-gray-300 p-2 rounded-full" />
      {showSuggestions && suggestions.length > 0 && (
        <ul ref={suggestionsRef} className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-center justify-start p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSuggestionClick(suggestion)}>
              <BsSearch className="block mx-3 h-4" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
