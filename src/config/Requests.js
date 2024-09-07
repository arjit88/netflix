const API_KEY = "c4d2f5db860396b544127ac219cadde5";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${"c4d2f5db860396b544127ac219cadde5"}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_network=213`,
  fetchTopRated: `/movie/top_rated?api_key=${"c4d2f5db860396b544127ac219cadde5"}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=35`,
  fetchHorroMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=10749`,
  fetchAnimationMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=16`,
  fetchCrimeMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=80`,
  fetchSciFiMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=878`,
  fetchAdventureMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=12`,
  fetchDramaMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=18`,
  fetchFamilyMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=10751`,
  fetchFantasyMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=14`,
  fetchMysteryMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=9648`,
  fetchMusicMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=10402`,
  fetchThrillerMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=53`,
  fetchWarMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=10752`,
  fetchWesternMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=37`,
  fetchHistoryMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=36`,
  fetchTVMovies: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=10770`,
  fetchDocumentaries: `/discover/movie?api_key=${"c4d2f5db860396b544127ac219cadde5"}&with_genres=99`,
};

export default requests;
