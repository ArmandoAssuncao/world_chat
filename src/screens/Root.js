import React, { Component, PropTypes } from 'react';

import { resetNavigateTo } from './../utils/utils';

import StorageFactory from './../stores/StorageFactory';

export default class Root extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    StorageFactory.getUser()
    .then(user => {
      if(!user) {
        this.props.navigation.navigate('FormUser', {parentName: 'Root'});
      }
      else {
        resetNavigateTo('Home', this.props.navigation);
      }
    });
  }

  render() {
    return null;
  }
}