import React, { Component, PropTypes } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Content } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import CustomCalloutView from './../component/CustomCalloutView';
import CustomMarkerView from './../component/CustomMarkerView';

import { getLocation, requestPermissions } from '../utils/utils';
import stylesGlobal from './../config/stylesGlobal';

const { width, height } = Dimensions.get('window');

export default class MapPeople extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    people_list: PropTypes.array.isRequired,
    coordinate: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired
    }),
    loadPeopleList: PropTypes.func.isRequired,
    saveCoordinate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      people_list: [],
      coordinate: null,
      origin: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * (width / height) * 1000,
      },
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  }

  componentDidMount() {
    this.props.loadPeopleList();

    requestPermissions();

    getLocation(navigator, 2000)
    .then((coordinate) => {
      this.props.saveCoordinate(coordinate);
    })
    .catch((error) => {
      console.warn('', error);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      people_list: nextProps.people_list || [],
      coordinate: nextProps.coordinate || null,
    });
  }

  _onLayout = (e) => {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    });
  }

  openChat = (person) => {
    this.props.navigation.navigate('Chat', person);
  }

  render() {
    return (
      <Container onLayout={this._onLayout}>
        <Content contentContainerStyle={{flex: 1}}>
        <Grid>
          <Col style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{width: this.state.width, height: this.state.height}}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={true}
              rotateEnabled={false}
              initialRegion={this.state.origin}
            >
              {this.state.people_list.map((person, i) => (
                <MapView.Marker key={i} anchor={{x:0.5, y:-0.5}} coordinate={person.latlng}>
                  <CustomMarkerView person_picture_url={person.picture_url} />
                  <MapView.Callout tooltip={true} onPress={() => this.openChat(person)}>
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
    // height: height,
    // width: width,
  },
});