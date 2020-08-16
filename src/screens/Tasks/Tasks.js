import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import CustomModal from './../../components/CustomModal/CustomModal';
import AppLayout from './../../AppLayout/AppLayout';
import CustomListItem from './../../components/CustomListItem/CustomListItem';
import {getAllTasks, addTasks, deleteTasks, editTasks} from './../../actions/tasks';
import CustomFab from './../../components/Customfab/CustomFab';
export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: '',
      description: '',
      editVisible : false,
      isCompleted: false,
      isArchieved: false,
      tasks: [],
      isRefreshing: false,
      loading: false,
      editId: null
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

  addTask = () => {
    let body = {
      title: this.state.title,
      description: this.state.description,
    };
    this.setState({
        loading: true
    })
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
                description: ''
            })
            this.hideModal();
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
        // onSelect={this.onSelect}
        // open={this.onSelect}
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
              description: item.description
            });
          }}
          keyExtractor={(item) => item.task_id.toString()}
        />
        <CustomModal
          visible={this.state.visible}
          header="Add Task"
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
              onPress={this.addTask}
              loading={this.state.loading}
              disabled={this.state.loading}>
              Add
            </Button>
          </View>
        </CustomModal>
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
