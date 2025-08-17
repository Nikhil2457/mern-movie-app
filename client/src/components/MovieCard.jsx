import React, { useState } from "react";
import WatchlistButton from "./WatchlistButton.jsx";

const MovieCard = ({ movie, onAddToWatchlist, onShowDetails, isInWatchlist }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getRatingColor = (rank) => {
    if (rank <= 100) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (rank <= 500) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (rank <= 1000) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  };

  const getYearColor = (year) => {
    const currentYear = new Date().getFullYear();
    if (year === currentYear) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    if (year >= currentYear - 2) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
  };

  const handleCardClick = (e) => {
    // Don't open modal if clicking on watchlist button
    if (e.target.closest('button')) return;
    onShowDetails(movie);
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer border border-gray-200 dark:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageError ? "https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Image" : movie.IMG_POSTER}
          alt={movie.Title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={handleImageError}
        />
        
        {/* Overlay with quick actions */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <WatchlistButton
              isInWatchlist={isInWatchlist}
              onToggle={(e) => {
                e.stopPropagation();
                onAddToWatchlist(movie);
              }}
              className="w-full"
            />
          </div>
        </div>

        {/* New badge for recent movies */}
        {movie.Year && movie.Year >= new Date().getFullYear() - 1 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            NEW
          </div>
        )}

        {/* Rating badge */}
        {movie.RANK && (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-bold">
            #{movie.RANK}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {movie.Title}
        </h2>
        
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getYearColor(movie.Year)}`}>
              {movie.Year || "N/A"}
            </span>
            {movie.RANK && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(movie.RANK)}`}>
                Rank #{movie.RANK}
              </span>
            )}
          </div>
          
          {movie.Actors && (
            <div className="flex items-start">
              <span className="font-semibold mr-2 text-xs">Cast:</span>
              <span className="text-xs line-clamp-2 text-gray-500 dark:text-gray-400">{movie.Actors}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
            <span>ID: {movie.imdbID}</span>
            <span className="text-purple-500 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
              Click for details
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;