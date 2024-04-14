import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import Footer from "./Footer"
import SearchIcon from "./assets/search.svg";
import logo from './assets/logo.png';
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=bedfc8ac";

const App = (movie) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Fantasy");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">

      <div className="navbar">
      <img src={logo} alt="Logo" width="600" height="83" />
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
            searchMovies(searchTerm)
            }}
        />
      </div>
      <button className="go-plus-button">Go Plus</button>
    </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default App;