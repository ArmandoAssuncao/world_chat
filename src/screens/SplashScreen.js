import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
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
    }, 300);
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Grid>
            <Row style={styles.container}>
              <MCIcon name='map-marker-radius' style={{fontSize: 150, color: stylesGlobal.secondColor}}/>
            </Row>
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