import React, { Component, PropTypes } from 'react';

import { resetNavigateTo } from './../utils/utils';

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
    resetNavigateTo('Home', this.props.navigation);
  }

  render() {
    return null;
  }
}