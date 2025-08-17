# 🎬 TrendMovie Explorer

A modern, responsive web application for discovering and exploring trending movies from around the world. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and enhanced with advanced features like dark mode, watchlist functionality, and real-time search.

![TrendMovie Explorer](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.5.1-green?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?logo=tailwind-css)

## ✨ Features

### �� Core Features
- **Movie Search & Discovery** - Search for any movie with real-time results
- **Advanced Filtering** - Filter by year, popularity rank, and sort options
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between dark and light modes with persistence

### 🎨 Enhanced User Experience
- **Movie Details Modal** - Click any movie for detailed information
- **Watchlist Functionality** - Save movies to watch later with localStorage
- **Loading States** - Beautiful loading animations and error handling
- **Pagination** - Smooth navigation through movie results
- **Hover Effects** - Interactive movie cards with smooth animations

### �� Technical Features
- **Duplicate Prevention** - Smart caching to avoid duplicate movies
- **Real-time Search** - Instant search results with debouncing
- **Image Fallbacks** - Graceful handling of missing movie posters
- **Performance Optimized** - Lazy loading and efficient rendering

## �� Live Demo

**Frontend:** [https://trendmovie-explorer.vercel.app](https://trendmovie-explorer.vercel.app)  
**Backend API:** [https://trendmovie-api.vercel.app](https://trendmovie-api.vercel.app)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Local Storage** - Client-side data persistence

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **MongoDB Atlas** - Cloud database hosting
- **CORS** - Cross-origin resource sharing

### External APIs
- **IMDb API** - Movie data and information
- **Movie Database** - Additional movie metadata

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/trendmovie-explorer.git
cd trendmovie-explorer
```

### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Configure your `.env` file:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-app
IMDB_API_URL=https://imdb.iamidiotareyoutoo.com/search
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Configure your `.env` file:**
```env
VITE_API_URL=http://localhost:5000
```

### 4. Start Development Servers
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

Visit `http://localhost:5173` to see the application!

## ��️ Project Structure

## �� API Endpoints

### GET `/api/movies`
Fetch movies with pagination and search.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Movies per page (default: 20)
- `search` (string): Search term (default: "movie")

**Response:**
```json
{
  "results": [
    {
      "Title": "Movie Title",
      "Year": 2024,
      "imdbID": "tt1234567",
      "RANK": 100,
      "Actors": "Actor 1, Actor 2",
      "IMG_POSTER": "https://example.com/poster.jpg"
    }
  ],
  "totalResults": 1000
}
```

## �� Features in Detail

### Dark/Light Theme Toggle
- Persistent theme preference using localStorage
- Smooth transitions between themes
- System preference detection
- Accessible toggle button

### Advanced Search & Filters
- **Year Filter**: Filter movies by release year
- **Rank Filter**: Show only top 100/500/1000 movies
- **Sort Options**: Title (A-Z/Z-A), Year (Newest/Oldest), Rank (Best/Worst)
- **Movies Per Page**: 10, 20, 30, or 50 movies

### Watchlist Management
- Add/remove movies to personal watchlist
- Persistent storage using localStorage
- Watchlist summary with movie count
- Clear all functionality

### Movie Details Modal
- Comprehensive movie information
- Cast details
- IMDb ID and ranking
- Quick add to watchlist
- Responsive design

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables
5. Deploy!

### Backend (Railway/Render)
1. Connect GitHub repository
2. Add environment variables
3. Configure build and start commands
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �� Acknowledgments

- **IMDb API** for providing movie data
- **Tailwind CSS** for the beautiful UI framework
- **Vite** for the fast development experience
- **MongoDB Atlas** for the free cloud database

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/yourusername/trendmovie-explorer/issues)
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourusername)

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Movie reviews and ratings
- [ ] Social features (sharing, following)
- [ ] Movie recommendations
- [ ] Trailer integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

**Made with ❤️ by [Nikhil]**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/trendmovie-explorer?style=social)](https://github.com/yourusername/trendmovie-explorer/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/trendmovie-explorer?style=social)](https://github.com/yourusername/trendmovie-explorer/network)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/trendmovie-explorer)](https://github.com/yourusername/trendmovie-explorer/issues)
