import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import DrawerOptions from '../config/DrawerOptions';

import stylesGlobal from './../config/stylesGlobal';

const { height } = Dimensions.get('window');

export default class DrawerContent extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    items: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
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
    backgroundColor: stylesGlobal.primaryColor,
    height: height * 0.25,
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