import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppLayout from "./../AppLayout/AppLayout"
export default class Keystore extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
      <AppLayout navigation={this.props.navigation} title="Key Store" />
      </View>
    );
  }
}
