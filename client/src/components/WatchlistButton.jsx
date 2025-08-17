import React from "react";

const WatchlistButton = ({ isInWatchlist, onToggle, className = "" }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isInWatchlist
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-purple-600 text-white hover:bg-purple-700"
      } ${className}`}
    >
      {isInWatchlist ? (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>In Watchlist</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add to Watchlist</span>
        </>
      )}
    </button>
  );
};

export default WatchlistButton;