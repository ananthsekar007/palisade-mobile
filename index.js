/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {SnackProvider} from 'react-native-snackbar-reddit';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const FullApp = () => {
  return (
    <PaperProvider theme={theme}>
      <SnackProvider>
        <App />
      </SnackProvider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => FullApp);
