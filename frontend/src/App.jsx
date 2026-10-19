import { useState } from "react";
import "./App.css";
import ForgotPassword from "./ForgotPassword";

const movies = [
  {
    id: 1,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 2,
    title: "Mad Max: Fury Road",
    genre: "Action",
    year: 2015,
    poster: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
  },
  {
    id: 3,
    title: "John Wick",
    genre: "Action",
    year: 2014,
    poster: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
  },
  {
    id: 4,
    title: "The Hangover",
    genre: "Comedy",
    year: 2009,
    poster: "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg",
  },
  {
    id: 5,
    title: "Home Alone",
    genre: "Comedy",
    year: 1990,
    poster: "https://image.tmdb.org/t/p/w500/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg",
  },
  {
    id: 6,
    title: "The Mask",
    genre: "Comedy",
    year: 1994,
    poster: "https://image.tmdb.org/t/p/w500/8bsbX0N1U3G6Wkz2q9z3jvJ7kYf.jpg",
  },
  {
    id: 7,
    title: "Inception",
    genre: "Thriller",
    year: 2010,
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    id: 8,
    title: "Shutter Island",
    genre: "Thriller",
    year: 2010,
    poster: "https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg",
  },
  {
    id: 9,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 10,
    title: "The Martian",
    genre: "Sci-Fi",
    year: 2015,
    poster: "https://image.tmdb.org/t/p/w500/5aGhaIH6nro2j5n9p8Zx6hG8nZC.jpg",
  },
  {
    id: 11,
    title: "Titanic",
    genre: "Romance",
    year: 1997,
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
  },
  {
    id: 12,
    title: "The Notebook",
    genre: "Romance",
    year: 2004,
    poster: "https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eW9zV.jpg",
  },
  {
    id: 13,
    title: "The Conjuring",
    genre: "Horror",
    year: 2013,
    poster: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
  },
  {
    id: 14,
    title: "A Quiet Place",
    genre: "Horror",
    year: 2018,
    poster: "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
  },
];

const genres = ["All", "Action", "Comedy", "Thriller", "Sci-Fi", "Romance", "Horror", "Drama"];

function App() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const filteredMovies = movies.filter((movie) => {
  const matchesGenre =
    selectedGenre === "All" || movie.genre === selectedGenre;

  const matchesSearch = movie.title
    .toLowerCase()
    .includes(searchQuery.trim().toLowerCase());

  return matchesGenre && matchesSearch;
    });
    if (showForgotPassword) {
      return <ForgotPassword />;
    }
  return (
    
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">▶</span> StreamHub
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#genres">Genres</a>
        </nav>

        <span className="profile">Viewer</span>
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
        >
          Forgot Password?
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <p className="eyebrow">YOUR ENTERTAINMENT DESTINATION</p>
          <h1>Stories worth <span>watching.</span></h1>
          <p className="hero-description">
            Discover movies for every mood, all in one place.
          </p>
          <a className="explore-button" href="#genres">
            Explore Movies ↓
          </a>
        </section>

        <section className="catalog" id="movies">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR NEXT FAVORITE</p>
              <h2>Browse by Genre</h2>
            </div>
            <span className="movie-count">
              {filteredMovies.length} titles
            </span>
          </div>

          <div className="genre-list" id="genres">
            <div className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search movies and shows..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Search movies and shows"
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
            {genres.map((genre) => (
              <button
                key={genre}
                className={`genre-button ${
                  selectedGenre === genre ? "active" : ""
                }`}
                onClick={() => setSelectedGenre(genre)}
                aria-pressed={selectedGenre === genre}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="results-heading">
            <h3>{selectedGenre === "All" ? "Popular Movies" : `${selectedGenre} Movies`}</h3>
            <span>Explore the collection</span>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="movie-grid">
              {filteredMovies.map((movie) => (
                <article className="movie-card" key={movie.id}>
                  <div className={`movie-poster poster-${movie.genre.toLowerCase().replace(/[^a-z]/g, "")}`}>
                    <img
                        className="movie-poster"
                        src={movie.poster}
                        alt={`${movie.title} poster`}
                        loading="lazy"
                      />
                    <span className="poster-year">{movie.year}</span>
                  </div>
                  <div className="movie-info">
                    <div>
                      <h4>{movie.title}</h4>
                      <p>{movie.genre}</p>
                    </div>
                    <span className="play-icon" aria-label={`Play ${movie.title}`}>
                      ▶
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <span>🎬</span>

              <h3>
                {searchQuery.trim()
                  ? "No matching titles found"
                  : "No movies available"}
              </h3>

              <p>
                {searchQuery.trim()
                  ? `No titles match "${searchQuery.trim()}". Try another search.`
                  : `There are currently no movies in the ${selectedGenre} genre. Please explore another genre.`}
              </p>

              <button
                onClick={() => {
                  setSelectedGenre("All");
                  setSearchQuery("");
                }}
              >
                Browse All Movies
              </button>
            </div>
          )}
        </section>
      </main>

      <footer>
        <a className="brand" href="#home">
          <span className="brand-icon">▶</span> StreamHub
        </a>
        <p>Discover. Watch. Personalize. Subscribe.</p>
        <span>Team 04 · StreamHub</span>
      </footer>
    </div>
  );
}

export default App;