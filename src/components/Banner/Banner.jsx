import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../config/axios";
import requests from "../../config/Requests";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchHistoryMovies);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    };

    fetchData();
  }, []);

  const truncate = (string, number) => {
    return string?.length > number
      ? string.substr(0, number - 1) + "..."
      : string;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">
            <img src={play_icon} alt="play_icon" /> Play
          </button>
          <button className="banner__button dark">
            <img src={info_icon} alt="info_icon" />
            More Info
          </button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
