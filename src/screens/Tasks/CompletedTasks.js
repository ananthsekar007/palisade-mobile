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
import CustomModal from './../../components/CustomModal/CustomModal';
import AppLayout from './../../AppLayout/AppLayout';
import CustomListItem from './../../components/CustomListItem/CustomListItem';
import {
  getCompletedTasks,
  deleteTasks
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
      deleteId: null,
      infoVisible: false,
    };
    this.initialLoad = this.initialLoad.bind(this);
    this.loadTasks = this.loadTasks.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.showRefresh = this.showRefresh.bind(this);
    this.hideRefresh = this.hideRefresh.bind(this);
    this.delete = this.delete.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.hideInfo = this.hideInfo.bind(this);
    this.modalDelete = this.modalDelete.bind(this);
  }

  componentDidMount = () => {
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
        getCompletedTasks()
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
      title,
      description,
      isArchieved,
      isCompleted,
      deleteId: id,
    });
    this.showInfo();
  };

  modalDelete = () => {
    return new Promise((resolve, reject) => {
        deleteTasks(this.state.deleteId)
          .then((json) => {
            if (json) {
              resolve(json);
            }
          })
          .finally(() => {
            this.hideInfo();
            this.initialLoad();
            resolve();
          });
      });
  }

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
      title,
      description,
      editId: id,
    });
  };

  editTask = () => {
    let body = {
      title: this.state.title,
      descripiton: this.state.description,
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
        editVisible={false}
        archieveVisible={false}
        onSelect={this.onSelect}
        delete={this.delete}
      />
    );
  };

  render() {
    return (
      <AppLayout navigation={this.props.navigation} title="Completed Tasks">
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
                <Button color="#1C7CC2" onPress={this.modalDelete}>
                  {'Delete'}
                </Button>
                <Button color="#1C7CC2" onPress={this.hideInfo}>
                  {'Cancel'}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
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
