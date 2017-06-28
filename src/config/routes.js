import React from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator, DrawerView } from 'react-navigation';

import SplashScreen from './../screens/SplashScreen';

const SplashScreenNav = StackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      title: 'Splash Screen',
      header: null,
    }
  },
});

export default SplashScreenNav;