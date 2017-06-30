import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

import IconIon from 'react-native-vector-icons/Ionicons';
import stylesGlobal from './../config/stylesGlobal';

import MapPeopleContainer from '../containers/MapPeopleContainer';
import ChatsContainer from '../containers/ChatsContainer';
import ChatContainer from '../containers/ChatContainer';
import SplashScreen from './../screens/SplashScreen';
import About from './../screens/About';
import Root from './../screens/Root';

import DrawerContent from '../component/DrawerContent';

const HomeNavTab = TabNavigator({
  MapPeople: {
    screen: MapPeopleContainer,
    navigationOptions: {
      title: 'People',
      tabBarIcon: ({ tintColor }) => (
        <IconIon name='md-people' size={35} color={tintColor} />
      ),
    }
  },
  Chats: {
    screen: ChatsContainer,
    navigationOptions: {
      title: 'My Chats',
      tabBarIcon: ({ tintColor }) => (
        <IconIon name='md-chatboxes' size={35} color={tintColor} />
      ),
    }
  }
}, {
  initialRouteName: 'MapPeople',
  order: ['MapPeople', 'Chats'],
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: stylesGlobal.secondDarkColor,
    inactiveTintColor: '#BBB',
    style: {
      backgroundColor: stylesGlobal.primaryColor,
    },
    tabStyle: {
      padding: 5,
    },
    iconStyle: {
      height: 40,
      width: 60,
    },
    indicatorStyle: {
      backgroundColor: 'transparent',
    },
  }
});

const NavStack = StackNavigator({
  HomeTab: {
    screen: HomeNavTab,
    navigationOptions: ({ navigation }) => ({
      // title: 'Home',
      headerLeft: <IconIon name='md-menu' size={30} color='#FFF' onPress={() => navigation.navigate('DrawerOpen')} />
    })
  },
  Chat: {
    screen: ChatContainer,
  },
  About: {
    screen: About,
    navigationOptions: {
      title: 'About'
    }
  },
}, {
  initialRouteName: 'HomeTab',
  navigationOptions: ()=>({
    headerTintColor: '#FFF',
    ...StackHeaderStyle
  })
});

const DrawerRoutes = DrawerNavigator({
  NavStack: {
    screen: NavStack,
  },
  About: {
    screen: About,
  },
}, {
  initialRouteName: 'NavStack',
  drawerWidth: 270,
  contentOptions: {
    activeTintColor: stylesGlobal.primaryColor,
    style: {
      marginVertical: 0,
    }
  },
  contentComponent: props => <DrawerContent navigation={props.navigation} items={props.items} />
});

const RootNav = StackNavigator({
  Root: {
    screen: Root,
    navigationOptions: {
      title: 'Root',
      header: null,
    }
  },
  Home: {
    screen: DrawerRoutes,
    navigationOptions: {
      title: 'Home',
      header: null,
    }
  }
});

const SplashScreenNav = StackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      title: 'Splash Screen',
      header: null,
    }
  },
  Root: {
    screen: RootNav,
    header: null,
  },
});

const StackHeaderStyle = StyleSheet.create({
  headerStyle: {
    backgroundColor: stylesGlobal.primaryColor,
    paddingHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
  headerTitleStyle: {
    color: '#FFF'
  }
});

export default SplashScreenNav;