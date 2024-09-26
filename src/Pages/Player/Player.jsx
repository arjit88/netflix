import React, { useEffect, useState } from "react";
import "./Player.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGQyZjVkYjg2MDM5NmI1NDQxMjdhYzIxOWNhZGRlNSIsIm5iZiI6MTcyNjE2MTEzOS4yMjEwMTUsInN1YiI6IjY2ZGI1ZTNlOWQ5NWRkY2UxOGNjZTdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rRe2d8MsY8XAAKVS_8voG9zeKDGWc6dwqlH16Ji2g0w",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <div className="arrowContainer" onClick={() => navigate("/")}>
        <FaArrowLeft size={24} color="white" />
      </div>
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${
          apiData?.key ?? "No preview available for this movie"
        }`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Player;
