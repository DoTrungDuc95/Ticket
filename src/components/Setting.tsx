import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';
import CustomIcon from './CustomIcon';

type SettingProps = {
  iconName: string;
  heading: string;
  subheading: string;
  subtitle: string;
};

const Setting = ({iconName, heading, subheading, subtitle}: SettingProps) => {
  return (
    <View style={styles.container}>
      <View>
        <CustomIcon name={iconName} style={styles.iconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{heading}</Text>
        <Text style={styles.subtitle}>{subheading}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <CustomIcon name={'arrow-right'} style={styles.iconStyle} />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    display: 'none',
  },
});
