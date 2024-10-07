import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Search.css";
import ClipLoader from "react-spinners/ClipLoader";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiKey = "c4d2f5db860396b544127ac219cadde5";

  const handleSearch = async (searchQuery) => {
    if (searchQuery !== "") {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchQuery}&page=${page}`
        );
        setResults(
          page === 1
            ? response.data.results
            : [...results, ...response.data.results]
        );
        setError("");
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("An error occurred while fetching results.");
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setPage(1);
    handleSearch(value);
  };

  const handlePosterClick = (id) => {
    navigate(`/movieDescription/${id}`);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      handleSearch(query);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="search-page">
      <div className="search-bar">
        <button className="back-buttonss" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <input
          type="text"
          placeholder="Search for movies, TV shows, genres..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>

      {/* Centered messages */}
      <div className="message-container">
        {error && <p className="error-message">{error}</p>}
        {results.length === 0 && !loading && (
          <p className="no-results">Search Movies,Web-Shows,Netflix-Original</p>
        )}
      </div>

      <div className="search-results">
        {results
          .filter((item) => {
            const title = item.media_type === "movie" ? item.title : item.name;
            return (
              item.poster_path &&
              title &&
              title.toLowerCase().includes(
                query.toLowerCase() // Case insensitive check
              )
            );
          })
          .map((item) => (
            <div key={item.id} className="search-item">
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt={item.media_type === "movie" ? item.title : item.name}
                onClick={() => handlePosterClick(item.id)}
              />
            </div>
          ))}
        {loading && (
          <div className="loading-screen">
            <ClipLoader color="#ff0000" loading={loading} size={150} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
