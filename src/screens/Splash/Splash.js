import React, {Component} from 'react';
import {View, Text, Image, StatusBar, StyleSheet, Dimensions} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import logo from './../../../assets/images/palisade.png';

const {height: HEIGHT} = Dimensions.get("screen")
export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <View style={styles.background}>
        <StatusBar
          backgroundColor={'#F1F1F1'}
          barStyle={('default', 'dark-content')}
        />
        <View style={styles.container}>
          <Image source={logo} style={styles.logo}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
      flex: 1,
    backgroundColor: '#F1F1F1',
  },
  container: {
    marginTop: HEIGHT / 4,
  },
  logo: {
      alignSelf: 'center',
  }
});
