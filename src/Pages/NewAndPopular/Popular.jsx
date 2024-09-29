import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Popular.css";
import Nav from "../../components/Navbar/Nav";

const Popular = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const base_url = "https://image.tmdb.org/t/p/original/";
  const fetchUrl = `https://api.themoviedb.org/3/movie/popular?api_key=c4d2f5db860396b544127ac219cadde5&page=`;
  const seenIds = useRef(new Set()); // Track seen movie IDs

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${fetchUrl}${page}`);
      const newMovies = data.results.filter((movie) => {
        if (seenIds.current.has(movie.id)) {
          return false;
        }
        seenIds.current.add(movie.id);
        return true;
      });
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    } catch (error) {
      console.error("Error fetching movies:", error);
      // Optionally, set an error state to show a message to the user
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
      <div className="new-and-popular">
        <h2>New & Popular</h2>
        <div className="new-and-popular__posters">
          {movies
            .filter(
              (movie) =>
                movie.title && (movie.poster_path || movie.backdrop_path)
            )
            .map((movie) => (
              <img
                className="new-and-popular__poster"
                key={movie.id}
                src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
                alt={movie.title}
                onClick={() => {
                  if (movie.id) {
                    navigate(`/movieDescription/${movie.id}`);
                  } else {
                    console.error("Movie ID is undefined for:", movie);
                  }
                }}
              />
            ))}
          <div id="last-movie" style={{ height: "20px" }} />
        </div>
        {loading && <p className="loading">Loading more...</p>}
      </div>
    </>
  );
};

export default Popular;
