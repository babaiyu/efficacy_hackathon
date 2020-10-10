import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {actionIsLogin} from 'storage/user/action';

function Home() {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(actionIsLogin(false));
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
