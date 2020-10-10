import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

function Profile() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
