import {myColors} from 'constants/colors';
import {fonts} from 'constants/fonts';
import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import ListItem from './ListItem';

function Shop() {
  // State
  const [data, setData] = React.useState([1, 2, 3, 4, 5]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput style={styles.formInput} placeholder="Search..." />
        <ListItem data={data} />
      </View>
    </View>
  );
}

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    width: '90%',
    marginTop: 20,
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
