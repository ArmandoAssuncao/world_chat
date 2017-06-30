import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import CacheableImage from 'react-native-cacheable-image';
import { Container, Content, Item, Input, Icon } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

import stylesGlobal from './../config/stylesGlobal';
import StorageFactory from './../stores/StorageFactory';

import MessageBox from './../component/MessageBox';

const { width } = Dimensions.get('window');

export default class Chat extends Component {

  static navigationOptions = ({navigation}) => {
    const person = navigation.state.params;
    return {
      title: `Chat with ${person.name}`,
    };
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          age: PropTypes.number,
          gender: PropTypes.string,
          picture_url: PropTypes.string,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    loadChatPersonList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._person = this.props.navigation.state.params;
    this._messageText = '';

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    StorageFactory.getMessages(this._person.id)
    .then(messages => {
      this.setState({messages: messages || []});
    })
    .catch(error => console.error(error));
  }

  sendMessage = (text) => {
    if(!text) return;
    this.clearInput();

    const currentDate = new Date();
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    const message = {from: 'me', text: text, time: time};

    let messages = this.state.messages;
    messages.push(message);
    this.setState({ messages: messages });

    StorageFactory.addMessage(this._person.id, message);

    // save person when send first message
    if(messages.length === 1){
      this.savePerson(this._person);
    }
    else {
      this.props.loadChatPersonList();
    }
  }

  savePerson = (person) => {
    StorageFactory.addFriend(person)
    .then(() => this.props.loadChatPersonList());
  }

  clearInput = () => {
    this._messageText = '';
    this._inputText._root.clear();
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Grid>
            <Col style={styles.container}>
              <View style={styles.header}>
                <CacheableImage
                  style={styles.headerImagePicture}
                  defaultSource={require('./../imgs/picture.png')}
                  source={{ uri: this._person.picture_url }}
                />
                <Text style={styles.headerName}>{this._person.name}</Text>
              </View>
              <CacheableImage
                style={{flex: 1}}
                defaultSource={require('./../imgs/bg-chat.jpg')}
              >
                <View style={styles.messagesContainer}>
                  <ScrollView style={styles.messagesScrollContaier}>
                    {
                      this.state.messages.map((message, i) => (
                        <MessageBox key={i} side={message.from === 'me' ? 'left' : 'right'}>
                          {message.text}
                        </MessageBox>
                      ))
                    }
                  </ScrollView>
                </View>

                <Item rounded style={{backgroundColor: '#FFF', marginTop: 8, marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                  <Input
                    placeholder='Type here ...'
                    ref={ref => this._inputText = ref}
                    onChangeText={(text) => this._messageText = text}
                  />
                  <Icon active name='md-send' style={{fontSize: 35}} onPress={() => { this.sendMessage(this._messageText);}} />
                </Item>
              </CacheableImage>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 60,
    width: width,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: stylesGlobal.primaryLightColor,
  },
  headerImagePicture: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  headerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesScrollContaier: {
    paddingHorizontal: 7,
  },
  input: {
  },
});