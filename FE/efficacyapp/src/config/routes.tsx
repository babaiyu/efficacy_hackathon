import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

import {
  HomeScreen,
  SplashScreen,
  LoginScreen,
  RegisterScreen,
  OrderScreen,
  ProfileScreen,
  ShopScreen,
} from 'screens';
import {AppState} from 'storage/reducers';
import {CustomTheme} from './combineTheme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DashBoard() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{title: 'Orders'}}
      />
      <Tab.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{title: 'Shop'}}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
}

function Routes() {
  const userState = useSelector((state: AppState) => state.user);

  return (
    <NavigationContainer theme={CustomTheme}>
      <Stack.Navigator
        screenOptions={() => ({...TransitionPresets.SlideFromRightIOS})}>
        {userState.isLogin ? (
          <>
            <Stack.Screen name="Dashboard" component={DashBoard} />
          </>
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
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
