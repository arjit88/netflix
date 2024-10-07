import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (err) {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl]);

  if (loading)
    return (
      <div className="loading-screen">
        <ClipLoader color="#ff0000" loading={loading} size={150} />
      </div>
    );
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={isLargeRow ? movie.title : movie.name}
                onClick={() => navigate(`/movieDescription/${movie.id}`)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default React.memo(Row);
