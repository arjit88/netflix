import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TvShows.css";
import Nav from "../../components/Navbar/Nav";

const TvShows = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const base_url = "https://image.tmdb.org/t/p/original/";
  const fetchUrl = `https://api.themoviedb.org/3/tv/popular?api_key=c4d2f5db860396b544127ac219cadde5&page=`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const request = await axios.get(`${fetchUrl}${page}`);
      setMovie((prevShows) => [...prevShows, ...request.data.results]);
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
    const lastShowElement = document.getElementById("last-show");

    const observerCallback = (entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    if (lastShowElement) {
      if (!observer.current) {
        observer.current = new IntersectionObserver(observerCallback);
      }
      observer.current.observe(lastShowElement);
    }

    return () => {
      if (lastShowElement && observer.current) {
        observer.current.unobserve(lastShowElement);
      }
    };
  }, [loading, movie]); // Ensure it runs when loading or tvShows changes

  return (
    <>
      <Nav />

      <div className="tv-shows">
        <h2>All TV Shows</h2>
        <div className="tv-shows__posters">
          {movie?.map((show, index) => (
            <img
              className="tv-show__poster"
              key={index}
              src={`${base_url}${show.poster_path || show.backdrop_path}`}
              alt={show.name}
              onClick={() => navigate(`/movieDescription/${show.id}`)}
            />
          ))}
          <div id="last-show" style={{ height: "20px" }} />{" "}
          {/* Empty div to act as the target for observer */}
        </div>
        {loading && <p className="loading">Loading more...</p>}
      </div>
    </>
  );
};

export default TvShows;
