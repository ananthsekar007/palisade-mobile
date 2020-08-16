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
import {getAllTasks} from './../../actions/tasks';
import CustomFab from './../../components/Customfab/CustomFab';
export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: '',
      description: '',
      isCompleted: false,
      isArchieved: false,
      tasks: [],
    };
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount = () => {
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
          resolve();
        });
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

  Item = ({id, title}) => {
    return (
      <CustomListItem
        id={id}
        title={title}
        listItemContainerStyle={{backgroundColor: '#ffff'}}
        titleContainerStyle={styles.titleContainerStyle}
        deleteVisible={true}
        editVisible={true}
        archieveVisible={true}
        // onSelect={this.onSelect}
        // open={this.onSelect}
        // edit={this.edit}
        // delete={this.delete}
      />
    );
  };

  render() {
    return (
      <AppLayout navigation={this.props.navigation} title="Tasks">
        <FlatList
          //   refreshControl={
          //     <RefreshControl
          //       refreshing={this.state.isRefreshing}
          //       onRefresh={this.onRefresh}
          //     />
          //   }
          style={{marginTop: 20}}
          data={this.state.tasks}
          renderItem={({item, index}) => {
            return this.Item({
              id: item.task_id,
              title: item.title,
            });
          }}
          keyExtractor={(item) => item.task_id}
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
            <Button style={styles.button} color={'#1C7CC2'} mode={'contained'}>
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
