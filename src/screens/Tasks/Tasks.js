import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import CustomModal from "./../../components/CustomModal/CustomModal";
import AppLayout from './../../AppLayout/AppLayout';
import CustomFab from './../../components/Customfab/CustomFab';
export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible: false
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  hideModal = () => {
    this.setState({
        visible: false
    })
  }

  showModal = () => {
    this.setState({
        visible: true
    })
  }

  render() {
    return (
        <AppLayout navigation={this.props.navigation} title="Tasks">
          <CustomModal visible={this.state.visible} header="Add Task" hideModal={this.hideModal}>
          </CustomModal>
          <CustomFab iconName={'plus'} onPress={this.showModal} />
        </AppLayout>
    );
  }
}

const styles = StyleSheet.create({});
