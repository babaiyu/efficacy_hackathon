import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {Text, Divider, Button, Title} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {myColors} from 'constants/colors';
import {fonts} from 'constants/fonts';
import {TextInputPassword} from 'components';

type Props = {
  sendData: (data: any) => void;
  onLogin: () => void;
};
function RegisterForm(props: Props) {
  // Props
  const {control, handleSubmit, errors, getValues} = useForm();

  const [role, setRole] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const buttonIsActive = (num: number) =>
    role === num ? styles.buttonRadiusActive : styles.buttonRadiusNonActive;

  const colorButtonIsActive = (num: number) =>
    role === num ? myColors.white : myColors.dark;

  // Function
  const onSelectRole = (num: number) => {
    setRole(num);
  };

  const onLogin = () => {
    props.onLogin();
  };

  const onRegister = (data: any) => {
    let payload = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      role_id: role,
    };

    const viewer = {
      age: parseInt(data.age),
    };
    const organizer = {
      organization: data.organization,
    };

    let result = Object.assign(payload, role === 1 ? viewer : organizer);

    setTimeout(() => {
      props.sendData(result);
    }, 100);
  };

  // Render
  return (
    <ScrollView style={{backgroundColor: myColors.backgroundWhite}}>
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <Image
            source={require('assets/image/logo_pink.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.content}>
          <Title style={styles.textDark}>Who are you?</Title>
          <View style={styles.row}>
            <Button
              uppercase={false}
              onPress={() => onSelectRole(1)}
              style={buttonIsActive(1)}
              color={colorButtonIsActive(1)}>
              Viewer
            </Button>
            <Button
              uppercase={false}
              onPress={() => onSelectRole(2)}
              style={buttonIsActive(2)}
              color={colorButtonIsActive(2)}>
              Organizer
            </Button>
          </View>
          <Controller
            control={control}
            name="name"
            rules={{required: true}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                autoCapitalize="words"
                style={[styles.formInput, errors.name && styles.formError]}
                placeholder="Full Name"
              />
            )}
          />
          <Divider />

          <Controller
            control={control}
            name="username"
            rules={{required: true}}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInput
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
                autoCapitalize="none"
                style={[styles.formInput, errors.username && styles.formError]}
                placeholder="Username"
              />
            )}
          />
          <Divider />

          {role === 2 && (
            <Controller
              control={control}
              name="organization"
              rules={{required: true}}
              defaultValue=""
              render={({onChange, onBlur, value}) => (
                <TextInput
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize="words"
                  style={[
                    styles.formInput,
                    errors.organization && styles.formError,
                  ]}
                  placeholder="Organization Name"
                />
              )}
            />
          )}
          <Divider />

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
                autoCapitalize="none"
                style={[styles.formInput, errors.email && styles.formError]}
                keyboardType="email-address"
                placeholder="Email"
              />
            )}
          />
          <Divider />

          {role === 1 && (
            <Controller
              control={control}
              name="age"
              rules={{required: true}}
              defaultValue=""
              render={({onChange, onBlur, value}) => (
                <TextInput
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="number-pad"
                  style={[styles.formInput, errors.age && styles.formError]}
                  placeholder="Age"
                />
              )}
            />
          )}
          <Divider />

          <Controller
            control={control}
            name="password"
            rules={{required: true}}
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
          <Divider />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: true,
              validate: (value) => value === getValues('password'),
            }}
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <TextInputPassword
                value={value}
                placeholder="Confirm Password"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                style={[
                  styles.formInput,
                  errors.confirmPassword && styles.formError,
                ]}
              />
            )}
          />
          <Divider />

          <Button
            disabled={loading}
            loading={loading}
            onPress={handleSubmit(onRegister)}
            color={myColors.white}
            style={styles.buttonRegister}>
            Register
          </Button>

          <Button
            onPress={onLogin}
            uppercase={false}
            style={[
              styles.buttonRadiusNonActive,
              {width: '100%', marginVertical: 10},
            ]}>
            I already have an account
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: myColors.backgroundWhite,
  },
  content: {
    width: '70%',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  textDark: {
    color: myColors.dark,
    fontFamily: fonts.bold,
  },
  buttonRadiusActive: {
    backgroundColor: myColors.red,
    borderRadius: 20,
    width: '47.5%',
    marginBottom: 10,
  },
  buttonRadiusNonActive: {
    borderRadius: 20,
    width: '47.5%',
    marginBottom: 10,
  },
  buttonRegister: {
    borderRadius: 20,
    width: '100%',
    marginTop: 10,
    backgroundColor: myColors.red,
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
});
