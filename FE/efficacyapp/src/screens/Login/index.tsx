import React from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Button, Divider, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {actionIsLogin} from 'storage/user/action';

function Login() {
  // Props
  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm();

  // Function
  const onLogin = (data: any) => {
    dispatch(actionIsLogin(data));
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>
          <Controller
            control={control}
            name="email"
            rules={{required: true}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                label="Email"
                mode="outlined"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                error={errors.email}
                autoCapitalize="none"
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
                label="Password"
                mode="outlined"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                secureTextEntry={true}
                error={errors.password}
                autoCapitalize="none"
              />
            )}
          />
        </View>
        <Button
          style={styles.fullWidth}
          mode="contained"
          onPress={handleSubmit(onLogin)}>
          Login
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '95%',
    marginTop: 20,
  },
  fullWidth: {
    width: '95%',
    marginTop: 10,
    alignSelf: 'center',
  },
});
