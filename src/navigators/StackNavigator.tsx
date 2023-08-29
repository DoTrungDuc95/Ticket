import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import MovieScreen from '../screens/MovieScreen';
import SeatBookingScreen from '../screens/SeatBookingScreen';
import {RootStackParamList} from '../types/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{
          animation: 'default',
        }}
      />

      <Stack.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="SeatBooking"
        component={SeatBookingScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
