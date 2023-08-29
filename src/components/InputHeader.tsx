import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme';
import {useRoute, useNavigation} from '@react-navigation/native';
import {TabScreenProps} from '../types/navigation/types';
import CustomIcon from './CustomIcon';

const InputHeader = () => {
  const nav = useNavigation();
  const route = useRoute<TabScreenProps<'Search'>['route']>();
  const q = route.params?.search;

  const [search, setSearch] = useState('');

  const searchHandler = () => {
    if (!search) {
      return;
    }

    nav.navigate('Tab', {
      screen: 'Search',
      params: {search},
    });

    if (!q) {
      setSearch('');
    }
  };

  useEffect(() => {
    if (q) {
      setSearch(q);
    }
  }, [q]);

  return (
    <View style={styles.inputBox}>
      <TextInput
        value={search}
        style={styles.textInput}
        placeholder="Search your movie..."
        placeholderTextColor={'#fff9'}
        onChangeText={text => setSearch(text)}
      />
      <TouchableOpacity onPress={searchHandler}>
        <CustomIcon name="search" color={COLORS.Orange} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLORS.Orange,
    borderRadius: 1000,
  },
  textInput: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    flexGrow: 1,
    maxWidth: '90%',
  },
});
