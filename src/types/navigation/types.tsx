import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type TabParamList = {
  Home: undefined;
  Search: {search: string};
  Ticket: {
    seats: number[];
    time: string;
    date: {date: number; day: string};
    img: string;
  };
  User: undefined;
};

export type RootStackParamList = {
  Tab: NavigatorScreenParams<TabParamList>;
  Movie: {movieId: number};
  SeatBooking: {bg: string; img: string};
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
