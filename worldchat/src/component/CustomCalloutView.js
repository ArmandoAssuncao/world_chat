import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CacheableImage from 'react-native-cacheable-image';

import stylesGlobal from './../config/stylesGlobal';

export default class CustomCalloutView extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    person: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      age: PropTypes.number,
      gender: PropTypes.string,
      picture_url: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      person: {
        name: '',
        age: '..',
        gender: 'Male',
        description: '',
        picture_url: '',
      }
    };
  }

  componentWillMount() {
    this.setPerson();
  }

  setPerson = () => {
    let person = this.state.person;

    if(this.props.person) {
      person.name = this.props.person.name || person.name;
      person.age = this.props.person.age || person.age;
      person.gender = this.props.person.gender || person.gender;
      person.description = this.props.person.description;
      person.picture_url = this.props.person.picture_url || person.picture_url;
    }

    this.setState({person: person});
  }

  render() {
    return (
      <View style={styles.containerShadow}>
        <View style={styles.container}>
          <View style={styles.personContainer}>
            <View style={styles.personImageContainer}>
              <CacheableImage
                key={this.state.person.picture_url}
                style={styles.imagePicture}
                // defaultSource={require('./../imgs/picture.png')}
                // source={{ uri: this.state.person.picture_url }}
                defaultSource={parseInt(this.state.person.picture_url)} // To test
              />
            </View>
            <View style={styles.infosContainer}>
              <Text style={styles.name}>{this.state.person.name}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                <Text style={styles.age}>{this.state.person.age} years</Text>
                <Text style={styles.gender}>{this.state.person.gender}</Text>
              </View>
              <Text ellipsizeMode={Text.tail} numberOfLines={5} style={styles.description}>{this.state.person.description}</Text>
            </View>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>- Click to open chat -</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerShadow: {
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingBottom: 6,
    paddingRight: 6,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  container: {
    flex: 1,
    backgroundColor: stylesGlobal.primaryColor,
    borderColor: stylesGlobal.primaryLightColor,
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
  },
  personContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  personImageContainer: {
    margin: 7,
  },
  imagePicture: {
    height: 60,
    width: 60,
    borderColor: '#FFF',
    borderWidth: 1,
  },
  infosContainer: {
    flex: 1,
    padding: 5,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderTopRightRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  age: {
    fontSize: 16,
  },
  gender: {
    fontSize: 16,
    marginLeft: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  tip: {
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  tipText: {
    fontSize: 16,
    color: '#555',
  }
});