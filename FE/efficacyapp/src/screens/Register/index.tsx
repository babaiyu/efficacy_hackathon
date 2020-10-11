import {useNavigation} from '@react-navigation/native';
import {apiRegister} from 'api';
import React from 'react';
import {Alert} from 'react-native';
import RegisterForm from './RegisterForm';

function Register() {
  // Props
  const navigation = useNavigation();

  // Function
  const onRegister = (data: any) => {
    apiRegister(data)
      .then((res) => {
        if (!res.success) {
          Alert.alert('Alert', res.message);
        } else {
          Alert.alert('Alert', 'Success Login');
        }
      })
      .catch((err) => {
        Alert.alert('Alert', err.message);
      });
  };

  const onLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <RegisterForm
      onLogin={onLogin}
      sendData={(data: any) => onRegister(data)}
    />
  );
}

export default Register;
