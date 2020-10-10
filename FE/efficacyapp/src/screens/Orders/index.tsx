import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

function Orders() {
  return (
    <View style={styles.container}>
      <Text>Orders</Text>
    </View>
  );
}

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
