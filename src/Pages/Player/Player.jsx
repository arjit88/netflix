import React, { useEffect, useState } from "react";
import "./Player.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({
    name: "",
    key: "",
  });
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGQyZjVkYjg2MDM5NmI1NDQxMjdhYzIxOWNhZGRlNSIsIm5iZiI6MTcyNjE2MTEzOS4yMjEwMTUsInN1YiI6IjY2ZGI1ZTNlOWQ5NWRkY2UxOGNjZTdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rRe2d8MsY8XAAKVS_8voG9zeKDGWc6dwqlH16Ji2g0w",
    },
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.results.length > 0) {
          setVideoData(data.results[0]);
        } else {
          toast.error("No video found for this movie.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching the video.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id, options]);

  return (
    <div className="player">
      <div
        className="arrowContainer"
        onClick={() => navigate(-2)}
        aria-label="Go back"
      >
        <FaArrowLeft size={24} color="white" />
      </div>

      {loading ? (
        <div className="loading-screen">
          <ClipLoader color="#ff0000" loading={loading} size={150} />
        </div>
      ) : (
        <>
          {videoData.key ? (
            <iframe
              className="video-iframe"
              src={`https://www.youtube.com/embed/${videoData.key}`}
              title={videoData.name || "Trailer"}
              frameBorder="0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <div className="no-preview">
              No preview available for this movie
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Player;
