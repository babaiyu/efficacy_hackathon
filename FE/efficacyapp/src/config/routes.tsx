import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
import {myColors} from 'constants/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DashBoard() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveBackgroundColor: myColors.red,
        activeBackgroundColor: myColors.backgroundWhite,
        activeTintColor: myColors.red,
        inactiveTintColor: myColors.white,
        showLabel: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="bookmark-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account-circle" color={color} size={size} />
          ),
        }}
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
            <Stack.Screen
              name="Dashboard"
              component={DashBoard}
              options={{headerShown: false}}
            />
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
