
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
