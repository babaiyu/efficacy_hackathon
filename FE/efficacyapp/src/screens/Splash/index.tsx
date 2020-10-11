import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Text} from 'react-native-paper';
import {apiTest} from 'api';
import {myColors} from 'constants/colors';

function Splash() {
  // Props
  const navigation = useNavigation();

  // State
  const [] = React.useState();

  // Function
  const onGoLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const onGoRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const test = () => {
    apiTest()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // Life Cycle
  React.useEffect(() => {
    test();
  });

  return (
    <View style={styles.container}>
      <View>
        <Text>LOGO</Text>
      </View>
      <View style={styles.content}>
        <Button
          onPress={onGoLogin}
          color={myColors.red}
          mode="contained"
          style={styles.button}>
          Login
        </Button>
        <Button
          onPress={onGoRegister}
          color={myColors.white}
          mode="text"
          uppercase={false}
          style={styles.button}>
          Create an Account
        </Button>
      </View>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '75%',
    marginBottom: 10,
    borderRadius: 20,
  },
});
