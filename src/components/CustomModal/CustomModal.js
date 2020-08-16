import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View, StyleSheet } from 'react-native';
import {Modal, Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

class CustomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  hideModal = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        contentContainerStyle={{...styles.contentContainerStyle}}>
        <View style={{...styles.container}}>
          <ScrollView>
          <View
          style={{
            ...styles.headerContainer,
            ...this.props.headerContainerStyle,
          }}>
          <View>
            <Text
              style={{...styles.headerText, ...this.props.headerTextStyle}}>
              {this.props.header}
            </Text>
          </View>
          <View>
            <Icon
              name={'times'}
              size={25}
              color={'red'}
              style={{...styles.iconStyle}}
              onPress={this.hideModal}
              iconContainerStyle={{...styles.iconContainerStyle}}
            />
          </View>
          </View>
            {this.props.children}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

CustomModal.propTypes = {
  children: PropTypes.any,
  header: PropTypes.string,
  headerContainerStyle: PropTypes.any,
  headerTextStyle: PropTypes.any,
  hideModal: PropTypes.func,
  visible: PropTypes.bool
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    justifyContent: 'flex-start',
    flex: 1,
    marginTop: 80,
    marginBottom: 15,
  },
  container: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  iconContainerStyle: {
    alignItems: 'flex-end',
  },
  iconStyle: {
      justifyContent: 'flex-end',
      alignSelf: "flex-end",
      marginTop: -30,
  },
  scrollViewStyle: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default CustomModal;
