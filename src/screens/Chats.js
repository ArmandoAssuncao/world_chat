import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import stylesGlobal from './../config/stylesGlobal';

export default class Chats extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    chat_list: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      chat_list: [],
    };
  }

  componentDidMount() { }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});