const API_KEY = "c4d2f5db860396b544127ac219cadde5";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${"c4d2f5db860396b544127ac219cadde5"}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_network=213`,
  fetchTopRated: `/movie/top_rated?api_key=${"c4d2f5db860396b544127ac219cadde5"}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=28`,
  fetchComedyMovies: `/discover/movies?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=35`,
  fetchHorroMovies: `/discover/movies?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=27`,
  fetchRomanceMovies: `/discover/movies?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=10749`,
  fetchDocumentaries: `/discover/movies?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=99`,
};

export default requests;
