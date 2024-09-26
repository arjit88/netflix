import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDescription.css";
import Nav from "../Navbar/Nav";

const MovieDescription = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
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
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  const director = movie.credits.crew.find(
    (person) => person.job === "Director"
  );

  return (
    <>
      <Nav />

      <div className="movie-description">
        <div
          className="movie-description__banner"
          style={{ backgroundImage: `url(${base_url}${movie.backdrop_path})` }}
        >
          <div className="movie-description__overlay">
            <div className="movie-description__content">
              <h1>{movie?.title}</h1>
              <p className="movie-description__overview">{movie.overview}</p>
              <div className="movie-description__details">
                <h2>Directed by: {director ? director.name : "N/A"}</h2>
                <h3>Cast:</h3>
                <div className="movie-description__cast">
                  {movie?.credits.cast
                    .filter((actor) => actor.profile_path) // Filter out actors without a profile picture
                    .slice(0, 5)
                    .map((actor) => (
                      <div key={actor.id} className="actor">
                        <img
                          className="actor__photo"
                          src={`${base_url}${actor.profile_path}`}
                          alt={actor.name}
                        />
                        <p className="actor__name">{actor.name}</p>
                      </div>
                    ))}
                </div>
              </div>
              <a
                href="#"
                className="play-button"
                onClick={() =>
                  navigate(
                    `/player/${
                      movie?.id ?? "Video is not available for this movie"
                    }`
                  )
                }
              >
                ► Play Movie
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDescription;
