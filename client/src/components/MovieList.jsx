import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import SearchBar from "./SearchBar.jsx";
import AdvancedFilters from "./AdvancedFilters.jsx";
import MovieDetailsModal from "./MovieDetailsModal.jsx";
import WatchlistButton from "./WatchlistButton.jsx";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    year: "",
    sort: "title",
    limit: 20,
    rankFilter: ""
  });
  
  // New state for features
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const fetchMovies = async (search = searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/movies`, {
        params: {
          limit: filters.limit,
          page: page,
          search: search || "movie"
        }
      });
      
      // Remove duplicates from frontend as well
      const uniqueMovies = response.data.results.filter((movie, index, self) => 
        index === self.findIndex(m => m.imdbID === movie.imdbID)
      );
      
      setMovies(uniqueMovies);
      setTotalResults(response.data.totalResults);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch movie data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, filters.limit]);

  const handleSearch = () => {
    setPage(1);
    fetchMovies(searchTerm);
  };

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleAddToWatchlist = (movie) => {
    const isInWatchlist = watchlist.some(m => m.imdbID === movie.imdbID);
    
    if (isInWatchlist) {
      setWatchlist(watchlist.filter(m => m.imdbID !== movie.imdbID));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  };

  const isInWatchlist = (movie) => {
    return watchlist.some(m => m.imdbID === movie.imdbID);
  };

  const filteredAndSortedMovies = movies
    .filter(movie => {
      // Year filter
      if (filters.year && movie.Year) {
        if (movie.Year.toString() !== filters.year) return false;
      }
      
      // Rank filter
      if (filters.rankFilter && movie.RANK) {
        const rank = movie.RANK;
        switch (filters.rankFilter) {
          case "top100":
            if (rank > 100) return false;
            break;
          case "top500":
            if (rank > 500) return false;
            break;
          case "top1000":
            if (rank > 1000) return false;
            break;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case "title":
          return a.Title.localeCompare(b.Title);
        case "title-desc":
          return b.Title.localeCompare(a.Title);
        case "year":
          return (b.Year || 0) - (a.Year || 0);
        case "year-desc":
          return (a.Year || 0) - (b.Year || 0);
        case "rank":
          return (a.RANK || 0) - (b.RANK || 0);
        case "rank-desc":
          return (b.RANK || 0) - (a.RANK || 0);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(totalResults / filters.limit);

  return (
    <div className="space-y-6">
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        onSearch={handleSearch} 
      />
      
      <AdvancedFilters filters={filters} setFilters={setFilters} />

      {/* Watchlist Summary */}
      {watchlist.length > 0 && (
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                Your Watchlist ({watchlist.length} movies)
              </h3>
              <p className="text-sm text-purple-600 dark:text-purple-300">
                Movies you've saved to watch later
              </p>
            </div>
            <button
              onClick={() => setWatchlist([])}
              className="text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100 text-sm"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAndSortedMovies.map((movie) => (
              <MovieCard 
                key={movie.imdbID}
                movie={movie}
                onAddToWatchlist={handleAddToWatchlist}
                onShowDetails={handleShowDetails}
                isInWatchlist={isInWatchlist(movie)}
              />
            ))}
          </div>
          
          {filteredAndSortedMovies.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-lg">No movies found</div>
              <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Simple Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              
              <span className="text-gray-700 dark:text-gray-300">
                Page {page} of {totalPages}
              </span>
              
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToWatchlist={handleAddToWatchlist}
        isInWatchlist={selectedMovie ? isInWatchlist(selectedMovie) : false}
      />
    </div>
  );
};

export default MovieList;