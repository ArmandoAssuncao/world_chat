import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import DrawerOptions from '../config/DrawerOptions';

import stylesGlobal from './../config/stylesGlobal';
import StorageFactory from './../stores/StorageFactory';

const { height } = Dimensions.get('window');

export default class Drawer extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    items: PropTypes.array.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      age: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
    }).isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        description: '',
        age: '',
        gender: '',
      },
    };
  }

  componentDidMount() {
    this.props.loadUser();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user || this.state.user,
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hi, {this.state.user.name}  :-)</Text>
        </View>
        <View>
          {
            this.props.items
            .filter((item) => item.routeName != 'NavStack')
            .map((item, i) => {
              return (
                <TouchableOpacity key={i} onPress = {() => this.props.navigation.navigate(item.routeName)}>
                  <View style={styles.routesContainer}>
                    {DrawerOptions[item.routeName].drawerIcon}
                    <Text style={styles.routesLabel}>{DrawerOptions[item.routeName].drawerLabel}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: stylesGlobal.primaryColor,
    height: height * 0.25,
  },
  headerText: {
    fontSize: 20,
    color: '#FFF',
  },
  routesContainer: {
    flexDirection: 'row',
    paddingVertical: 13,
    paddingLeft: 20,
    borderColor: '#DDD',
    borderBottomWidth: 1,
  },
  routesLabel: {
    color: '#333',
    fontSize: 16,
    paddingLeft: 20,
  },
  routesIcon: {
    color: '#555',
    fontSize: 24,
  },
});