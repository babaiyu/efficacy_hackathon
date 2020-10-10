import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

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
    <View style={styles.container}>
      <Button onPress={onGoLogin} mode="contained" style={styles.fullWidth}>
        Login
      </Button>
      <Button onPress={onGoRegister} mode="outlined" style={styles.fullWidth}>
        Register
      </Button>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '95%',
    marginBottom: 10,
  },
});
