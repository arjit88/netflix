import React from "react";
import "./HomeScreen.css";
import Nav from "../Navbar/Nav";
import Banner from "../Banner/Banner";
import Row from "../Row/Row";
import requests from "../../config/Requests";

const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror" fetchUrl={requests.fetchHorroMovies} />
      <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Animated" fetchUrl={requests.fetchAnimationMovies} />
      <Row title="Crime" fetchUrl={requests.fetchCrimeMovies} />
      <Row title="Science Fiction" fetchUrl={requests.fetchSciFiMovies} />
      <Row title="Adventure" fetchUrl={requests.fetchAdventureMovies} />
      <Row title="Drama" fetchUrl={requests.fetchDramaMovies} />
      <Row title="Family" fetchUrl={requests.fetchFamilyMovies} />
      <Row title="Fantasy" fetchUrl={requests.fetchFantasyMovies} />
      <Row title="Mystery" fetchUrl={requests.fetchMysteryMovies} />
      <Row title="Music" fetchUrl={requests.fetchMusicMovies} />
      <Row title="Thriller" fetchUrl={requests.fetchThrillerMovies} />
      <Row title="War" fetchUrl={requests.fetchWarMovies} />
      <Row title="Western" fetchUrl={requests.fetchWesternMovies} />
      <Row title="History" fetchUrl={requests.fetchHistoryMovies} />
      <Row title="Tv Special" fetchUrl={requests.fetchTVMovies} />
      <Row title="Documentary" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
};

export default HomeScreen;
