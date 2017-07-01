import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H3 } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

import stylesGlobal from './../config/stylesGlobal';

export default class About extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Grid>
            <Col style={styles.container}>
              <H3>Created by: Armando Assunção</H3>
              <View  style={styles.website}>
                <H3>Website: http://armandoassuncao.com</H3>
              </View>
            </Col>
          </Grid>
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

  website: {
    marginTop: 10,
  }
});