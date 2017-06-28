import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Icon } from 'native-base';

import stylesGlobal from './../config/stylesGlobal';

export default class Root extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesGlobal.secondColor,
  },
});