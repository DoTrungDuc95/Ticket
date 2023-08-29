import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';
import {CastType} from '../types/movies';
import {baseImagePath} from '../api';

type CastCardProps = {
  shouldMarginatedAtEnd?: boolean;
  isFirst: boolean;
  isLast: boolean;
  cardWidth: number;
  cast: CastType;
};

const CastCard = ({
  shouldMarginatedAtEnd,
  isFirst,
  isLast,
  cardWidth,
  cast,
}: CastCardProps) => {
  return (
    <View
      style={[
        styles.container,
        shouldMarginatedAtEnd
          ? isFirst
            ? {marginLeft: SPACING.space_24}
            : isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {},
        {maxWidth: cardWidth},
      ]}>
      <Image
        source={{uri: baseImagePath('w185', cast.profile_path)}}
        style={[styles.cardImage, {width: cardWidth}]}
      />
      <Text style={styles.title} numberOfLines={1}>
        {cast.original_name}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {cast.character}
      </Text>
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    aspectRatio: 1920 / 2880,
    borderRadius: BORDERRADIUS.radius_25 * 4,
  },
  title: {
    alignSelf: 'stretch',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    marginTop: 5,
  },
  subtitle: {
    alignSelf: 'stretch',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
});
