import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import "./MovieDescription.css";
import Nav from "../Navbar/Nav";
import ClipLoader from "react-spinners/ClipLoader";

const MovieDescription = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const apiKey = "c4d2f5db860396b544127ac219cadde5";
  const navigate = useNavigate();

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`
      );
      setMovie(response.data);
    } catch (error) {
      toast.error("Failed to load movie details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading)
    return (
      <div className="loading-screen">
        <ClipLoader color="#ff0000" loading={loading} size={150} />
      </div>
    );
  if (!movie) return <div>Error: Movie not found.</div>;

  const director = movie.credits.crew.find(
    (person) => person.job === "Director"
  );

  const score = Math.round(movie.vote_average);
  const getScoreColor = (score) => {
    if (score >= 7) return "green";
    if (score >= 4) return "yellow";
    return "red";
  };

  const handleCastClick = (actorId) => {
    navigate(`/cast/${actorId}`);
  };

  return (
    <>
      <Nav />
      <div className="movie-description">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoArrowBack aria-hidden="true" /> Back
        </button>
        <div
          className="movie-description__banner"
          style={{ backgroundImage: `url(${base_url}${movie.backdrop_path})` }}
          aria-label={movie.title}
        >
          <div className="movie-description__overlay">
            <div className="movie-description__poster-container">
              <img
                className="movie-description__poster"
                src={`${base_url}${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
              <div className="movie-description__info">
                <h1>{movie.title}</h1>
                <div className="movie-description__score-container">
                  <div
                    className="movie-description__score-circle"
                    data-score={score}
                    style={{ borderColor: getScoreColor(score) }}
                  >
                    <div
                      className="movie-description__score-progress"
                      style={{
                        clipPath: `inset(0 ${100 - score * 10}% 0 0)`,
                      }}
                      data-score={score}
                    />
                    <span>{Math.round(movie.vote_average * 10)}%</span>
                  </div>
                  <span className="movie-description__score-source">IMDb</span>
                </div>
                <p className="movie-description__overview">{movie.overview}</p>
                <a
                  href="#"
                  className="play-button"
                  onClick={() =>
                    navigate(`/player/${movie.id || "Video not available"}`)
                  }
                >
                  ► Play Movie
                </a>
                <h3 className="movie-description__cast-title">Cast:</h3>
                <div className="movie-description__cast">
                  {movie?.credits.cast
                    .filter((actor) => actor.profile_path)
                    .slice(0, 5)
                    .map((actor) => (
                      <div key={actor.id} className="actor">
                        <div
                          className="actor__photo-container"
                          onClick={() => handleCastClick(actor.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleCastClick(actor.id)
                          }
                        >
                          <img
                            className="actor__photo"
                            src={`${base_url}${actor.profile_path}`}
                            alt={`${actor.name}`}
                          />
                          <p className="actor__name">{actor.name}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDescription;
