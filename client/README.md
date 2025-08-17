# MERN Movie Web Application

This MERN stack application fetches and displays at least 20 Spider-Man-related movies per page using the IMDb API (`https://imdb.iamidiotareyoutoo.com/search?q=Spider`) and caches results in MongoDB. It includes pagination, loading/error states, and a responsive grid layout.

## Features
- Displays 20 movies per page with fields: `Title`, `Year`, `imdbID`, `RANK`, `Actors`, `IMG_POSTER`.
- Caches data in MongoDB for efficiency.
- Supports pagination, loading spinner, and error handling.

## Prerequisites
- Node.js, npm, MongoDB (local or Atlas), Git

## Installation
1. Clone repository: `git clone https://github.com/your-username/mern-movie-app.git`
2. Backend setup:
   ```bash
   cd server
   npm install
   npm start
   ```
3. Frontend setup:
   ```bash
   cd client
   npm install
   npm start
   ```

## Usage
- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:5173
- API endpoint: http://localhost:5000/api/movies