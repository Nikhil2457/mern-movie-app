const mongoose = require("mongoose");
const Movie = require("./models/Movie");
require("dotenv").config();

const cleanupDuplicates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Find all movies
    const movies = await Movie.find();
    console.log(`Total movies in database: ${movies.length}`);

    // Analyze the data
    console.log(`\n=== DATABASE ANALYSIS ===`);
    
    // Group by imdbID
    const moviesById = {};
    const moviesByTitle = {};
    const searchTerms = new Set();

    movies.forEach(movie => {
      const id = movie.imdbID;
      const title = movie.data.Title;
      const year = movie.data.Year;

      if (!moviesById[id]) moviesById[id] = [];
      if (!moviesByTitle[title]) moviesByTitle[title] = [];

      moviesById[id].push(movie);
      moviesByTitle[title].push(movie);

      // Check if title contains search terms
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('spider')) searchTerms.add('spider');
      if (lowerTitle.includes('venom')) searchTerms.add('venom');
      if (lowerTitle.includes('marvel')) searchTerms.add('marvel');
    });

    // Find duplicates by ID
    const duplicateIds = Object.entries(moviesById)
      .filter(([id, movies]) => movies.length > 1)
      .map(([id, movies]) => ({ id, count: movies.length, movies }));

    // Find duplicates by Title
    const duplicateTitles = Object.entries(moviesByTitle)
      .filter(([title, movies]) => movies.length > 1)
      .map(([title, movies]) => ({ title, count: movies.length, movies }));

    console.log(`Search terms found: ${Array.from(searchTerms).join(', ')}`);
    console.log(`Duplicates by ID: ${duplicateIds.length}`);
    console.log(`Duplicates by Title: ${duplicateTitles.length}`);

    if (duplicateIds.length > 0) {
      console.log(`\n=== DUPLICATES BY ID ===`);
      duplicateIds.forEach(dup => {
        console.log(`ID: ${dup.id} (${dup.count} times)`);
        dup.movies.forEach((movie, index) => {
          console.log(`  ${index + 1}. "${movie.data.Title}" (${movie.data.Year})`);
        });
      });
    }

    if (duplicateTitles.length > 0) {
      console.log(`\n=== DUPLICATES BY TITLE ===`);
      duplicateTitles.forEach(dup => {
        console.log(`Title: "${dup.title}" (${dup.count} times)`);
        dup.movies.forEach((movie, index) => {
          console.log(`  ${index + 1}. ID: ${movie.imdbID} (${movie.data.Year})`);
        });
      });
    }

    // Show some sample movies
    console.log(`\n=== SAMPLE MOVIES IN DATABASE ===`);
    movies.slice(0, 10).forEach((movie, index) => {
      console.log(`${index + 1}. "${movie.data.Title}" (${movie.data.Year}) - ID: ${movie.imdbID}`);
    });

    // Ask user if they want to proceed with cleanup
    console.log(`\n=== CLEANUP OPTIONS ===`);
    console.log(`1. Remove duplicates by ID only`);
    console.log(`2. Remove duplicates by Title only`);
    console.log(`3. Remove duplicates by both ID and Title`);
    console.log(`4. Clear all non-Spider-Man related movies`);
    console.log(`5. Show status only (no changes)`);

    // For now, let's do option 3 (remove duplicates by both)
    console.log(`\nProceeding with option 3: Remove duplicates by both ID and Title`);

    // Remove duplicates by both ID and Title
    const uniqueMovies = [];
    const seenIds = new Set();
    const seenTitles = new Set();
    const duplicates = [];

    for (const movie of movies) {
      const movieId = movie.imdbID;
      const movieTitle = movie.data.Title;

      if (!seenIds.has(movieId) && !seenTitles.has(movieTitle)) {
        seenIds.add(movieId);
        seenTitles.add(movieTitle);
        uniqueMovies.push(movie);
      } else {
        duplicates.push({
          imdbID: movieId,
          title: movieTitle,
          _id: movie._id
        });
      }
    }

    console.log(`\n=== CLEANUP SUMMARY ===`);
    console.log(`Total movies found: ${movies.length}`);
    console.log(`Unique movies: ${uniqueMovies.length}`);
    console.log(`Duplicates to remove: ${duplicates.length}`);

    if (duplicates.length > 0) {
      console.log(`\n=== DUPLICATES TO BE REMOVED ===`);
      duplicates.forEach((dup, index) => {
        console.log(`${index + 1}. ID: ${dup.imdbID} | Title: ${dup.title}`);
      });

      // Clear the collection and reinsert unique movies
      console.log(`\nClearing database...`);
      await Movie.deleteMany({});
      
      console.log(`Inserting ${uniqueMovies.length} unique movies...`);
      await Movie.insertMany(uniqueMovies);

      // Verify the cleanup
      const finalCount = await Movie.countDocuments();
      console.log(`\n=== VERIFICATION ===`);
      console.log(`Movies in database after cleanup: ${finalCount}`);

      // Check for any remaining duplicates
      const remainingMovies = await Movie.find();
      const remainingIds = new Set();
      const remainingTitles = new Set();
      let remainingDuplicates = 0;

      for (const movie of remainingMovies) {
        if (remainingIds.has(movie.imdbID) || remainingTitles.has(movie.data.Title)) {
          remainingDuplicates++;
        }
        remainingIds.add(movie.imdbID);
        remainingTitles.add(movie.data.Title);
      }

      if (remainingDuplicates === 0) {
        console.log(`✅ No duplicates remaining!`);
      } else {
        console.log(`⚠️  ${remainingDuplicates} duplicates still found`);
      }
    } else {
      console.log(`✅ No duplicates found!`);
    }

    console.log(`\n=== CLEANUP COMPLETED ===`);
    process.exit(0);
  } catch (error) {
    console.error("Error cleaning database:", error);
    process.exit(1);
  }
};

// Add a function to filter only Spider-Man related movies
const filterSpiderManMovies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const movies = await Movie.find();
    console.log(`Total movies in database: ${movies.length}`);

    // Filter for Spider-Man related movies
    const spiderManMovies = movies.filter(movie => {
      const title = movie.data.Title.toLowerCase();
      return title.includes('spider') || 
             title.includes('venom') || 
             title.includes('carnage') ||
             title.includes('morbius') ||
             title.includes('kraven') ||
             title.includes('silk') ||
             title.includes('gwen') ||
             title.includes('miles') ||
             title.includes('peter') ||
             title.includes('parker');
    });

    console.log(`\n=== SPIDER-MAN RELATED MOVIES ===`);
    console.log(`Found ${spiderManMovies.length} Spider-Man related movies:`);
    spiderManMovies.forEach((movie, index) => {
      console.log(`${index + 1}. "${movie.data.Title}" (${movie.data.Year}) - ID: ${movie.imdbID}`);
    });

    const nonSpiderManMovies = movies.filter(movie => {
      const title = movie.data.Title.toLowerCase();
      return !title.includes('spider') && 
             !title.includes('venom') && 
             !title.includes('carnage') &&
             !title.includes('morbius') &&
             !title.includes('kraven') &&
             !title.includes('silk') &&
             !title.includes('gwen') &&
             !title.includes('miles') &&
             !title.includes('peter') &&
             !title.includes('parker');
    });

    console.log(`\n=== NON-SPIDER-MAN MOVIES ===`);
    console.log(`Found ${nonSpiderManMovies.length} non-Spider-Man movies:`);
    nonSpiderManMovies.forEach((movie, index) => {
      console.log(`${index + 1}. "${movie.data.Title}" (${movie.data.Year}) - ID: ${movie.imdbID}`);
    });

    // Ask if user wants to remove non-Spider-Man movies
    console.log(`\nDo you want to remove ${nonSpiderManMovies.length} non-Spider-Man movies? (y/n)`);
    
    // For now, let's just show the status
    console.log(`\nTo remove non-Spider-Man movies, run: node cleanup-duplicates.js --filter-spiderman`);

    process.exit(0);
  } catch (error) {
    console.error("Error filtering movies:", error);
    process.exit(1);
  }
};

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--filter-spiderman')) {
  filterSpiderManMovies();
} else if (args.includes('--status') || args.includes('-s')) {
  cleanupDuplicates();
} else {
  cleanupDuplicates();
}