import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
