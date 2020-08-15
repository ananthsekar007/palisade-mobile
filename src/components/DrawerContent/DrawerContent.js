import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Avatar,
  Drawer,
  Caption,
  Title,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Logo from './../../../assets/images/palisade.png';
export default class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...this.props}>
          <View style={styles.DrawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Avatar.Image source={Logo} style={styles.avatar} />
                <View>
                  <Text style={styles.title}>Ananth S S</Text>
                </View>
              </View>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                labelStyle={styles.labelStyle}
                label="Tasks"
                onPress={() => {
                  this.props.navigation.navigate('Tasks')
                }}
              />
              <DrawerItem
                labelStyle={styles.labelStyle}
                label="Completed Tasks"
                onPress={() => {
                    this.props.navigation.navigate('CompletedTasks')
                }}
              />
              <DrawerItem
                labelStyle={styles.labelStyle}
                label="Archieved Tasks"
                onPress={() => {
                    this.props.navigation.navigate('ArchievedTasks')                }}
              />
              <DrawerItem
                labelStyle={styles.labelStyle}
                label="KeyStore"
                onPress={() => {
                    this.props.navigation.navigate('Keystore')                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.botttomDrawerSection}>
          <DrawerItem
            labelStyle={styles.labelStyle}
            label="Sign Out"
            onPress={() => {
              console.log('pressed');
            }}
          />
        </Drawer.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  DrawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  botttomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    backgroundColor: '#ffff',
    alignSelf: 'center',
    marginRight: 30,
  },
  labelStyle: {
    fontSize: 17,
  },
});
