/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {getAuthToken} from './src/actions/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Login,
  Signup,
  ArchievedTasks,
  CompletedTasks,
  Keystore,
  Tasks,
} from './src/screens';
import DrawerContent from "./src/components/DrawerContent/DrawerContent"
import Splash from './src/screens/Splash/Splash';
import Home from './src/screens/Auth/Home';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeNav = () => {
  return (
    <Drawer.Navigator drawerContent = { props => <DrawerContent {...props} />} initialRouteName="Tasks">
      <Drawer.Screen component={Tasks} name="Tasks" />
      <Drawer.Screen component={ArchievedTasks} name="ArchievedTasks" />
      <Drawer.Screen component={CompletedTasks} name="CompletedTasks" />
      <Drawer.Screen component={Keystore} name="Keystore" />
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={HomeNav} />
    </Stack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
