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
  const fetchUrl = `https://api.themoviedb.org/3/movie/popular?api_key=c4d2f5db860396b544127ac219cadde5&page=`;
  const fetchData = async () => {
    setLoading(true);
    try {
      const request = await axios.get(`${fetchUrl}${page}`);
      setMovies((prevMovies) => [...prevMovies, ...request.data.results]);
    } catch (error) {
      console.error(error);
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
  }, [loading, movies]);

  return (
    <>
      <Nav />

      <div className="movies">
        <h2>Movies</h2>
        <div className="movies__posters">
          {movies?.map((movie, index) => (
            <img
              className="movie__poster"
              key={index}
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
          <div id="last-movie" style={{ height: "20px" }} />{" "}
          {/* Empty div to act as the target for observer */}
        </div>
        {loading && <p className="loading">Loading more...</p>}
      </div>
    </>
  );
};

export default Movies;
