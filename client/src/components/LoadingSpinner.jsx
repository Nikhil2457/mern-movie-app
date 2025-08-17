import React from "react";

const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center my-12 space-y-4">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-400 dark:border-t-purple-300 rounded-full animate-ping"></div>
    </div>
    <div className="text-center">
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 animate-pulse">Loading Movies...</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Fetching the latest trending movies</p>
    </div>
  </div>
);

export default LoadingSpinner;