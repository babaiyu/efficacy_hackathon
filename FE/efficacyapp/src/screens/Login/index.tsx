import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {actionIsLogin} from 'storage/user/action';
import LoginForm from './Login';

function Login() {
  // Props
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Function
  const onLogin = (data: any) => {
    console.log('LOGIN DATA', data);
    dispatch(actionIsLogin(data));
  };

  const onRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <LoginForm sendData={(data) => onLogin(data)} onRegister={onRegister} />
  );
}

export default Login;
