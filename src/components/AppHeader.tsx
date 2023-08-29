import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';

type AppHeaderProps = {
  iconName: string;
  title?: string;
  closeHandler: () => void;
};

const AppHeader = ({iconName, title, closeHandler}: AppHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBg} onPress={() => closeHandler()}>
        <CustomIcon name={iconName} color={COLORS.White} style={styles.icon} />
      </TouchableOpacity>
      {title && <Text style={styles.headerText}>{title}</Text>}
      <View style={styles.emptyContainer} />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBg: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.Orange,
  },
  icon: {
    fontSize: FONTSIZE.size_24,
  },
  headerText: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    color: COLORS.White,
  },
  emptyContainer: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
  },
});
