import Config from 'react-native-config';

const apikey = Config.TMDB_API_KEY;

export const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;

export const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;

export const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;

export const baseImagePath = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const searchMovies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};

export const movieDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};

export const movieCastDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};
