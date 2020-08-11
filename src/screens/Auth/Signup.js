import React from 'react';
import {StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

export default class Signup extends React.Component{
    render(){
        state = {
            name: '',
            email: '',
            password: ''
        };
        return(
             <View style={styles.background}>
                <StatusBar
                  backgroundColor={'#F1F1F1'}
                  barStyle={('default', 'dark-content')}
                />
                <Text style={styles.headerText}>Palisade</Text>
                <View View style = {styles.textContainer}> 
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
                      autoFocus={true}
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
                      autoFocus={true}
                      sel={'#1C7CC2'}
                      keyboardType={'default'}
                      onChangeText={(password) => this.setState({password})}
                    />

                    <Button style={styles.loginButton} mode="contained" color={'#1C7CC2'}>
                          Register
                    </Button>
                    
                    <TouchableOpacity>
                        <Text style = {styles.registerText}>Have an account?</Text> 
                    </TouchableOpacity>

                    <Button
                        style={styles.registerButton}
                        mode="contained"
                        color={'#003C69'}
                        onPress={()=> this.props.navigation.navigate('login')}>
                        Sign In
                    </Button>
                </View>
             </View>
             
        )
    }
}

const styles = StyleSheet.create({
  headerText :{
    textAlign: "center",
    marginTop: 100,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "AlfaSlabOne-Regular",
    marginBottom: 80
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
      textAlign: "center",
      marginTop: 20,
      marginBottom: 20,
      fontSize: 15,
      fontWeight: "600"

  }
});