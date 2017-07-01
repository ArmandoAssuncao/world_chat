import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Card, CardItem, Body } from 'native-base';

const { width, height } = Dimensions.get('window');

export default class MessageBox extends Component {
  static propTypes = {
    side: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.side === 'left' ? styles.boxLeft : styles.boxRight]}>
        <View style={styles.boxContainer}>
          <Card style={{borderRadius: 10}}>
            <CardItem
              style={{
                borderRadius: 10, paddingTop: 5, paddingBottom: 5, paddingLeft: 8, paddingRight: 8,
                backgroundColor: this.props.side === 'left' ? '#FFF': '#DCF8C6',
              }}
            >
              <Body>
                <Text style={styles.text}>
                   {this.props.children}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  boxLeft: {
    justifyContent: 'flex-start',
  },
  boxRight: {
    justifyContent: 'flex-end',
  },
  boxLeftColor: {
    backgroundColor: 'blue',
  },
  boxRightColor: {
    backgroundColor: 'yellow',
  },
  boxContainer: {
    flexDirection: 'row',
    width: width * 0.6,
  },
  text: {
    fontSize: 18,
  },
});