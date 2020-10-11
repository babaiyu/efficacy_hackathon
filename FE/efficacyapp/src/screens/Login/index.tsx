import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {actionIsLogin} from 'storage/user/action';
import LoginForm from './Login';
import {apiLogin} from 'api';
import {Alert} from 'react-native';

function Login() {
  // Props
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Function
  const onLogin = (data: any) => {
    setIsLoading(true);
    apiLogin(data)
      .then((res) => {
        if (!res.success) {
          setIsError(true);
          setIsLoading(false);
        } else {
          const result = {
            data: res?.user,
            token: res?.token,
          };
          setIsLoading(false);
          setTimeout(() => {
            dispatch(actionIsLogin(result));
          }, 100);
        }
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        Alert.alert('Alert', err);
      });
  };

  const onRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <LoginForm
      isLoading={isLoading}
      isError={isError}
      sendData={(data) => onLogin(data)}
      onRegister={onRegister}
    />
  );
}

export default Login;
