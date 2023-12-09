// AudioPopup.jsx

import React from 'react';

const AudioPopup = ({ title, isPlaying, onPlay, onPause, onClose }) => {
  return (
    <div className="fixed gap-2 top-0 right-0 m-4 p-4 bg-white text-black rounded shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        <button onClick={onClose} className="text-gray-500 focus:outline-none pl-3">
          Close
        </button>
      </div>
      
    </div>
  );
};

export default AudioPopup;
