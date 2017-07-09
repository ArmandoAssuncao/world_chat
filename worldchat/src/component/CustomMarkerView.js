import React, { Component, PropTypes } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import CacheableImage from 'react-native-cacheable-image';

export default class CustomMarkerView extends Component {
  static propTypes = {
    person_picture_url: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      initialRender: true
    };
  }

  render() {
    return (
      <View>
        <Image
          key={`${this.state.initialRender}`}
          onLayout={() => this.setState({ initialRender: false })}
          style={styles.imageMarker}
          source={require('../imgs/marker.png')}
        >
          <CacheableImage
            key={this.props.person_picture_url}
            style={styles.imagePicture}
            // defaultSource={require('./../imgs/picture.png')}
            // source={{ uri: 'https://www.tugraz.at/typo3temp/pics/796dc36823.jpg' }}
            defaultSource={parseInt(this.props.person_picture_url)} // To test
          />
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageMarker: {
    flex:1,
    height: 79,
    width: 50,
    paddingTop: 5,
  },
  imagePicture: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 50,
  },
});