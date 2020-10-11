import React from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
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

  return (
    <ImageBackground
      source={require('assets/image/background_splash.png')}
      resizeMode="cover"
      style={styles.container}>
      <View>
        <Image
          source={require('assets/image/logo_pink.png')}
          style={styles.logo}
          resizeMode="contain"
        />
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
    </ImageBackground>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 150,
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
