import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../config/axios";
import requests from "../../config/Requests";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false); // State for fade effect
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchUpComing);
      const validMovies = request.data.results.filter(
        (movie) => movie.backdrop_path
      );
      setMovies(validMovies);

      if (validMovies.length > 0) {
        setCurrentIndex(0);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fading out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length); // Cycle through movies
        setFade(false); // Fade back in
      }, 1000); // Time to wait before changing the image and text
    }, 6000); // Change background every 6 seconds

    return () => clearInterval(interval);
  }, [movies]);

  const truncate = (string, number) => {
    return string?.length > number
      ? string.substr(0, number - 1) + "..."
      : string;
  };

  if (movies.length === 0) {
    return <div className="banner">Loading...</div>;
  }

  const movie = movies[currentIndex];

  return (
    <header
      className={`banner`}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className={`banner__contents ${fade ? "fade" : ""}`}>
        <h1 className={`banner__title ${fade ? "fade" : ""}`}>
          {movie.title ||
            movie.name ||
            movie.original_name ||
            "No Title Available"}
        </h1>
        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() =>
              navigate(
                `/player/${movie.id ?? "Video is not available for this movie"}`
              )
            }
          >
            <img src={play_icon} alt="play_icon" /> Play
          </button>
          <button
            className="banner__button dark"
            onClick={() =>
              navigate(
                `/movieDescription/${
                  movie.id ?? "Description is not available for this movie"
                }`
              )
            }
          >
            <img src={info_icon} alt="info_icon" />
            More Info
          </button>
        </div>
        <h1 className={`banner__description ${fade ? "fade" : ""}`}>
          {truncate(movie.overview || "No Overview Available", 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
