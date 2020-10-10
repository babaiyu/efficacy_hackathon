import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {HomeScreen, SplashScreen, LoginScreen, RegisterScreen} from 'screens';
import {AppState} from 'storage/reducers';

const Stack = createStackNavigator();

function Routes() {
  const userState = useSelector((state: AppState) => state.user);

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        screenOptions={() => ({
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        })}>
        {userState.isLogin ? (
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: true,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                animationTypeForReplace: !userState.isLogin ? 'pop' : 'push',
              }}
            />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
