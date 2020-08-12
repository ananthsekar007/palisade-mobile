/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppContainer from './src/screens/Navigation/AppContainer';
import AuthNavigation from './src/screens/Navigation/AuthNavigation';



class App extends React.Component {
    render() {
        return (
            <AuthNavigation/>
        )
    }
}



export default App;
