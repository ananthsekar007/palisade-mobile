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
import Splash from './src/screens/Splash/Splash';
import Home from './src/screens/Auth/Home';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator>
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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Tasks" component={DrawerNav} />
    </Stack.Navigator>
  );
};
const App = () => {
  const [isLoading, setisLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      let token = getAuthToken();
      if (token) {
        setUser(token);
      }
      setisLoading(false);
    }, 2000);
  });
  return (
    <NavigationContainer>
      {isLoading ? <Splash /> : user === null ? <DrawerNav /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
