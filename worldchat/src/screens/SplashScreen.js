import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, H1 } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { resetNavigateTo } from './../utils/utils';
import stylesGlobal from './../config/stylesGlobal';

export default class SplashScreen extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      resetNavigateTo('Root', this.props.navigation);
    }, 800);
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Grid>
            <Col style={styles.container}>
              <MCIcon name='map-marker-radius' style={{fontSize: 150, color: stylesGlobal.secondColor}}/>
              <H1 style={{color: stylesGlobal.secondColor}}>World Chat</H1>
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
    backgroundColor: stylesGlobal.primaryColor,
  },
});