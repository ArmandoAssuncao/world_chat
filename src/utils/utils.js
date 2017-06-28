import { NavigationActions } from 'react-navigation';

export const resetNavigateTo = (routeName: string, navigation) => {
  const actionToDispatch = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  });
  navigation.dispatch(actionToDispatch);
};