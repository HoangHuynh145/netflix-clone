const API_KEY = process.env.REACT_APP_API_MOVIE_KEY

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&language=en-US`,
    fetchTopRate: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchUpcoming: `movie/upcoming?api_key=${API_KEY}&language=en-US`,
    fecthPopular: `/movie/popular?api_key=${API_KEY}&language=en-US`,
    fecthNowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,

    fetchMovieDefault: `/discover/movie?api_key=${API_KEY}&with_genres=`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchThrillerMovies: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchDramaMovies: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
    fetchFamilyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,


    fetchTvDefault: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=`,
    fetchTvFamilyMovies: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10751`,
    fetchTvDramaMovies: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=18`,
    fetchTvActionMovies: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10759`,
    fetchTvKidsMovies: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10762`,
    fetchTvAnimationMovies: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=16`, 
    fetchTvComedyMovies: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=35`,
    fetchTvMysteryMovies: `/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=9648`,

    fetchMoviesGenres: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    fetchTvGenres: `/genre/tv/list?api_key=${API_KEY}&language=en-US`,

    fetchSearchMovie: `/search/movie?api_key=${API_KEY}&language=en-US&query=`
}

export default requests
