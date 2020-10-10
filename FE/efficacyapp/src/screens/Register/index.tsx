import React from 'react';
import {StyleSheet, Dimensions, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {ActivityIndicator} from 'react-native-paper';
import RegisterUser from './RegisterUser';
import RegisterEO from './RegisterEO';

const initialLayout = {width: Dimensions.get('window').width};

function LazyTab() {
  return <ActivityIndicator />;
}

function Register() {
  // Props
  const navigation = useNavigation();
  // State
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const renderScene = SceneMap({
    first: () => <RegisterUser sendData={(data) => onRegister(data)} />,
    second: () => <RegisterEO sendData={(data) => onRegister(data)} />,
  });

  const onRegister = (data: any) => {
    Alert.alert('Alert', JSON.stringify(data));
    // navigation.navigate('LoginScreen');
  };

  return (
    <TabView
      lazy
      renderLazyPlaceholder={LazyTab}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
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
