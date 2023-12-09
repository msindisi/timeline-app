import React, { useState, useEffect, Suspense } from 'react';
const LazyTimelineItem = React.lazy(() => import('./components/TimelineItem'));
import AudioPopup from './components/AudioPopup';



const App = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [playingAudio, setPlayingAudio] = useState(null);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;


  const handlePlayAudio = (title) => {
    setPlayingAudio(title);
  };

  const handlePauseAudio = () => {
    setPlayingAudio(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_ENDPOIN);
        const data = await response.json();

        // Extract unique categories from the timeline data
        const uniqueCategories = Array.from(new Set(data.Timeline.map((item) => item.Category)));
        setCategories(['', ...uniqueCategories]); // Include an option for all categories

        // Sort the timeline data by CreateDate in descending order
        const sortedTimeline = data.Timeline.sort((a, b) => new Date(b.CreateDate) - new Date(a.CreateDate));

        // Apply category filter if a category is selected
        const filteredTimeline = selectedCategory
          ? sortedTimeline.filter((item) => item.Category === selectedCategory)
          : sortedTimeline;

        setTimelineData(filteredTimeline);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value || null);
    setCurrentPage(1); // Reset current page when the category changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(timelineData.length / itemsPerPage);

    if (totalPages <= 7) {
      // Render all buttons if there are 7 or fewer pages
      return Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`mx-2 p-2 border rounded focus:outline-none ${
            currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {index + 1}
        </button>
      ));
    } else {
      // Render buttons with ellipsis when there are more than 7 pages
      const visibleButtons = [];
      const firstVisible = Math.min(Math.max(1, currentPage - 2), totalPages - 5);
      const lastVisible = Math.min(firstVisible + 5, totalPages);

      for (let i = firstVisible; i <= lastVisible; i++) {
        visibleButtons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-2 p-2 border rounded focus:outline-none ${
              currentPage === i ? 'bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {i}
          </button>
        );
      }

      if (firstVisible > 1) {
        visibleButtons.unshift(<span key="ellipsis-start">...</span>);
      }

      if (lastVisible < totalPages) {
        visibleButtons.push(<span key="ellipsis-end">...</span>);
      }

      return visibleButtons;
    }
  };

  return (
    <div className="container mx-auto p-3">
      <h1 className="text-3xl font-bold my-8 items-center">Msindisi Assessment</h1>

      {/* Category Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="category" className="mr-2 text-gray-700">
          Select Category:
        </label>
        <div className="relative">
          <select
            id="category"
            onChange={handleCategoryChange}
            value={selectedCategory || ''}
            className="block appearance-none w-[300px] bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 focus:bg-white"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category || 'All Categories'}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M10 12a2 2 0 100-4 2 2 0 000 4zM4 8a2 2 0 100-4 2 2 0 000 4zM16 8a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/*  Grid Layout for Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {timelineData
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item) => (
            <div key={item.Id} className="mb-8 p-4 border rounded shadow">
              <Suspense fallback={<div>Loading...</div>}>
                <LazyTimelineItem item={item} onPlay={handlePlayAudio} onPause={handlePauseAudio} />
              </Suspense>
            </div>
          ))}
      </div>

      {playingAudio && (
        <AudioPopup title={playingAudio} duration="3:30" onClose={() => setPlayingAudio(null)} />
      )}


      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`mx-2 p-2 border rounded focus:outline-none ${
            currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`mx-2 p-2 border rounded focus:outline-none ${
            currentPage === Math.ceil(timelineData.length / itemsPerPage)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          disabled={currentPage === Math.ceil(timelineData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
