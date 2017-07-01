import React, { Component, PropTypes } from 'react';
import { BackHandler } from 'react-native';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import Routes from './config/routes';
import createStore from './stores/store';

const AppNavigator = Routes;

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Splash'));

const navReducer = (state = {...initialState, deep: 0}, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

@connect(state => ({
  nav: state.nav
}))
class AppWithNavigationState extends Component {

  static propTypes = {
    nav: PropTypes.shape({
      deep: PropTypes.number.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  shouldCloseApp() {
    return (this.props.nav.deep <= 0);
  }

  componentDidMount() {
    BackHandler.addEventListener('backPress', () => {
      if (this.shouldCloseApp()) return false;
      this.props.dispatch({
        type: 'Navigation/BACK'
      });
      return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress');
  }

  render() {
    return (
      <AppNavigator
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
