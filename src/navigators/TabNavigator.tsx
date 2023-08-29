import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {COLORS, FONTSIZE, SPACING} from '../theme';
import {TabParamList} from '../types/navigation/types';
import HomeScreen from '../screens/HomeScreen';
import CustomIcon from '../components/CustomIcon';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import UserScreen from '../screens/UserScreen';

const Tab = createBottomTabNavigator<TabParamList>();

type TabIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

type IconNameProps = {
  name: string;
  focused: boolean;
};

const IconName = ({name, focused}: IconNameProps) => (
  <View
    style={[
      styles.activedTab,
      focused ? {backgroundColor: COLORS.Orange} : {},
    ]}>
    <CustomIcon name={name} color={COLORS.White} size={FONTSIZE.size_30} />
  </View>
);

const HomeIcon = ({focused}: TabIconProps) => (
  <IconName focused={focused} name="video" />
);

const SearchIcon = ({focused}: TabIconProps) => (
  <IconName focused={focused} name="search" />
);

const TicketIcon = ({focused}: TabIconProps) => (
  <IconName focused={focused} name="ticket" />
);

const UserIcon = ({focused}: TabIconProps) => (
  <IconName focused={focused} name="user" />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          height: SPACING.space_10 * 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: HomeIcon,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: SearchIcon,
        }}
      />

      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: TicketIcon,
        }}
      />

      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: UserIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  activedTab: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 10,
  },
});
