import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

export default class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => {
            this.props.navigation.toggleDrawer();
          }}>
          <Icon name={'bars'} size={25} color={'#646464'} style={styles.Icon} />
        </TouchableOpacity>
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        {this.props.children}
      </View>
      </View>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

AppLayout.DefaultProps = {
  title: 'Title',
};

const styles = StyleSheet.create({
  toggleButton: {
    backgroundColor: '#F1F1F1',
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: -50,
    borderRadius: 25,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon: {
    marginBottom: 5,
  },
  title: {
    fontSize: 25,
    margin: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
  },
});
