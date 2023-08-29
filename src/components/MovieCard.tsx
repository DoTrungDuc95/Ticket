import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MovieType} from '../types/movies';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';
import {baseImagePath} from '../api';
import CustomIcon from './CustomIcon';
import {useNavigation} from '@react-navigation/native';

const GENRES = Object.freeze({
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentry',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystry',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
});

type MovieCardProps = {
  movie: MovieType;
  shoudlMarginatedAtEnd?: boolean;
  shouldMarginatedAround?: boolean;
  cardWidth: number;
  isFirst?: boolean;
  isLast?: boolean;
  sub?: boolean;
};

const MovieCard = ({
  movie,
  shoudlMarginatedAtEnd,
  shouldMarginatedAround,
  cardWidth,
  isFirst,
  isLast,
  sub = false,
}: MovieCardProps) => {
  const w = sub ? 'w342' : 'w780';
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Movie', {movieId: movie.id})}>
      <View
        style={[
          styles.container,
          shouldMarginatedAround ? {margin: SPACING.space_12} : {},
          shoudlMarginatedAtEnd && isFirst && {marginLeft: SPACING.space_15},
          shoudlMarginatedAtEnd && isLast && {marginRight: SPACING.space_15},
          {maxWidth: cardWidth},
        ]}>
        <Image
          style={[styles.cardImage, {width: cardWidth}]}
          source={{uri: baseImagePath(w, movie.poster_path)}}
        />

        <View>
          {!sub && (
            <View style={styles.rateContainer}>
              <CustomIcon name="star" style={styles.starIcon} />

              <Text style={styles.voteText}>
                {movie.vote_average} ({movie.vote_count})
              </Text>
            </View>
          )}

          <Text
            numberOfLines={1}
            style={[
              styles.textTitle,
              {fontSize: sub ? FONTSIZE.size_14 : FONTSIZE.size_24},
            ]}>
            {movie.original_title || movie.title}
          </Text>

          {!sub && (
            <View style={styles.genreContainer}>
              {movie.genre_ids.slice(0, 4).map((item: number) => {
                return (
                  <View key={item} style={styles.genreBox}>
                    <Text style={styles.genreText}>
                      {GENRES[item as keyof typeof GENRES]}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_10,
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    marginBottom: 5,
    color: COLORS.Yellow,
  },
  voteText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.White,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.White,
  },
});
