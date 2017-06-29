import { NavigationActions } from 'react-navigation';
import { Alert, PermissionsAndroid } from 'react-native';

export const resetNavigateTo = (routeName: string, navigation) => {
  const actionToDispatch = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  });
  navigation.dispatch(actionToDispatch);
};

export const requestPermissions = () => {
  PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ])
  .then(permissions => {
    let showMsg = false;
    let msgs = [];

    if(permissions['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.DENIED) {
      msgs.push('Allow the location for you can talk with others people.');
      showMsg = true;
    }

    if(showMsg === true) {
      showAlertWarning(msgs.join('\n'), 'Permissions', 'Close');
    }
  })
  .catch(error => {
    console.error('request permissions: ', error);
  });
};

export const getLocation = (navigator, timeout=315360000, highAccuracy=false, maxAge=3600000) => {
  return new Promise(function(resolve, reject){
    // check location permission
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    .then(granted => {
      if(granted === false) {
        reject(new Error('permission location denied'));
      }
      else {
        // resolve coordinates
        navigator.geolocation.getCurrentPosition(
          position => {
            const coords = {
              lon: position.coords.longitude,
              lat: position.coords.latitude,
            };
            resolve(coords);
          },
          error => {
            reject(error);
          },
          {enableHighAccuracy: highAccuracy, timeout: timeout, maximumAge: maxAge}
        );
      }
    })
    .catch(error => {
      reject(error);
    });
  });
};

export const showAlertWarning = (msg='Could not perform the action', title='Alert', btnText='OK', btnPress = () => {}) => {
  Alert.alert(
    title,
    msg,
    [
      {text: btnText, onPress: btnPress},
    ],
  );
};

export const generateRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};