import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Button, TextInput, Paragraph, Dialog, Portal} from 'react-native-paper';
import CustomModal from './../components/CustomModal/CustomModal';
import {decryptText} from "./../utilities/EncryptionUtilities"
import AppLayout from './../AppLayout/AppLayout';
import { DECRYPT_KEY } from "./../configs/Constants";
import CryptoJS from "react-native-crypto-js";
import CustomListItem from './../components/CustomListItem/CustomListItem';
import {
    addKeys,
    deleteKeys,
    editKeys,
    getAllKeys
} from './../actions/keystore';
import CustomFab from './../components/Customfab/CustomFab';
export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: '',
      content: '',
      editVisible: false,
      keys: [],
      isRefreshing: false,
      loading: false,
      editId: null,
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.initialLoad = this.initialLoad.bind(this);
    this.loadKeys = this.loadKeys.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.showRefresh = this.showRefresh.bind(this);
    this.hideRefresh = this.hideRefresh.bind(this);
    this.addTask = this.addTask.bind(this);
    this.delete = this.delete.bind(this);
    this.showeditModal = this.showeditModal.bind(this);
    this.hideeditModal = this.hideeditModal.bind(this);
    this.editTask = this.editTask.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.hideInfo = this.hideInfo.bind(this);
  }

  componentDidMount = () => {
    this.initialLoad();
    this.props.navigation.addListener('focus', () => {
      this.initialLoad();
    });
  };

  initialLoad = () => {
    this.loadKeys();
  };

  loadKeys = () => {
    this.showRefresh();
    return new Promise((resolve, reject) => {
      getAllKeys()
        .then((json) => {
          if (json) {
            resolve(json.data);
            console.log('json data', json.data);
            this.setState({
              keys: json.data,
            });
          } else {
            this.setState({
              keys: [],
            });
          }
        })
        .finally(() => {
          this.hideRefresh();
          resolve();
        });
    });
  };

  onSelect = (title, description, id, isCompleted, isArchieved) => {
    this.setState({
      title: decryptText(title),
      content: decryptText(description),
      editId: id,
    });
    this.showInfo();
  };

  addTask = () => {
    let body = {
      title: CryptoJS.AES.encrypt(this.state.title, DECRYPT_KEY).toString(),
      content: CryptoJS.AES.encrypt(this.state.content, DECRYPT_KEY).toString(),
    };
    console.log("keystore payload", body)
    this.setState({
      loading: true,
    });
    return new Promise((resolve, reject) => {
      addKeys(body)
        .then((json) => {
          if (json) {
            resolve(json.data);
          }
        })
        .finally(() => {
          this.setState({
            loading: false,
            title: '',
            content: '',
          });
          this.hideModal();
          this.initialLoad();
          resolve();
        });
    });
  };

  delete = (taskId) => {
    return new Promise((resolve, reject) => {
      deleteKeys(taskId)
        .then((json) => {
          if (json) {
            resolve(json);
          }
        })
        .finally(() => {
          this.initialLoad();
          resolve();
        });
    });
  };

  edit = (id, title, description) => {
    this.showeditModal();
    this.setState({
      title: decryptText(title),
      content: decryptText(description),
      editId: id,
    });
  };

  editTask = () => {
    let body = {
        title: CryptoJS.AES.encrypt(this.state.title, DECRYPT_KEY).toString(),
        content: CryptoJS.AES.encrypt(this.state.content, DECRYPT_KEY).toString(),
    };
    console.log('body to edit', body);
    this.setState({
      editloading: true,
    });
    return new Promise((resolve, reject) => {
      editKeys(this.state.editId, body)
        .then((json) => {
          if (json) {
            resolve(json);
          }
        })
        .catch((err) => {
          reject();
        })
        .finally(() => {
          this.setState({
            editloading: false,
            title: '',
            content: ''
          });
          this.hideeditModal();
          this.initialLoad();
          resolve();
        });
    });
  };

  onRefresh = () => {
    this.initialLoad();
  };

  hideRefresh = () => {
    this.setState({
      isRefreshing: false,
    });
  };

  showRefresh = () => {
    this.setState({
      isRefreshing: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  showModal = () => {
    this.setState({
      title: '',
      descripiton: '',
      visible: true,
    });
  };

  hideeditModal = () => {
    this.setState({
      editVisible: false,
    });
  };

  showeditModal = () => {
    this.setState({
      editVisible: true,
    });
  };

  showInfo = () => {
    this.setState({
      infoVisible: true,
    });
  };

  hideInfo = () => {
    this.setState({
      infoVisible: false,
    });
  };

  Item = ({id, title, description}) => {
    return (
      <CustomListItem
        id={id}
        title={title}
        isSubtitle={true}
        subtitle={description}
        description={description}
        listItemContainerStyle={{backgroundColor: '#ffff'}}
        titleContainerStyle={styles.titleContainerStyle}
        deleteVisible={true}
        editVisible={true}
        onSelect={this.onSelect}
        edit={this.edit}
        delete={this.delete}
      />
    );
  };

  render() {
    return (
      <AppLayout navigation={this.props.navigation} title="Key Store">
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
            />
          }
          style={{marginTop: 20}}
          data={this.state.keys}
          renderItem={({item, index}) => {
            return this.Item({
              id: item.keystore_id,
              title: item.title,
              description: item.content,
            });
          }}
          keyExtractor={(item) => item.keystore_id.toString()}
        />
        <CustomModal
          visible={this.state.visible}
          header="Add Task"
          hideModal={this.hideModal}>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.title}
              style={styles.textView}
              theme={{
                colors: {
                  primary: '#1C7CC2',
                  underlineColor: 'transparent',
                },
              }}
              mode={'outlined'}
              label={'Title'}
              keyboardType={'default'}
              onChangeText={(title) => this.setState({title})}
            />

            <TextInput
              value={this.state.content}
              style={styles.textView}
              theme={{
                colors: {
                  primary: '#1C7CC2',
                  underlineColor: 'transparent',
                },
              }}
              mode={'outlined'}
              label={'Content'}
              keyboardType={'default'}
              onChangeText={(content) => this.setState({content})}
            />
            <Button
              style={styles.button}
              color={'#1C7CC2'}
              mode={'contained'}
              onPress={this.addTask}
              loading={this.state.loading}
              disabled={this.state.loading}>
              Add
            </Button>
          </View>
        </CustomModal>
        <CustomModal
          visible={this.state.editVisible}
          header="Edit Task"
          hideModal={this.hideeditModal}>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.title}
              style={styles.textView}
              theme={{
                colors: {
                  primary: '#1C7CC2',
                  underlineColor: 'transparent',
                },
              }}
              mode={'outlined'}
              label={'Title'}
              keyboardType={'default'}
              onChangeText={(title) => this.setState({title})}
            />

            <TextInput
              value={this.state.content}
              style={styles.textView}
              theme={{
                colors: {
                  primary: '#1C7CC2',
                  underlineColor: 'transparent',
                },
              }}
              mode={'outlined'}
              label={'Content'}
              keyboardType={'default'}
              onChangeText={(content) => this.setState({content})}
            />
            <Button
              style={styles.button}
              color={'#1C7CC2'}
              mode={'contained'}
              onPress={this.editTask}
              loading={this.state.editloading}
              disabled={this.state.editloading}>
              Edit
            </Button>
          </View>
        </CustomModal>
        <View>
          <Portal>
            <Dialog visible={this.state.infoVisible} onDismiss={this.hideInfo}>
              <Dialog.Title>{'Task Title'}</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{this.state.title}</Paragraph>
              </Dialog.Content>
              <Dialog.Title>{'Description'}</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{this.state.content}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button color="#1C7CC2" onPress={this.copyContent}>
                  {'Copy Content'}
                </Button>
                <Button color="#1C7CC2" onPress={this.hideInfo}>
                  {'Cancel'}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <CustomFab iconName={'plus'} onPress={this.showModal} />
      </AppLayout>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30,
    margin: 10,
  },
  textView: {
    marginBottom: 20,
  },
  button: {
    margin: 30,
    borderRadius: 20,
  },
});
