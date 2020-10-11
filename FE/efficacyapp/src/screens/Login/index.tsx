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

  // Function
  const onLogin = (data: any) => {
    apiLogin(data)
      .then((res) => {
        if (!res.success) {
          setIsError(true);
        } else {
          const result = {
            data: res?.user,
            token: res?.token,
          };
          Alert.alert('Alert', 'Success Login');
          dispatch(actionIsLogin(result));
        }
      })
      .catch((err) => {
        setIsError(true);
        Alert.alert('Alert', err);
      });
  };

  const onRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <LoginForm
      isError={isError}
      sendData={(data) => onLogin(data)}
      onRegister={onRegister}
    />
  );
}

export default Login;
