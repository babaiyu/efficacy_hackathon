import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Button, Divider, Text} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {myColors} from 'constants/colors';
import {fonts} from 'constants/fonts';

type Props = {
  sendData: (data: any) => void;
  onRegister: () => void;
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
        <Text style={{color: myColors.dark}}>Logo</Text>
      </View>
      <View style={styles.content}>
        <Controller
          control={control}
          name="email"
          rules={{required: true}}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <TextInput
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.formInput}
              placeholder="Email"
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
            <TextInput
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              value={value}
              secureTextEntry={true}
              autoCapitalize="none"
              style={styles.formInput}
              placeholder="Password"
            />
          )}
        />
        <Button
          style={styles.button}
          color={myColors.red}
          mode="contained"
          onPress={handleSubmit(onLogin)}>
          Login
        </Button>
      </View>

      <View>
        <Button style={styles.buttonRounded} onPress={() => null}>
          Forgot Password
        </Button>
        <Button style={styles.buttonRounded} onPress={onRegister}>
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
  formInput: {
    borderRadius: 20,
    backgroundColor: myColors.white,
    color: myColors.dark,
    textDecorationColor: myColors.dark,
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginVertical: 5,
  },
  content: {
    width: '90%',
    marginTop: 20,
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
});
