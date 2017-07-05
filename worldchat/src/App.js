import React, { Component, PropTypes } from 'react';
import { BackHandler } from 'react-native';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import Routes from './config/routes';
import createStore from './stores/store';

const AppNavigator = Routes;

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Root'));

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

@connect(state => ({
  nav: state.nav
}))
class AppWithNavigationState extends Component {

  static propTypes = {
    nav: PropTypes.shape().isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    BackHandler.addEventListener('backPress', this.backAction);
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress');
  }

  backAction = () => {
    this.navigator.props.navigation.goBack();
    return true;
  };


  render() {
    return (
      <AppNavigator
        ref={ (ref) => this.navigator = ref }
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const store = createStore(navReducer);

export default function ChatByLocation() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
}
