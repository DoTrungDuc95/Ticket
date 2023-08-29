import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {generateDate, generateSeats} from '../utils';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import {RootStackScreenProps} from '../types/navigation/types';
import CustomIcon from '../components/CustomIcon';
import {useCallback} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const timeArray = ['10:30', '12:30', '14:30', '15:00', '19:30', '21:00'];

type SeatBookingScreenProps = {
  navigation: RootStackScreenProps<'SeatBooking'>['navigation'];
  route: RootStackScreenProps<'SeatBooking'>['route'];
};

const SeatBookingScreen = ({navigation, route}: SeatBookingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const [dates] = useState<
    {
      date: number;
      day: string;
    }[]
  >(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState(-1);
  const [price, setPrice] = useState(0);
  const [twoDSeats, setTwoDSeats] = useState<
    {
      number: number;
      taken: boolean;
      selected: boolean;
    }[][]
  >(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(-1);

  const selectSeat = (index: number, subindex: number) => {
    if (twoDSeats[index][subindex].taken) {
      return;
    }

    const seat = twoDSeats[index][subindex];
    const num = seat.number;
    const array = [...selectedSeats];
    const temp = [...twoDSeats];

    temp[index][subindex].selected = !temp[index][subindex].selected;

    if (!array.includes(num)) {
      array.push(num);
      setSelectedSeats(array);
    } else {
      const tempindex = array.indexOf(num);
      if (tempindex > -1) {
        array.splice(tempindex, 1);
        setSelectedSeats(array);
      }
    }
    setPrice(array.length * 5.0);
    setTwoDSeats(temp);
  };

  const dateKey = useCallback(
    (item: {date: number; day: string}) => item.date.toString(),
    [],
  );

  const dateContent = useCallback(
    ({item, index}: {item: {date: number; day: string}; index: number}) => (
      <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
        <View
          style={[
            styles.dateContainer,
            index === 0
              ? {marginLeft: SPACING.space_24}
              : index === dates.length - 1
              ? {marginRight: SPACING.space_24}
              : {},
            index === selectedDateIndex ? {backgroundColor: COLORS.Orange} : {},
          ]}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.dayText}>{item.day}</Text>
        </View>
      </TouchableOpacity>
    ),
    [dates.length, selectedDateIndex],
  );

  const timeKey = useCallback((key: string) => key, []);

  const timeContent = useCallback(
    ({item, index}: {item: string; index: number}) => (
      <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
        <View
          style={[
            styles.timeContainer,
            index === 0
              ? {marginLeft: SPACING.space_24}
              : index === timeArray.length - 1
              ? {marginRight: SPACING.space_24}
              : {},
            index === selectedTimeIndex ? {backgroundColor: COLORS.Orange} : {},
          ]}>
          <Text style={styles.timeText}>{item}</Text>
        </View>
      </TouchableOpacity>
    ),
    [selectedTimeIndex],
  );

  const bookSeats = async () => {
    if (
      !selectedSeats?.length ||
      selectedTimeIndex < 0 ||
      selectedDateIndex < 0
    ) {
      return;
    }

    const seats = selectedSeats;
    const time = timeArray[selectedTimeIndex];
    const date = dates[selectedDateIndex];
    const img = route.params.img;

    try {
      await EncryptedStorage.setItem(
        'ticket',
        JSON.stringify({
          seats,
          time,
          date,
          img,
        }),
      );
    } catch (error) {
      console.error(
        'Something went Wrong while storing in BookSeats Functions',
        error,
      );
    }

    navigation.navigate('Tab', {
      screen: 'Ticket',
      params: {
        seats,
        date,
        time,
        img,
      },
    });
  };

  useEffect(() => setIsLoading(false), []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.Orange} size={'large'} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />

      <View>
        <ImageBackground source={{uri: route.params.bg}} style={styles.imgBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                iconName="close"
                closeHandler={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>

        <Text style={styles.screenText}>Pick a seat</Text>
      </View>

      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {twoDSeats.map((item, i) => (
            <View key={i} style={styles.seatRow}>
              {item.map((data, j) => (
                <TouchableOpacity
                  key={data.number}
                  onPress={() => selectSeat(i, j)}
                  disabled={data.taken}>
                  <CustomIcon
                    name="seat"
                    style={[
                      styles.seatIcon,
                      data.taken && {color: COLORS.WhiteRGBA50},
                      data.selected && {color: COLORS.Orange},
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <CustomIcon name="radio" style={styles.radioIcon} />
            <Text style={styles.radioText}>Available</Text>
          </View>

          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              style={[styles.radioIcon, {color: COLORS.WhiteRGBA50}]}
            />
            <Text style={styles.radioText}>Taken</Text>
          </View>

          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              style={[styles.radioIcon, {color: COLORS.Orange}]}
            />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
      </View>

      <View>
        <FlatList
          data={dates}
          keyExtractor={dateKey}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={dateContent}
        />
      </View>

      <View style={styles.outterContainer}>
        <FlatList
          data={timeArray}
          keyExtractor={timeKey}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={timeContent}
        />
      </View>

      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>$ {price}.00</Text>
        </View>
        <TouchableOpacity
          onPress={() => bookSeats()}
          disabled={
            !selectedSeats?.length ||
            selectedTimeIndex < 0 ||
            selectedDateIndex < 0
          }>
          <Text
            style={[
              styles.buttonText,
              !selectedSeats?.length && {
                backgroundColor: COLORS.WhiteRGBA32,
                color: COLORS.WhiteRGBA50,
              },
              selectedDateIndex < 0 && {
                backgroundColor: COLORS.WhiteRGBA32,
                color: COLORS.WhiteRGBA50,
              },
              selectedTimeIndex < 0 && {
                backgroundColor: COLORS.WhiteRGBA32,
                color: COLORS.WhiteRGBA50,
              },
            ]}>
            Buy Tickets
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: COLORS.Black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  imgBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_15,
    marginTop: SPACING.space_15,
  },
  screenText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  radioText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.WhiteRGBA32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  outterContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.White,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
  },
});
