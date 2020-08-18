import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import CryptoJS from 'react-native-crypto-js';
import {DECRYPT_KEY} from './../../configs/Constants';
import {decryptText} from './../../utilities/EncryptionUtilities';
import {Button, TextInput, Paragraph, Dialog, Portal} from 'react-native-paper';
import CustomModal from './../../components/CustomModal/CustomModal';
import AppLayout from './../../AppLayout/AppLayout';
import CustomListItem from './../../components/CustomListItem/CustomListItem';
import {
  getAllTasks,
  addTasks,
  deleteTasks,
  editTasks,
} from './../../actions/tasks';
import CustomFab from './../../components/Customfab/CustomFab';
export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: '',
      description: '',
      editVisible: false,
      isCompleted: false,
      isArchieved: false,
      tasks: [],
      isRefreshing: false,
      loading: false,
      editId: null,
      infoVisible: false,
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.initialLoad = this.initialLoad.bind(this);
    this.loadTasks = this.loadTasks.bind(this);
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
    this.archieve = this.archieve.bind(this);
    this.complete = this.complete.bind(this);
  }

  componentDidMount = () => {
    let ciphertext = CryptoJS.AES.encrypt('my message', DECRYPT_KEY).toString();
    console.log(ciphertext);
    // Decrypt
    let originalText = decryptText(ciphertext);
    console.log(originalText);
    this.initialLoad();
    this.props.navigation.addListener('focus', () => {
      this.initialLoad();
    });
  };

  initialLoad = () => {
    this.loadTasks();
  };

  loadTasks = () => {
    this.showRefresh();
    return new Promise((resolve, reject) => {
      getAllTasks()
        .then((json) => {
          if (json) {
            resolve(json.data);
            console.log('json data', json.data);
            this.setState({
              tasks: json.data,
            });
          } else {
            this.setState({
              tasks: [],
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
      description: decryptText(description),
      isArchieved,
      isCompleted,
      editId: id,
    });
    this.showInfo();
  };

  addTask = () => {
    let body = {
      title: CryptoJS.AES.encrypt(this.state.title, DECRYPT_KEY).toString(),
      description: CryptoJS.AES.encrypt(this.state.description, DECRYPT_KEY).toString(),
    };
    this.setState({
      loading: true,
    });
    return new Promise((resolve, reject) => {
      addTasks(body)
        .then((json) => {
          if (json) {
            resolve(json.data);
          }
        })
        .finally(() => {
          this.setState({
            loading: false,
            title: '',
            description: '',
          });
          this.hideModal();
          this.initialLoad();
          resolve();
        });
    });
  };

  delete = (taskId) => {
    return new Promise((resolve, reject) => {
      deleteTasks(taskId)
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
      description: decryptText(description),
      editId: id,
    });
  };

  editTask = () => {
    let body = {
      title: CryptoJS.AES.encrypt(this.state.title, DECRYPT_KEY).toString(),
      description: CryptoJS.AES.encrypt(this.state.description, DECRYPT_KEY).toString(),
    };
    console.log('body to edit', body);
    this.setState({
      editloading: true,
    });
    return new Promise((resolve, reject) => {
      editTasks(this.state.editId, body)
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
            description: '',
          });
          this.hideeditModal();
          this.initialLoad();
          resolve();
        });
    });
  };

  archieve = (id, isCompleted, isArchieved) => {
    let body = {
      isCompleted: !!isCompleted,
      isArchieved: !isArchieved,
    };
    return new Promise((resolve, reject) => {
      editTasks(id, body)
        .then((json) => {
          if (json) {
            resolve(json);
          }
        })
        .catch((err) => {
          reject();
        })
        .finally(() => {
          this.initialLoad();
          resolve();
        });
    });
  };

  complete = () => {
    let body = {
      isCompleted: !this.state.isCompleted,
      isArchieved: !!this.state.isArchieved,
    };
    return new Promise((resolve, reject) => {
      editTasks(this.state.editId, body)
        .then((json) => {
          if (json) {
            resolve(json);
          }
        })
        .catch((err) => {
          reject();
        })
        .finally(() => {
          this.hideInfo();
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
      description: '',
      visible: true,
    });
  };

  hideeditModal = () => {
    this.setState({
      editVisible: false,
      title: '',
      description: ''
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

  Item = ({id, title, isCompleted, isArchieved, description}) => {
    return (
      <CustomListItem
        id={id}
        title={title}
        isCompleted={isCompleted}
        isArchieved={isArchieved}
        description={description}
        listItemContainerStyle={{backgroundColor: '#ffff'}}
        titleContainerStyle={styles.titleContainerStyle}
        deleteVisible={true}
        editVisible={true}
        archieveVisible={true}
        onSelect={this.onSelect}
        archieve={this.archieve}
        edit={this.edit}
        delete={this.delete}
      />
    );
  };

  render() {
    return (
      <AppLayout navigation={this.props.navigation} title="Tasks">
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
            />
          }
          style={{marginTop: 20}}
          data={this.state.tasks}
          renderItem={({item, index}) => {
            return this.Item({
              id: item.task_id,
              title: item.title,
              isCompleted: item.isCompleted,
              isArchieved: item.isArchieved,
              description: item.description,
            });
          }}
          keyExtractor={(item) => item.task_id.toString()}
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
              value={this.state.description}
              style={styles.textView}
              theme={{
                colors: {
                  primary: '#1C7CC2',
                  underlineColor: 'transparent',
                },
              }}
              mode={'outlined'}
              label={'Description'}
              keyboardType={'default'}
              onChangeText={(description) => this.setState({description})}
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
              value={this.state.description}
              style={styles.textView}
              theme={{
                colors: {
                  primary: '#1C7CC2',
                  underlineColor: 'transparent',
                },
              }}
              mode={'outlined'}
              label={'Description'}
              keyboardType={'default'}
              onChangeText={(description) => this.setState({description})}
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
                <Paragraph>{this.state.description}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button color="#1C7CC2" onPress={this.complete}>
                  {'Mark as complete'}
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
