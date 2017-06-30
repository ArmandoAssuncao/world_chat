import React, { Component, PropTypes } from 'react';
import { Container, Content, Text, Body, List, ListItem, Left, Right, Thumbnail } from 'native-base';

import StorageFactory from './../stores/StorageFactory';

export default class Chats extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    loadChatPersonList: PropTypes.func.isRequired,
    chat_person_list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        age: PropTypes.number,
        gender: PropTypes.string,
        picture_url: PropTypes.string,
      })
    ).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      person_list: [],
    };
  }

  componentDidMount() {
    this.props.loadChatPersonList();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.chat_person_list) {
      const promiseList = nextProps.chat_person_list.map((person) => {
        return StorageFactory.getMessages(person.id)
        .then(messages => {
          person.messages = messages || [];
          return person;
        })
        .catch(error => console.error(error));
      });

      Promise.all(promiseList)
      .then(results => {
        this.setState({person_list: results});
      })
      .catch(error => console.error(error));
    }
  }

  openChat = (person) => {
    this.props.navigation.navigate('Chat', person);
  }

  sanitizeMessageText = (text) => {
    const maxSize = 30;
    return text.length <= maxSize ? text : text.substring(0,maxSize-4) + ' ...';
  }

  render() {
    return (
      <Container>
        <Content style={{backgroundColor: '#FFF'}}>
          <List>
            {this.state.person_list.map((person, i) => (
              <ListItem avatar button
                key={i}
                style={{backgroundColor: '#FFF', paddingVertical: 5, paddingLeft: 10, marginLeft: 0}}
                onPress={() => {this.openChat(person);}}
              >
                <Left>
                  <Thumbnail
                  style={{borderColor: '#CCC', borderWidth:1}}
                  // source={{ uri: person.picture_url }}
                  source={parseInt(person.picture_url)} // To test
                />
                </Left>
                <Body>
                  <Text>{person.name}</Text>
                  <Text note>
                    {(person.messages.length && person.messages[person.messages.length-1])
                      ?
                      this.sanitizeMessageText(person.messages[person.messages.length-1].text) : ' '
                    }
                  </Text>
                </Body>
                <Right>
                  <Text note>{(person.messages.length && person.messages[person.messages.length-1])
                      ?
                      person.messages[person.messages.length-1].time : ' '
                    }
                  </Text>
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}
