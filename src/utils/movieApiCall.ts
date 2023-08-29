import {
  movieCastDetails,
  movieDetails,
  nowPlayingMovies,
  popularMovies,
  searchMovies,
  upcomingMovies,
} from '../api';

export const getNowPlayingMoviesList = async () => {
  try {
    const response = await fetch(nowPlayingMovies);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      ' Something went wrong in getNowPlayingMoviesList Function',
      error,
    );
  }
};

export const getUpcomingMoviesList = async () => {
  try {
    const response = await fetch(upcomingMovies);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      ' Something went wrong in getUpcomingMoviesList Function',
      error,
    );
  }
};

export const getPopularMoviesList = async () => {
  try {
    const response = await fetch(popularMovies);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      ' Something went wrong in getPopularMoviesList Function',
      error,
    );
  }
};

export const getSearchMovies = async (name: string) => {
  try {
    const response = await fetch(searchMovies(name));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something went wrong in searchMoviesFunction ', error);
  }
};

export const getMovieDetails = async (movieid: number) => {
  try {
    const response = await fetch(movieDetails(movieid));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something Went wrong in getMoviesDetails Function', error);
  }
};

export const getMovieCastDetails = async (movieid: number) => {
  try {
    const response = await fetch(movieCastDetails(movieid));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      'Something Went wrong in getMovieCastDetails Function',
      error,
    );
  }
};
