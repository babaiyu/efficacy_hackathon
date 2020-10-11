import React from 'react';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import {Button, Divider, IconButton, Text} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {myColors} from 'constants/colors';
import {fonts} from 'constants/fonts';
import {TextInputPassword} from 'components';

type Props = {
  sendData: (data: any) => void;
  onRegister: () => void;
  isError: boolean;
  isLoading: boolean;
};
function LoginForm(props: Props) {
  // Props
  const {control, handleSubmit, errors} = useForm();

  // Function
  const onLogin = (data: any) => {
    props.sendData(data);
  };

  const onRegister = () => {
    props.onRegister();
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('assets/image/logo_pink.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Controller
          control={control}
          name="identifier"
          rules={{required: true}}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              value={value}
              autoCapitalize="none"
              style={[styles.formInput, errors.identifier && styles.formError]}
              placeholder="Username"
            />
          )}
        />
        <Divider />

        <Controller
          control={control}
          name="password"
          rules={{required: true, minLength: 6, maxLength: 12}}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInputPassword
              value={value}
              placeholder="Password"
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              style={[styles.formInput, errors.password && styles.formError]}
            />
          )}
        />
        <Button
          style={styles.button}
          color={myColors.red}
          mode="contained"
          loading={props.isLoading}
          onPress={handleSubmit(onLogin)}>
          Login
        </Button>

        {props.isError && (
          <View style={[styles.row, {justifyContent: 'flex-start'}]}>
            <IconButton icon="alert-circle" color={myColors.red} size={20} />
            <Text style={styles.textWhite}>Please check your credentials</Text>
          </View>
        )}
      </View>

      <View>
        <Button
          uppercase={false}
          style={styles.buttonRounded}
          onPress={() => null}>
          Forgot Password
        </Button>
        <Button
          uppercase={false}
          style={styles.buttonRounded}
          onPress={onRegister}>
          Create an Account
        </Button>
      </View>
    </View>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: myColors.backgroundWhite,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formInput: {
    borderRadius: 20,
    backgroundColor: myColors.white,
    color: myColors.dark,
    textDecorationColor: myColors.dark,
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: myColors.white,
  },
  formError: {
    borderWidth: 1,
    borderColor: myColors.red,
  },
  content: {
    width: '70%',
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  button: {
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 20,
  },
  buttonRounded: {
    borderRadius: 20,
  },
  textWhite: {
    color: myColors.dark,
  },
});
