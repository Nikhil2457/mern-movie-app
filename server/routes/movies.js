const express = require("express");
const axios = require("axios");
const Movie = require("../models/Movie");

const router = express.Router();

router.get("/", async (req, res) => {
  const { page = 1, limit = 20, search = "Spider" } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Check cache first for the specific search term
    const cachedMovies = await Movie.find({
      "data.Title": { $regex: search, $options: 'i' }
    })
      .skip(Number(offset))
      .limit(Number(limit))
      .sort({ "data.Title": 1 });

    if (cachedMovies.length >= limit) {
      return res.json({
        results: cachedMovies.map(m => m.data),
        totalResults: await Movie.countDocuments({ "data.Title": { $regex: search, $options: 'i' } }),
      });
    }

    // Fetch from IMDb API (max 8 movies per call)
    const moviesPerApiCall = 8;
    const pagesToFetch = Math.ceil(limit / moviesPerApiCall);
    let allMovies = [];
    const seenIds = new Set(); // Track seen imdbIDs to avoid duplicates

    for (let i = 0; i < pagesToFetch; i++) {
      const apiPage = Number(page) + i;
      try {
        const response = await axios.get(`${process.env.IMDB_API_URL}?q=${encodeURIComponent(search)}&page=${apiPage}`);
        
        if (!response.data.ok || response.data.description.length === 0) {
          if (allMovies.length > 0) break;
          return res.status(404).json({ message: "No movies found" });
        }

        const movies = response.data.description
          .map(movie => ({
            Title: movie["#TITLE"],
            Year: movie["#YEAR"],
            imdbID: movie["#IMDB_ID"],
            RANK: movie["#RANK"],
            Actors: movie["#ACTORS"],
            IMG_POSTER: movie["#IMG_POSTER"],
          }))
          .filter(movie => {
            // Filter out duplicates by imdbID
            if (seenIds.has(movie.imdbID)) {
              return false;
            }
            seenIds.add(movie.imdbID);
            return true;
          });

        allMovies = [...allMovies, ...movies];
        if (allMovies.length >= limit) break;
      } catch (error) {
        console.error(`Error fetching page ${apiPage}:`, error.message);
        if (allMovies.length > 0) break;
      }
    }

    // Cache movies in MongoDB (check for duplicates first)
    await Promise.all(
      allMovies.map(async (movie) => {
        try {
          // Check if movie already exists
          const existingMovie = await Movie.findOne({ imdbID: movie.imdbID });
          if (!existingMovie) {
            const movieDoc = new Movie({
              imdbID: movie.imdbID,
              data: movie,
            });
            await movieDoc.save();
          }
        } catch (error) {
          console.error(`Error caching movie ${movie.imdbID}:`, error.message);
        }
      })
    );

    if (allMovies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    res.json({
      results: allMovies.slice(0, limit),
      totalResults: allMovies.length + 1000,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie data", error: error.message });
  }
});

module.exports = router;