import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {login, setAuthToken} from './../../actions/auth';
import {TextInput, Button} from 'react-native-paper';
import logo from './../../../assets/images/palisade.png';

const {height: HEIGHT} = Dimensions.get('screen');
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {}

  login = () => {
    if (
      this.state.email.trim() !== null &&
      this.state.password.trim() !== null
    ) {
      return new Promise((resolve, reject) => {
        login(this.state.email, this.state.password)
          .then((json) => {
            if (json) {
              console.log(json);
              setAuthToken(json.access_token);
              this.props.navigation.navigate('Tasks');
            }
          })
          .finally(() => {
            resolve();
          });
      });
    }
  };

  render() {
    return (
      <View style={styles.background}>
        <StatusBar
          backgroundColor={'#F1F1F1'}
          barStyle={('default', 'dark-content')}
        />
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <TextInput
            value={this.state.email}
            style={styles.textView}
            theme={{
              colors: {
                primary: '#1C7CC2',
                underlineColor: 'transparent',
              },
            }}
            mode={'outlined'}
            label={'Email'}
            autoFocus={true}
            sel={'#1C7CC2'}
            keyboardType={'default'}
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput
            value={this.state.password}
            mode={'outlined'}
            theme={{
              colors: {
                primary: '#1C7CC2',
                underlineColor: 'transparent',
              },
            }}
            label={'Password'}
            secureTextEntry={true}
            keyboardType={'default'}
            onChangeText={(password) => this.setState({password})}
          />
        </View>
        <Button style={styles.loginButton} mode="contained" color={'#1C7CC2'} onPress={this.login}>
          Login
        </Button>
        <TouchableOpacity>
          <Text style={styles.registerText}>Don't have an account?</Text>
        </TouchableOpacity>
        <Button
          style={styles.registerButton}
          mode="contained"
          color={'#003C69'}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Register
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'AlfaSlabOne-Regular',
    marginBottom: 80,
  },
  background: {
    backgroundColor: '#F1F1F1',
    flex: 1,
  },
  textContainer: {
    marginTop: 0,
    margin: 30,
  },
  textView: {
    marginBottom: 20,
  },
  loginButton: {
    marginLeft: 70,
    marginRight: 70,
    marginBottom: 20,
    borderRadius: 20,
  },
  registerButton: {
    marginLeft: 70,
    marginRight: 70,
    marginBottom: 20,
    borderRadius: 20,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: '600',
  },
  imageContainer: {
    justifyContent: 'center',
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 80,
  },
  image: {
    flex: 1,
    maxWidth: '100%',
  },
});
