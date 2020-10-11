import {myColors} from 'constants/colors';
import {fonts} from 'constants/fonts';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

function SearchHome() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.formInput} placeholder="Search..." />
    </View>
  );
}

export default SearchHome;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 20,
  },
  formInput: {
    borderRadius: 25,
    backgroundColor: myColors.white,
    color: myColors.dark,
    textDecorationColor: myColors.dark,
    fontFamily: fonts.medium,
    textAlign: 'left',
    paddingLeft: 20,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: myColors.white,
  },
});
