import React from "react";
import WatchlistButton from "./WatchlistButton.jsx";

const MovieDetailsModal = ({ movie, isOpen, onClose, onAddToWatchlist, isInWatchlist }) => {
  if (!isOpen || !movie) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToWatchlist = () => {
    onAddToWatchlist(movie);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={movie.IMG_POSTER || "https://via.placeholder.com/600x300/1f2937/ffffff?text=No+Image"}
            alt={movie.Title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {movie.Title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                  {movie.Year || "N/A"}
                </span>
                {movie.RANK && (
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                    Rank #{movie.RANK}
                  </span>
                )}
              </div>
            </div>
            <WatchlistButton
              isInWatchlist={isInWatchlist}
              onToggle={handleAddToWatchlist}
            />
          </div>

          {/* Movie Details */}
          <div className="space-y-4">
            {movie.Actors && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Cast</h3>
                <p className="text-gray-600 dark:text-gray-300">{movie.Actors}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Movie Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">IMDb ID:</span>
                  <p className="text-gray-800 dark:text-white">{movie.imdbID}</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Release Year:</span>
                  <p className="text-gray-800 dark:text-white">{movie.Year || "Unknown"}</p>
                </div>
                {movie.RANK && (
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Popularity Rank:</span>
                    <p className="text-gray-800 dark:text-white">#{movie.RANK}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Placeholder for future features */}
            <div className="border-t dark:border-gray-700 pt-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Coming Soon</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div>• Plot Summary</div>
                <div>• Genre Information</div>
                <div>• Director Details</div>
                <div>• User Reviews</div>
                <div>• Similar Movies</div>
                <div>• Trailer Link</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;