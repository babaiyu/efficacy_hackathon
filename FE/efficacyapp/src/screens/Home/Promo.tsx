import {myColors} from 'constants/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

function PromoHome() {
  return (
    <View style={styles.card}>
      <Text>Discount Voucher UP TO 45%</Text>
    </View>
  );
}

export default PromoHome;

const styles = StyleSheet.create({
  card: {
    backgroundColor: myColors.white,
    width: '90%',
    height: 200,
    marginBottom: 100,
    borderRadius: 20,
    padding: 10,
  },
});
