import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

function Shop() {
  return (
    <View style={styles.container}>
      <Text>Shop</Text>
    </View>
  );
}

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
