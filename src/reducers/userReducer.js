import { LOAD_USER, LOAD_USER_ERROR } from '../actions/actionTypes';

const initState = {
  name: '',
  description: '',
  age: '',
  gender: '',
};

export default (state = initState, action = {}) => {
  switch (action.type) {
  case LOAD_USER:
    return action.payload || state;
  case LOAD_USER_ERROR:
    return state;
  default:
    return state;
  }
};