import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useEffect, useState, useCallback} from 'react';
import {CastType, MovieDetailType} from '../types/movies';
import {RootStackScreenProps} from '../types/navigation/types';
import {getMovieCastDetails, getMovieDetails} from '../utils/movieApiCall';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';
import {baseImagePath} from '../api';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';

type MovieScreenProps = {
  route: RootStackScreenProps<'Movie'>['route'];
  navigation: RootStackScreenProps<'Movie'>['navigation'];
};

const MovieScreen = ({route, navigation}: MovieScreenProps) => {
  const id = route.params.movieId;
  const [movie, setMovie] = useState<MovieDetailType>();
  const [casts, setCasts] = useState<CastType[]>();
  const [isLoading, setIsLoading] = useState(true);

  const getMovieInfo = useCallback(async () => {
    const data = await getMovieDetails(id);
    const cast = await getMovieCastDetails(id);
    setMovie(data);
    setCasts(cast.cast);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    getMovieInfo();
  }, [getMovieInfo]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} color={COLORS.Orange} />
      </View>
    );
  }

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{
            uri: baseImagePath('w780', movie?.backdrop_path!),
          }}
          resizeMode="cover"
          style={styles.imgBg}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.gradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                iconName="close"
                closeHandler={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.imgBg} />

        <Image
          source={{uri: baseImagePath('w342', movie?.backdrop_path!)}}
          style={styles.img}
        />
      </View>

      <View style={styles.timeContainer}>
        <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.runtimeText}>
          {Math.floor(movie?.runtime! / 60)}h {Math.floor(movie?.runtime! % 60)}
          m
        </Text>
      </View>

      <View>
        <Text style={styles.title}>{movie?.original_title}</Text>

        <View style={styles.genreContainer}>
          {movie?.genres.map(({id: genresId, name}) => (
            <View key={genresId} style={styles.genreBox}>
              <Text style={styles.genreText}>{name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.tagline}>{movie?.tagline}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <CustomIcon name="star" style={styles.starIcon} />

          <Text style={styles.runtimeText}>
            {movie?.vote_average.toFixed(1)} ({movie?.vote_count})
          </Text>

          <Text style={styles.runtimeText}>
            {movie?.release_date.substring(8, 10)}{' '}
            {new Date(movie?.release_date!).toLocaleString('default', {
              month: 'long',
            })}{' '}
            {movie?.release_date.substring(0, 4)}
          </Text>
        </View>

        <Text style={styles.descriptionText}>{movie?.overview}</Text>
      </View>

      <View>
        <CategoryHeader title="Top Cast" />

        <FlatList
          data={casts}
          keyExtractor={item => item.id.toString()}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => (
            <CastCard
              cast={item}
              shouldMarginatedAtEnd
              isFirst={index === 0}
              isLast={index === casts?.length! - 1}
              cardWidth={100}
            />
          )}
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonBG}
          onPress={() =>
            navigation.push('SeatBooking', {
              bg: baseImagePath('w780', movie?.backdrop_path!),
              img: baseImagePath('original', movie?.poster_path!),
            })
          }>
          <Text style={styles.buttonText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  loading: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: COLORS.Black,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: COLORS.Black,
  },
  imgBg: {
    width: '100%',
    aspectRatio: 3072 / 1707,
  },
  gradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_15,
    marginTop: SPACING.space_15,
  },
  img: {
    position: 'absolute',
    width: '60%',
    aspectRatio: 2 / 3,
    bottom: 0,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  runtimeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderColor: COLORS.White,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.White,
  },
  tagline: {
    fontFamily: FONTFAMILY.poppins_thin,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.White,
    textAlign: 'center',
    marginVertical: SPACING.space_15,
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
    marginBottom: 5,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    marginTop: SPACING.space_15,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});
