import React from 'react';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Button, Divider, TextInput, Menu} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

function Register() {
  // Props
  const navigation = useNavigation();
  const {control, handleSubmit, errors} = useForm();

  // State
  const [visible, setVisible] = React.useState(false);

  // Function
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onRegister = () => {
    navigation.navigate('LoginScreen');
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
                label="Nama Lengkap"
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

          <View style={styles.row}>
            <Controller
              control={control}
              name="umur"
              rules={{required: true, min: 13}}
              defaultValue=""
              render={({onChange, onBlur, value}) => (
                <TextInput
                  label="Umur"
                  mode="outlined"
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="number-pad"
                  error={errors.umur}
                  style={{flex: 2}}
                />
              )}
            />
            <Divider />

            <Controller
              control={control}
              name="role"
              rules={{required: true}}
              defaultValue=""
              render={({onChange, value}) => (
                <Menu
                  style={{flex: 1}}
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={<Button onPress={openMenu}>Role: {value}</Button>}>
                  <Menu.Item
                    onPress={() => {
                      onChange('user');
                      closeMenu();
                    }}
                    title="Penonton"
                  />
                  <Menu.Item
                    onPress={() => {
                      onChange('eo');
                      closeMenu();
                    }}
                    title="Event Organizer"
                  />
                </Menu>
              )}
            />
            <Divider />
          </View>

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
          onPress={handleSubmit(onRegister)}>
          Register
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
