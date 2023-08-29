import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {TabScreenProps} from '../types/navigation/types';
import EncryptedStorage from 'react-native-encrypted-storage';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';

type TicketScreenProps = {
  route: TabScreenProps<'Ticket'>['route'];
  navigation: TabScreenProps<'Ticket'>['navigation'];
};

type TicKetType = {
  seats: number[];
  time: string;
  date: {
    date: number;
    day: string;
  };
  img: string;
};

const TicketScreen = ({route, navigation}: TicketScreenProps) => {
  const [ticket, setTicket] = useState<TicKetType>();
  const [isLoading, setIsLoading] = useState(true);

  const getTicket = useCallback(async () => {
    try {
      if (!route.params) {
        const t = await EncryptedStorage.getItem('ticket');
        if (t) {
          setTicket(JSON.parse(t));
        }
      } else {
        setTicket(route.params);
      }
    } catch {
    } finally {
      setIsLoading(false);
      await EncryptedStorage.clear();
    }
  }, [route.params]);

  useEffect(() => {
    getTicket();
  }, [getTicket]);

  if (isLoading) {
    return (
      <View style={styles.empty}>
        <ActivityIndicator size={'large'} color={COLORS.Orange} />
      </View>
    );
  }

  if (!ticket) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            iconName="close"
            title={'My Tickets'}
            closeHandler={() => navigation.goBack()}
          />
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Let buy one ticket</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />

      <View style={styles.appHeaderContainer}>
        <AppHeader
          iconName="close"
          title={'My Tickets'}
          closeHandler={() => navigation.goBack()}
        />
      </View>

      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticket.img}}
          style={styles.ticketBGImage}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}
          />
        </ImageBackground>

        <View style={styles.linear} />

        <View style={styles.ticketFooter}>
          <View style={[styles.blackCircle, styles.topLeft]} />
          <View style={[styles.blackCircle, styles.topRight]} />

          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{ticket.date.date}</Text>
              <Text style={styles.subtitle}>{ticket.date.day}</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={[styles.subtitle, styles.iconSubtitle]}>
                {ticket.time}
              </Text>
            </View>
          </View>

          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>02</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subtitle}>04</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticket.seats
                  .slice(0, 3)
                  .map((item: any, index: number, arr: any) => {
                    return item + (index === arr.length - 1 ? '' : ', ');
                  })}
                {ticket.seats.length > 3 && '...'}
              </Text>
            </View>
          </View>

          <Image
            source={require('../../assets/image/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    backgroundColor: COLORS.Black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_15,
    marginVertical: SPACING.space_15,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  linearGradient: {
    height: '70%',
  },
  bottomLeft: {position: 'absolute', bottom: -40, left: -40},
  bottomRight: {position: 'absolute', bottom: -40, right: -40},
  topLeft: {position: 'absolute', top: -40, left: -40},
  topRight: {position: 'absolute', top: -40, right: -40},
  linear: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  ticketFooter: {
    backgroundColor: COLORS.Orange,
    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  dateTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  subtitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  iconSubtitle: {
    marginBottom: -7,
  },
  subheading: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    paddingBottom: 13,
    marginTop: -2,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
  },
});
