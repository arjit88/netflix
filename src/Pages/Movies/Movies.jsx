import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Movies.css";
import Nav from "../../components/Navbar/Nav";

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const base_url = "https://image.tmdb.org/t/p/original/";
  const fetchUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=c4d2f5db860396b544127ac219cadde5&page=`;

  const seenIds = useRef(new Set()); // Track seen movie IDs

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${fetchUrl}${page}`);
      const newMovies = data.results.filter((movie) => {
        // Filter out movies already seen
        if (seenIds.current.has(movie.id)) {
          return false; // Skip duplicates
        }
        seenIds.current.add(movie.id); // Mark as seen
        return true; // Keep the new movie
      });

      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const lastMovieElement = document.getElementById("last-movie");

    const observerCallback = (entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    if (lastMovieElement) {
      if (!observer.current) {
        observer.current = new IntersectionObserver(observerCallback);
      }
      observer.current.observe(lastMovieElement);
    }

    return () => {
      if (lastMovieElement && observer.current) {
        observer.current.unobserve(lastMovieElement);
      }
    };
  }, [loading]);

  return (
    <>
      <Nav />
      <div className="movies">
        <h2>Movies</h2>
        <div className="movies__posters">
          {movies
            .filter(
              (movie) =>
                movie.title && (movie.poster_path || movie.backdrop_path)
            ) // Filter out movies with empty title or missing photos
            .map((movie) => (
              <img
                className="movie__poster"
                key={movie.id} // Use movie.id as the key
                src={`${base_url}${movie.poster_path || movie.backdrop_path}`} // Fallback logic can be improved
                alt={movie.title}
                onClick={() => navigate(`/movieDescription/${movie.id}`)}
              />
            ))}
          <div id="last-movie" style={{ height: "20px" }} />{" "}
          {/* Empty div to act as the target for observer */}
        </div>
        {loading && <p className="loading">Loading more...</p>}
      </div>
    </>
  );
};

export default Movies;
