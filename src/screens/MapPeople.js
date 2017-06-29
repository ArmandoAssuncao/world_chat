import React, { Component, PropTypes } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Content } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import CustomCalloutView from './../component/CustomCalloutView';

import { getLocation, requestPermissions } from '../utils/utils';
import stylesGlobal from './../config/stylesGlobal';

const { width, height } = Dimensions.get('window');

export default class MapPeople extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    people_list: PropTypes.array.isRequired,
    loadPeopleList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      people_list: [],
      origin: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * (width / height) * 1000,
      },
    };
  }

  componentDidMount() {
    this.props.loadPeopleList();

    requestPermissions();

    getLocation(navigator, 2000)
    .then((coordinates) => {
      // TODO: save coordinates in store
    })
    .catch((error) => {
      console.warn('', error);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      people_list: nextProps.people_list || [],
    });
  }

  openChat = () => {
    // this.props.navigation.navigate('Chat', user);
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
        <Grid>
          <Col style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={true}
              rotateEnabled={false}
              initialRegion={this.state.origin}
            >
              {this.state.people_list.map((person, i) => (
                <MapView.Marker
                  key={i}
                  coordinate={person.latlng}
                >
                  <MapView.Callout tooltip={true} onPress={this.openChat}>
                    <CustomCalloutView person={{...person}} navigation={this.props.navigation} />
                  </MapView.Callout>
                </MapView.Marker>
              ))}
            </MapView>
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
  map: {
    height: height,
    width: width,
  },
});