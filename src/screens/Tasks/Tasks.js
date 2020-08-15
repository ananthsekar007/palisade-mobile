import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppLayout from "./../../AppLayout/AppLayout"

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <AppLayout
            navigation={this.props.navigation}
            title="Tasks"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
