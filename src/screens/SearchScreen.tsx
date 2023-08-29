import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TabScreenProps} from '../types/navigation/types';
import {MovieType} from '../types/movies';
import {getSearchMovies as apiGetSearchMovies} from '../utils/movieApiCall';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';
import InputHeader from '../components/InputHeader';
import MovieCard from '../components/MovieCard';

type SearchScreenProps = {
  route: TabScreenProps<'Search'>['route'];
};

const SearchScreen = ({route}: SearchScreenProps) => {
  const {width} = useWindowDimensions();
  const search = route.params?.search;

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);

  const getSearchMovies = async (name: string) => {
    setIsLoadingMovie(true);
    const data = await apiGetSearchMovies(name);
    setMovies(data.results);
    setIsLoadingMovie(false);
  };

  useEffect(() => {
    if (search) {
      getSearchMovies(search);
    }
  }, [search]);

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <StatusBar hidden />

      <View style={[styles.inputHeaderContainer]}>
        <InputHeader />
        {search && <Text style={styles.search}>Search for "{search}"</Text>}
        {search && !isLoadingMovie && (
          <Text style={styles.result}>found {movies.length} result(s)</Text>
        )}
      </View>

      <View style={styles.moviesContainer}>
        {isLoadingMovie ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={COLORS.Orange} />
          </View>
        ) : (
          <>
            {movies.length > 0 && (
              <View style={styles.content}>
                {movies.map(item => (
                  <MovieCard
                    sub
                    key={item.id}
                    movie={item}
                    cardWidth={width / 2 - SPACING.space_12 * 2}
                  />
                ))}
              </View>
            )}

            {search && movies.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.notFound}>There is no movies found</Text>
              </View>
            )}

            {!search && movies.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.notFound}>
                  Search for the movie you want
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: COLORS.Black,
  },
  moviesContainer: {
    flexGrow: 1,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.space_15,
    alignItems: 'center',
    flexGrow: 1,
  },
  loading: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_15,
    marginTop: SPACING.space_15,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  search: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginTop: SPACING.space_15,
  },
  result: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  empty: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});
