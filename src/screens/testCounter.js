import React from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {Button} from 'react-native-paper';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

class TestCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  increase = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  decrease = () => {
    if (this.state.count == 0) {
        Alert.alert('cannot decrease')
    } else {
      this.setState({
        count: this.state.count - 1,
      });
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.count}>{this.state.count}</Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={this.increase}>
            Increase
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            onPress={this.decrease}>
            Decrease
          </Button>
        </View>
      </View>
    );
  }
}

export default TestCounter;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 150,
  },
  button: {
    marginBottom: 30,
    width: WIDTH - 150,
    alignSelf: 'center',
    borderRadius: 20
  },
  count: {
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
