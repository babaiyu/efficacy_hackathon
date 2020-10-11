import {myColors} from 'constants/colors';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

function PromoHome() {
  return (
    <View style={[styles.card, styles.row]}>
      <Image
        source={require('assets/image/promo.png')}
        resizeMode="contain"
        style={styles.imagePromo}
      />
      <Image
        source={require('assets/image/meong.png')}
        resizeMode="contain"
        style={styles.imagePromo}
      />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imagePromo: {
    width: 150,
    height: 250,
  },
});
