import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import {HomeScreen, SplashScreen, LoginScreen} from 'screens';
import {AppState} from 'storage/reducers';

const Stack = createStackNavigator();

function Routes() {
  const userState = useSelector((state: AppState) => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        })}>
        {userState.isLogin ? (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                animationTypeForReplace: !userState.isLogin ? 'pop' : 'push',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
