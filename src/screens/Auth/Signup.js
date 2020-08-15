import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {setAuthToken, register} from '../../actions/auth';
import logo from './../../../assets/images/palisade.png';

const {height: HEIGHT} = Dimensions.get('screen');
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      loading: false,
    };
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {}

  signup = () => {
    if (
      this.state.name.trim() !== null &&
      this.state.email.trim() !== null &&
      this.state.password.trim() !== null
    ) {
      this.setState({
        loading: true,
      });
      return new Promise((resolve, reject) => {
        register(this.state.name, this.state.email, this.state.password)
          .then((json) => {
            if (json) {
              console.log(json);
              setAuthToken(json.access_token);
              this.props.navigation.navigate('Home');
            }
          })
          .finally(() => {
            this.setState({
              loading: false,
            });
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
        <View View style={styles.textContainer}>
          <TextInput
            style={styles.textView}
            theme={{
              colors: {
                primary: '#1C7CC2',
                underlineColor: 'transparent',
              },
            }}
            mode={'outlined'}
            label={'Name'}
            autoFocus={true}
            sel={'#1C7CC2'}
            keyboardType={'default'}
            onChangeText={(name) => this.setState({name})}
          />

          <TextInput
            style={styles.textView}
            theme={{
              colors: {
                primary: '#1C7CC2',
                underlineColor: 'transparent',
              },
            }}
            mode={'outlined'}
            label={'Email'}
            sel={'#1C7CC2'}
            keyboardType={'default'}
            onChangeText={(email) => this.setState({email})}
          />

          <TextInput
            style={styles.textView}
            theme={{
              colors: {
                primary: '#1C7CC2',
                underlineColor: 'transparent',
              },
            }}
            mode={'outlined'}
            label={'Password'}
            secureTextEntry={true}
            sel={'#1C7CC2'}
            keyboardType={'default'}
            onChangeText={(password) => this.setState({password})}
          />

          <Button
            style={styles.loginButton}
            mode="contained"
            color={'#1C7CC2'}
            loading={this.state.loading}
            disabled={this.state.loading}>
            Register
          </Button>

          <TouchableOpacity>
            <Text style={styles.registerText}>Have an account?</Text>
          </TouchableOpacity>

          <Button
            style={styles.registerButton}
            mode="contained"
            color={'#003C69'}
            onPress={() => this.props.navigation.navigate('Login')}>
            Sign In
          </Button>
        </View>
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
    marginTop: 70,
  },
  image: {
    flex: 1,
    maxWidth: '100%',
  },
});
