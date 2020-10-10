import React from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Button, Divider, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

type Props = {
  sendData: (data: any) => void;
};
function RegisterEO(props: Props) {
  // Props
  const {control, handleSubmit, errors} = useForm();

  // Function
  const onRegister = (data: any) => {
    props.sendData(data);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>
          <Controller
            control={control}
            name="fullname"
            rules={{required: true}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                label="Nama"
                mode="outlined"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                error={errors.fullname}
                autoCapitalize="words"
              />
            )}
          />
          <Divider />

          <Controller
            control={control}
            name="username"
            rules={{required: true, min: 13}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                label="Username"
                mode="outlined"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                autoCapitalize="none"
                error={errors.username}
                style={{flex: 2}}
              />
            )}
          />
          <Divider />

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
          <Divider />

          <Controller
            control={control}
            name="organization"
            rules={{required: true}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                label="Organization"
                mode="outlined"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                error={errors.organization}
                autoCapitalize="words"
              />
            )}
          />
          <Divider />
        </View>
        <Button
          style={styles.fullWidth}
          mode="contained"
          onPress={handleSubmit(onRegister)}>
          Register
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default RegisterEO;

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
