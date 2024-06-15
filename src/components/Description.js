import React, { useState } from 'react';
// import getRelativeTime from '../utils/getRelativeTime';

const Description = ({ data }) => {
  const [mark, setMark] = useState(false);

  const showMore = () => {
    setMark(true);
  };

  const showLess = () => {
    setMark(false);
  };

  const formatViewCount = (views) => {
    if (views === 1) {
      return '1 view';
    } else if (views >= 100000000) {
      return (views / 100000000).toFixed(1) + 'B views';
    } else if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M views';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K views';
    }
    return views + ' views';
  };

  const descriptionData = data?.snippet?.description || '';
  const viewCount = formatViewCount(data?.statistics?.viewCount);
  const dataTime = "2 days ago"; // getRelativeTime(data?.snippet?.publishedAt)

  const renderDescription = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line.split(' ').map((word, idx) => (
          word.startsWith('http') ? (
            <a href={word} key={idx} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
              {word}
            </a>
          ) : (
            <span key={idx}>{word} </span>
          )
        ))}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="px-4 py-1 w-full h-fit text-md font-semibold ">
      <div className="space-y-2 border-black border-[2px] rounded-lg p-3 bg-slate-100">
        <p className='text-sm text-gray-600'>
          {viewCount} &middot; {dataTime}
        </p>
        <div>
          {descriptionData && (
            <div className={`text-sm ${mark ? '' : 'line-clamp-4 overflow-hidden'}`}>
              {renderDescription(descriptionData)}
            </div>
          )}
          {!mark && descriptionData.split('\n').length > 4 && (
            <div className="text-center text-sm text-blue-500 cursor-pointer mt-2" onClick={showMore}>
              Show more
            </div>
          )}
          {mark && (
            <div className="text-center text-sm text-blue-500 cursor-pointer mt-2" onClick={showLess}>
              Show less
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
