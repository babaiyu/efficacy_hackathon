import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {actionIsLogin} from 'storage/user/action';

function Login() {
  const dispatch = useDispatch();
  const onLogin = () => {
    dispatch(actionIsLogin(true));
  };
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button mode="contained" onPress={onLogin}>
        Login
      </Button>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
