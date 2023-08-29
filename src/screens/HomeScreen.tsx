import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {MovieType} from '../types/movies';
import {COLORS, SPACING} from '../theme';
import InputHeader from '../components/InputHeader';
import {
  getNowPlayingMoviesList,
  getPopularMoviesList,
  getUpcomingMoviesList,
} from '../utils/movieApiCall';
import CategoryHeader from '../components/CategoryHeader';
import MovieCard from '../components/MovieCard';
import {TabScreenProps} from '../types/navigation/types';

type HomeScreenProps = {
  navigation: TabScreenProps<'Home'>['navigation'];
};

const HomeScreen = ({}: HomeScreenProps) => {
  const {width} = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieType[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieType[]>([]);

  const setMovies = async () => {
    const nowPlaying = await getNowPlayingMoviesList();
    const upcoming = await getUpcomingMoviesList();
    const popular = await getPopularMoviesList();

    setNowPlayingMovies(nowPlaying.results);
    setUpcomingMovies(upcoming.results);
    setPopularMovies(popular.results);
    setIsLoading(false);
  };

  useEffect(() => {
    setMovies();
  }, []);

  if (isLoading) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}>
        <StatusBar hidden />

        <View style={styles.inputContainer}>
          <InputHeader />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContainer}
      bounces={false}>
      <StatusBar hidden />

      <View style={styles.inputContainer}>
        <InputHeader />
      </View>

      <CategoryHeader title="Now Playing" />
      <FlatList
        data={[{id: 'dummy1'}, ...nowPlayingMovies, {id: 'dummy2'}]}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => {
          if (!Object.keys(item).includes('title')) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}
              />
            );
          }
          return (
            <MovieCard
              movie={item as MovieType}
              shoudlMarginatedAtEnd={true}
              cardWidth={width * 0.7}
              isFirst={index === 0 ? true : false}
              isLast={index === nowPlayingMovies?.length - 1 ? true : false}
            />
          );
        }}
      />

      <CategoryHeader title="Popular" />
      <FlatList
        data={popularMovies}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <MovieCard
            sub
            movie={item}
            shoudlMarginatedAtEnd={true}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === popularMovies?.length - 1 ? true : false}
          />
        )}
      />

      <CategoryHeader title="Upcoming" />
      <FlatList
        data={upcomingMovies}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
          <MovieCard
            sub
            movie={item}
            shoudlMarginatedAtEnd={true}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === upcomingMovies?.length - 1 ? true : false}
          />
        )}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
    paddingBottom: SPACING.space_16,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    marginHorizontal: SPACING.space_15,
    marginTop: SPACING.space_15,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});
