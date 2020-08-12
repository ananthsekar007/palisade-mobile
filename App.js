/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Signup} from './src/screens';
import Splash from './src/screens/Splash/Splash';
import Home from './src/screens/Auth/Home';
const Stack = createStackNavigator();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Splash'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
