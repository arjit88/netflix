import React, { useState, useEffect } from "react";
import Nav from "../Navbar/Nav";
import Banner from "../Banner/Banner";
import Row from "../Row/Row";
import requests from "../../config/Requests";
import Footer from "../Footer/Footer";
import "./HomeScreen.css";
import ClipLoader from "react-spinners/ClipLoader";

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);

  const rows = [
    {
      title: "NETFLIX ORIGINALS",
      fetchUrl: requests.fetchNetflixOriginals,
      isLargeRow: true,
    },
    { title: "Trending Now", fetchUrl: requests.fetchTrending },
    { title: "Up Coming", fetchUrl: requests.fetchUpComing },
    { title: "Popular", fetchUrl: requests.fetchPopular },
    { title: "Top Rated", fetchUrl: requests.fetchTopRated },
    { title: "Action", fetchUrl: requests.fetchActionMovies },
    { title: "Horror", fetchUrl: requests.fetchHorroMovies },
    { title: "Romance", fetchUrl: requests.fetchRomanceMovies },
    { title: "Now Playing", fetchUrl: requests.fetchNowPlaying },
    { title: "Animated", fetchUrl: requests.fetchAnimationMovies },
    { title: "Crime", fetchUrl: requests.fetchCrimeMovies },
    { title: "Comedy", fetchUrl: requests.fetchComedyMovies },
    { title: "Science Fiction", fetchUrl: requests.fetchSciFiMovies },
    { title: "Adventure", fetchUrl: requests.fetchAdventureMovies },
    { title: "Drama", fetchUrl: requests.fetchDramaMovies },
    { title: "Family", fetchUrl: requests.fetchFamilyMovies },
    { title: "Fantasy", fetchUrl: requests.fetchFantasyMovies },
    { title: "Mystery", fetchUrl: requests.fetchMysteryMovies },
    { title: "Music", fetchUrl: requests.fetchMusicMovies },
    { title: "Thriller", fetchUrl: requests.fetchThrillerMovies },
    { title: "War", fetchUrl: requests.fetchWarMovies },
    { title: "Western", fetchUrl: requests.fetchWesternMovies },
    { title: "History", fetchUrl: requests.fetchHistoryMovies },
    { title: "TV Special", fetchUrl: requests.fetchTVMovies },
    { title: "Documentary", fetchUrl: requests.fetchDocumentaries },
  ];

  useEffect(() => {
    // Check if data is already cached
    const cachedData = localStorage.getItem("homeData");
    if (cachedData) {
      setLoading(false); // No loading if data is cached
    } else {
      // Simulate data fetching with a timeout
      const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Store data in localStorage (you may replace this with actual fetch and data)
        localStorage.setItem("homeData", JSON.stringify(rows));
        setLoading(false);
      };
      fetchData();
    }
  }, []);

  return (
    <div className="homeScreen">
      {loading ? (
        <div className="loading-screen">
          <ClipLoader color="#ff0000" loading={loading} size={150} />
        </div>
      ) : (
        <>
          <Nav />
          <Banner />
          {rows.map(({ title, fetchUrl, isLargeRow }, index) => (
            <Row
              key={title}
              title={title}
              fetchUrl={fetchUrl}
              isLargeRow={isLargeRow}
            />
          ))}
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
