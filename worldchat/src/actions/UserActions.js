import { LOAD_USER, LOAD_USER_ERROR } from './actionTypes';

import StorageFactory from './../stores/StorageFactory';

export const loadUser = (user) => (dispatch) => {
  if(!user) {
    StorageFactory.getUser()
    .then(user => dispatch( {type: LOAD_USER, payload: user} ));
  }
  else {
    dispatch( {type: LOAD_USER, payload: user} );
  }
};