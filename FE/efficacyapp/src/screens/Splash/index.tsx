import React from 'react';
import {View, Text, StyleSheet, Button, Alert, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

function Splash() {
  // Props
  const navigation = useNavigation();
  const {control, handleSubmit, errors} = useForm();

  // Function
  const onGoLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const onSubmit = (data: any) => {
    Alert.alert('alert', JSON.stringify(data));
    setTimeout(() => {
      onGoLogin();
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text>Splash Screen</Text>
      <Controller
        control={control}
        name="email"
        rules={{required: true}}
        defaultValue=""
        render={({onChange, onBlur, value}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
      />
      {errors.email && <Text>Error coek</Text>}
      <Button onPress={handleSubmit(onSubmit)} title="HOME" />
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
