import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import CacheableImage from 'react-native-cacheable-image';
import IconIon from 'react-native-vector-icons/Ionicons';
import { Container, Content, Item, Input, Icon } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

import stylesGlobal from './../config/stylesGlobal';
import StorageFactory from './../stores/StorageFactory';

import MessageBox from './../component/MessageBox';

export default class Chat extends Component {

  static navigationOptions = ({navigation}) => {
    const person = navigation.state.params;
    return {
      // title: `Chat with ${person.name}`,
      headerLeft: (
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
          <IconIon name='md-arrow-back' size={23} color='#FFF' onPress={() => navigation.goBack()} />
          <View style={styles.header}>
            <CacheableImage
              key={person.picture_url}
              style={styles.headerImagePicture}
              // defaultSource={require('./../imgs/picture.png')}
              // source={{ uri: this._person.picture_url }}
              defaultSource={parseInt(person.picture_url)} // To test
            />
            <Text style={styles.headerName}>{person.name}</Text>
          </View>
        </View>
      )
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

    this.generateExampleMessages(); // To test;
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

  // To test
  generateExampleMessages = () => {
    let count = 0;
    const texts = ['Ola', 'Tudo bom?', 'Eu estou ótimo.'];
    const idInterval = setInterval(() => {
      this.personSendMessage(texts[count]);
      count++;
      if(count === 3) clearInterval(idInterval);
    }, 3000);
  }
  // To test
  personSendMessage = (text) => {
    const currentDate = new Date();
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    const message = {from: 'you', text: text, time: time};

    let messages = this.state.messages;
    messages.push(message);
    this.setState({ messages: messages });

    StorageFactory.addMessage(this._person.id, message);
    // save person when send first message
    if(messages.length === 1) this.savePerson(this._person);
    else this.props.loadChatPersonList();
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <Grid>
            <Col style={styles.container}>
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
    flexDirection: 'row',
  },
  headerImagePicture: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginLeft: 10,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 10,
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