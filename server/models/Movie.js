const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  imdbID: { type: String, required: true, unique: true },
  data: {
    Title: { type: String, required: true },
    Year: { type: Number },
    RANK: { type: Number },
    Actors: { type: String },
    IMG_POSTER: { type: String },
  },
  fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Movie", movieSchema);
