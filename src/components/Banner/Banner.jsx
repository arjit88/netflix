import { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../config/axios";
import requests from "../../config/Requests";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(requests.fetchUpComing);
        const validMovies = request.data.results.filter(
          (movie) => movie.backdrop_path
        );
        setMovies(validMovies);
        if (validMovies.length > 0) {
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setFade(true); // Start fading out

      // Wait for fade-out to complete before changing the movie
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        setFade(false); // Fade back in
      }, 800); // Duration of the fade-out
    }, 6000); // Change background every 6 seconds

    return () => clearInterval(interval);
  }, [movies]);

  const truncate = (string, number, customEllipsis = "...") => {
    return string?.length > number
      ? string.substr(0, number - 1) + customEllipsis
      : string;
  };

  if (loading) {
    return (
      <div className="banner loading">
        <div className="spinnerssss"></div>
      </div>
    );
  }

  if (movies.length === 0) {
    return <div className="banner">No Movies Available</div>;
  }

  const movie = movies[currentIndex];

  return (
    <header
      className={`banner ${fade ? "fade" : ""}`}
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
        <div className={`banner__buttons ${fade ? "fade" : ""}`}>
          <button
            className="banner__button"
            onClick={() =>
              navigate(
                `/player/${movie.id ?? "Video is not available for this movie"}`
              )
            }
          >
            <img src={play_icon} alt="Play" /> Play
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
            <img src={info_icon} alt="More Info" />
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
