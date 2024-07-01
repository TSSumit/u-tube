import React, { useEffect, useState, useCallback, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { TiMicrophone } from 'react-icons/ti';
import { RxCross1 } from 'react-icons/rx';
import { YoutubeSearchSuggestion_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { cacheResults } from '../utils/searchSlice';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const getSearchSuggestions = useCallback(async () => {
    try {
      const response = await fetch(`${YoutubeSearchSuggestion_URL}${searchQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setSuggestions(json[1]);

      dispatch(cacheResults({
        [searchQuery]: json[1]
      }));
    } catch (error) {
      console.error('Error fetching search suggestions:', error.message);
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    if (searchQuery === '') return;

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, getSearchSuggestions, searchCache]);

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

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className='flex items-center w-full sm:w-[300px] md:w-[440px] lg:min-w-[500px] xl:w-[650px] h-full relative' ref={searchRef}>
      <div className="flex items-center h-9 md:h-10 px-2 w-full rounded-l-full border border-gray-700 border-r-0 bg-white">
        {(isInputFocused || searchQuery) && (
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
          <span className="ml-auto p-1 rounded-full hover:bg-slate-100 active:bg-slate-200">
            <RxCross1 
              onClick={clearSearch}
              className="w-5 h-5 md:w-6 md:h-6 text-gray-800 cursor-pointer"
            />
          </span>
        )}
      </div>

      {/* <Link to={`search/${encodeURIComponent(searchQuery)}`}> */}
        <button 
          className="px-3 h-9 md:h-10 border border-gray-700 hover:bg-slate-200 active:bg-slate-400 rounded-r-full"
        >
          <BsSearch className="h-full w-5" />
        </button>
      {/* </Link> */}
          
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
