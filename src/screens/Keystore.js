import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppLayout from "./../AppLayout/AppLayout";
import CustomFab from "./../components/Customfab/CustomFab"
export default class Keystore extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <AppLayout navigation={this.props.navigation} title="Key Store">
        <CustomFab iconName={'plus'} />
      </AppLayout>
    );
  }
}
