import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * CustomListItem Component
 * @augments {Component<Props, State>}
 */

class CustomListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSelect = this.onSelect.bind(this);
    this.archieve = this.archieve.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  onSelect = () => {
    this.props.onSelect(this.props.id, this.props.title);
  };

  archieve = () => {
    this.props.archieve(this.props.id);
  };

  edit = () => {
    this.props.edit(this.props.id);
  };

  delete = () => {
    this.props.delete(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity
        style={{
          ...styles.listItemContainer,
          ...this.props.listItemContainerStyle,
        }}
        onPress={this.onSelect}>
        <View
          style={{...styles.titlesContainer, ...this.props.titlesContainer}}>
          <View
            style={{
              ...styles.titleContainer,
              ...this.props.titleContainerStyle,
            }}>
            <Text
              numberOfLines={1}
              style={{...styles.title, ...this.props.titleStyle}}>
              {this.props.title}
            </Text>
          </View>
          {this.props.isSubtitle && (
            <View
              style={{
                ...styles.subtitleContainer,
                ...this.props.subtitleContainerStyle,
              }}>
              <Text
                numberOfLines={1}
                style={{...styles.subtitle, ...this.props.subtitleStyle}}>
                {this.props.subtitle}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={{...styles.iconsContainer, ...this.props.iconsContainerStyle}}>
          {this.props.archieveVisible && (
            <TouchableOpacity>
              <Icon
                name={'archive'}
                size={25}
                color={'#1C7CC2'}
                style={styles.Icon}
              />
            </TouchableOpacity>
          )}
          {this.props.editVisible && (
            <TouchableOpacity>
              <Icon
                name={'edit'}
                size={30}
                color={'#1C7CC2'}
                style={styles.Icon}
              />
            </TouchableOpacity>
          )}
          {this.props.deleteVisible && (
            <TouchableOpacity>
              <Icon
                name={'trash'}
                size={25}
                color={'red'}
                style={styles.Icon}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    height: 60,
    margin: 15,
    marginTop: 10,
    elevation: 10,
    padding: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  Icon: {
    margin: 5,
  },
  title: {
    fontSize: 23,
    flex: 1,
    textAlignVertical: 'center',
  },
  titleContainer: {
    flex: 0.96,
  },
  subtitleContainer: {
    flex: 0.9,
  },
  titlesContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 19,
  },
});

CustomListItem.propTypes = {
  delete: PropTypes.func,
  deleteVisible: PropTypes.bool,
  edit: PropTypes.func,
  editVisible: PropTypes.bool,
  iconContainerStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  iconsContainerStyle: PropTypes.object,
  id: PropTypes.number,
  listItemContainerStyle: PropTypes.object,
  onSelect: PropTypes.func,
  open: PropTypes.func,
  openVisible: PropTypes.bool,
  title: PropTypes.string,
  titleContainerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  isSubtitle: PropTypes.bool,
  subtitle: PropTypes.string,
};

CustomListItem.defaultProps = {
  delete: () => {},
  deleteVisible: true,
  isSubtitle: false,
  subtitle: '',
  edit: () => {},
  editVisible: true,
  iconContainerStyle: {},
  iconStyle: {},
  iconsContainerStyle: {},
  id: null,
  listItemContainerStyle: {},
  onSelect: () => {},
  open: () => {},
  openVisible: true,
  title: '.......',
  titleContainerStyle: {},
  titleStyle: {},
};

export default CustomListItem;
