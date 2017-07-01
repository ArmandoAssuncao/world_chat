import React, { Component, PropTypes } from 'react';
import { } from 'react-native';
import { Container, Content, Form, Item, Input, Picker, Text, Button, Icon, H3 } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';

import { resetNavigateTo } from './../utils/utils';
import StorageFactory from './../stores/StorageFactory';

const ItemPicker = Picker.Item;

export default class FormUser extends Component {

  static navigationOptions = ({ navigation }) => {
    let parentName = null;
    if(navigation && navigation.state && navigation.state.params) {
      parentName = navigation.state.params.parentName;
    }

    let obj = {};
    obj.title = parentName === null ? 'Edit Profile' : 'Create Profile';
    if(parentName) obj.headerLeft = parentName === null ? undefined : null;

    return obj;
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: null,
      description: null,
      gender: 'male',
      age: '20',
    };
  }

  componentDidMount() { }

  onValueChangeName = (value: string) => {
    this.setState({name: value});
  }
  onValueChangeDescription = (value: string) => {
    this.setState({description: value});
  }

  onValueChangeGenderPicker = (value: string) => {
    this.setState({gender: value});
  }
  onValueChangeAgePicker = (value: string) => {
    this.setState({age: value});
  }

  saveUser = () => {
    let user = {};
    let error = false;
    if(this.state.name) user.name = this.state.name;
    else {
      this.setState({name: ''});
      error = true;
    }
    if(this.state.description) user.description = this.state.description;
    else {
      this.setState({description: ''});
      error = true;
    }
    user.gender = this.state.gender;
    user.age = this.state.age;

    if(error) return;

    StorageFactory.setUser(user);
    this.props.loadUser(user);
    resetNavigateTo('HomeTab', this.props.navigation);
  }

  render() {
    return (
      <Container>
        <Content style={{backgroundColor: '#FFF', padding: 10}}>
          <Grid style={{alignItems: 'center'}}>
            <Row>
              <H3>Enter your informations</H3>
            </Row>
          </Grid>
          <Form>
            <Item underline>
              <Input placeholder='Name' onChangeText={this.onValueChangeName} />
              { this.state.name === '' ? (<Icon name='close-circle' />) : (null) }
            </Item>

            <Item underline>
              <Input style={{height: 80}} multiline={true} placeholder='Description' onChangeText={this.onValueChangeDescription}/>
              { this.state.description === '' ? (<Icon name='close-circle' />) : (null) }
            </Item>

            <Text style={{marginTop: 20}}>Select your gender</Text>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              // iosHeader='Select your gender'
              headerBackButtonText='Go Back'
              mode='dropdown'
              selectedValue={this.state.gender}
              onValueChange={this.onValueChangeGenderPicker}>
              <ItemPicker label='Male' value='male' />
              <ItemPicker label='Female' value='female' />
            </Picker>

            <Text style={{marginTop: 20}}>Select your age</Text>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              // iosHeader='Select your age'
              headerBackButtonText='Go Back'
              mode='dropdown'
              selectedValue={this.state.age}
              onValueChange={this.onValueChangeAgePicker}>
              {Array(99).fill().map((v, i) => {
                i++;
                return <ItemPicker key={i} label={i.toString()} value={i.toString()} />;
              })}
            </Picker>

            <Button full primary style={{marginTop: 30}} onPress={() => this.saveUser()}>
              <Text>OK</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
