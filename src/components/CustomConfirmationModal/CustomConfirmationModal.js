import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

class CustomConfirmationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  confirm = () => {
    this.props.confirm();
    this.props.hideDialog();
  };

  hideDialog = () => {
    this.props.hideDialog();
  };

  render() {
    return (
      <View>
        <Portal>
          <Dialog visible={this.props.visible} onDismiss={this.hideDialog}>
            <Dialog.Title>{this.props.title}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{this.props.description}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button color="#1C7CC2" onPress={this.hideDialog}>{'Cancel'}</Button>
              <Button color="#1C7CC2" onPress={this.confirm}>{'Confirm'}</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

CustomConfirmationModal.propTypes = {
  confirm: PropTypes.func,
  description: PropTypes.string,
  hideDialog: PropTypes.func,
  title: PropTypes.string,
  visible: PropTypes.bool
}

export default CustomConfirmationModal;
