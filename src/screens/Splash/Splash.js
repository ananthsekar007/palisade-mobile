import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {CommonActions} from '@react-navigation/native';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Login'}],
          }),
        );
        this.props.navigation.navigate('Login');
        this.setState({
          isLoading: false,
        });
      }, 2000);
  }

  render() {
    return (
      <View>
        <Text> Splash </Text>
      </View>
    );
  }
}
