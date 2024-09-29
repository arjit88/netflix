import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import "./Cast.css";

const Cast = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actor, setActor] = React.useState(null);
  const [filmography, setFilmography] = React.useState([]);
  const [error, setError] = React.useState(null);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const apiKey = "c4d2f5db860396b544127ac219cadde5";

  const fetchActorDetails = async () => {
    try {
      const actorResponse = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`
      );
      const filmographyResponse = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}`
      );

      setActor(actorResponse.data);
      setFilmography(filmographyResponse.data.cast);
    } catch (error) {
      console.error("Error fetching actor details:", error);
      setError("Failed to load actor details. Please try again.");
    }
  };

  React.useEffect(() => {
    fetchActorDetails();
  }, [id]);

  if (error) return <div className="spinnerss">{error}</div>;
  if (!actor) return <div className="spinnerss">Loading...</div>;

  return (
    <div className="cast-container">
      <div
        className="cast-background"
        style={{ backgroundImage: `url(${base_url}${actor.profile_path})` }}
      />
      <button className="back-buttons" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      <div className="cast-content">
        <div className="cast-photo">
          <img src={`${base_url}${actor.profile_path}`} alt={actor.name} />
        </div>
        <div className="cast-details">
          <h1>{actor.name}</h1>
          <h2>Known for: {actor.known_for_department}</h2>
          <p className="bio-title">Biography:</p>
          <p className="bio-text">
            {actor.biography || "Biography not available."}
          </p>
          <p>Birthdate: {actor.birthday || "N/A"}</p>

          {/* Filmography Section */}
          <div className="filmography">
            <h3>Filmography:</h3>
            <ul>
              {filmography.slice(0, 10).map(
                (
                  movie // Limit to 10 movies
                ) => (
                  <li key={movie.id}>
                    {movie.title} ({new Date(movie.release_date).getFullYear()})
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cast;
