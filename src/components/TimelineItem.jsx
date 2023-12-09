import React, { useState } from 'react';


const LazyTimelineItem = ({ item, onPlay, onPause }) => {
  const [ setAudioDuration] = useState(null);
 // const imageUrl = process.env.REACT_APP_IMAGE_BASE_URL + item.Image;
 // const iconUrl = process.env.REACT_APP_IMAGE_BASE_URL + item.Icon;

  const handlePlay = (title) => {
    onPlay(title);
  };

  const handlePause = () => {
    onPause();
  };

  const handleLoadedMetadata = (event) => {
    setAudioDuration(event.target.duration);
  };

  return (
    <div className="">
      
      <h2 className="text-lg font-bold mb-2">{item.Title}</h2>

      {/* Episode and CreateDate */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500">Episode {item.Episode}</span>
        <span className="text-gray-500">{item.CreateDate}</span>
      </div>

      {/* Image */}
      <img src={`https://arthurfrost.qflo.co.za/${item.Image}`} alt={item.Title} className="mb-4 rounded" />

      {/* Icon */}
      <img src={`https://arthurfrost.qflo.co.za/${item.Icon}`} alt={item.Title} className="mb-4 rounded-full h-[40px]" />

      {/* MediaName and Category */}
      <div className="flex justify-between items-center mb-4">
      <span className="text-gray-500">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">{item.MediaName}</span>
        </span>
        <span className="text-gray-500">{item.Category}</span>
      </div>

      {/* Audio */}
      {item.Audio && (
          <div>
            <audio
              controls
              className="mb-4"
              onPlay={() => handlePlay(item.Title)}
              
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source src={`https://arthurfrost.qflo.co.za/${item.Audio}`} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
           
            <p className="text-gray-500">Audio Size: {formatAudioSize(item.AudioSize)}</p>
          </div>
        )}
    </div>
  );
};

// Helper function to format seconds into mm:ss
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// Helper function to format audio size
const formatAudioSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

export default LazyTimelineItem;
