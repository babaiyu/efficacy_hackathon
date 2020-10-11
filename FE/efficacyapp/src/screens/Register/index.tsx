import {useNavigation} from '@react-navigation/native';
import React from 'react';
import RegisterForm from './RegisterForm';

function Register() {
  // Props
  const navigation = useNavigation();
  // Function
  const onRegister = (data: any) => {
    console.log(data);
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
