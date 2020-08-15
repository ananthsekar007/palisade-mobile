import PropTypes from "prop-types";
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FAB } from "react-native-paper";

const {height: HEIGHT} = Dimensions.get("screen")

class CustomFab extends Component {
    constructor(props) {
      super(props);
      this.state = {};

      this.onPress = this.onPress.bind(this);
    }

    onPress = () => {
      this.props.onPress();
    };

    render() {
      return (
        <FAB
          style={{...styles.fab, ...this.props.style}}
          small={this.props.small}
          visible={true}
          icon={this.props.iconName}
          onPress={this.onPress}
          color={this.props.labelColor}

        />
      );
    }
  }

CustomFab.propTypes = {
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  onPress: PropTypes.func,
  small: PropTypes.bool,
  style: PropTypes.any,
  visible: PropTypes.bool
}

  const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: -(HEIGHT - 150),
        backgroundColor: '#1C7CC2',
        elevation: 10
    },
  });

  export default CustomFab;
