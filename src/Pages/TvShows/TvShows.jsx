import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TvShows.css";
import Nav from "../../components/Navbar/Nav";
import ClipLoader from "react-spinners/ClipLoader";

const TvShows = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const base_url = "https://image.tmdb.org/t/p/original/";
  const fetchUrl = `https://api.themoviedb.org/3/tv/popular?api_key=c4d2f5db860396b544127ac219cadde5&page=`;

  const seenIds = useRef(new Set()); // Use a ref to track seen IDs

  const isValidShow = (show) => {
    return (
      show.name && show.id != null && (show.poster_path || show.backdrop_path)
    );
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${fetchUrl}${page}`);
      const validMovies = data.results.filter(isValidShow);

      // Filter out already seen shows
      const newMovies = validMovies.filter((show) => {
        if (seenIds.current.has(show.id)) {
          return false; // Skip already seen shows
        }
        seenIds.current.add(show.id); // Mark this show as seen
        return true; // Keep the new show
      });

      if (newMovies.length === 0) {
        console.error("No new valid TV shows found for the current page.");
        return;
      }

      setMovies((prevShows) => [...prevShows, ...newMovies]);
    } catch (error) {
      console.error("Error fetching data:", error);
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
  }, [loading]);

  return (
    <>
      <Nav />
      <div className="tv-shows">
        <h2>TV Shows</h2>
        <div className="tv-shows__posters">
          {movies.filter(isValidShow).map((show) => (
            <img
              className="tv-show__poster"
              key={show.id} // Use show.id as the key
              src={`${base_url}${
                show.poster_path ||
                show.backdrop_path ||
                "default_image_path.jpg"
              }`} // Fallback image
              alt={show.name}
              onClick={() => navigate(`/movieDescription/${show.id}`)}
            />
          ))}
          <div id="last-show" style={{ height: "20px" }} />
        </div>
        {loading && (
          <div className="loading-screen">
            <ClipLoader color="#ff0000" loading={loading} size={150} />
          </div>
        )}
      </div>
    </>
  );
};

export default TvShows;
