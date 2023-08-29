import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import React from 'react';
import {TabScreenProps} from '../types/navigation/types';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';
import Setting from '../components/Setting';
import AppHeader from '../components/AppHeader';

type UserScreenProps = {
  navigation: TabScreenProps<'User'>['navigation'];
};

const UserScreen = ({navigation}: UserScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          iconName="close"
          title={'My Profile'}
          closeHandler={() => navigation.goBack()}
        />
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/image/avatar.png')}
          style={styles.avatarImage}
        />
        <Text style={styles.avatarText}>John Doe</Text>
      </View>

      <View style={styles.profileContainer}>
        <Setting
          iconName="user"
          heading="Account"
          subheading="Edit Profile"
          subtitle="Change Password"
        />
        <Setting
          iconName="setting"
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"
        />
        <Setting
          iconName="dollar"
          heading="Offers & Refferrals"
          subheading="Offer"
          subtitle="Refferrals"
        />
        <Setting
          iconName="info"
          heading="About"
          subheading="About Movies"
          subtitle="more"
        />
      </View>
    </ScrollView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_15,
    marginTop: SPACING.space_15,
  },
  profileContainer: {
    alignItems: 'center',
    padding: SPACING.space_36,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLORS.White,
  },
});
