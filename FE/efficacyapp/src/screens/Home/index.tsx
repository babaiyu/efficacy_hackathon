import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {actionIsLogout} from 'storage/user/action';

function Home() {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(actionIsLogout());
  };
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={onLogout}>
        Log Out
      </Button>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
