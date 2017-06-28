import { LOAD_PEOPLE_LIST, LOAD_PEOPLE_LIST_ERROR } from '../actions/actionTypes';

const initState = [];

export default (state = initState, action = {}) => {
  switch (action.type) {
  case LOAD_PEOPLE_LIST:
    return action.payload || state;
  case LOAD_PEOPLE_LIST_ERROR:
    return state;
  default:
    return state;
  }
};