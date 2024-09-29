import Nav from "../Navbar/Nav";
import Banner from "../Banner/Banner";
import Row from "../Row/Row";
import requests from "../../config/Requests";
import Footer from "../Footer/Footer";

const HomeScreen = () => {
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

  return (
    <div className="homeScreen">
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
    </div>
  );
};

export default HomeScreen;
