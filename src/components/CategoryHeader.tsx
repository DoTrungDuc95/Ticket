import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';

type CategoryHeaderProps = {
  title: string;
};

const CategoryHeader = ({title}: CategoryHeaderProps) => (
  <Text style={styles.header}>{title}</Text>
);

export default CategoryHeader;

const styles = StyleSheet.create({
  header: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_28,
  },
});
