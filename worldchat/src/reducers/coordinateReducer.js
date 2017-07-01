import { LOAD_COORDINATE, LOAD_COORDINATE_ERROR } from '../actions/actionTypes';

const initState = null;

export default (state = initState, action = {}) => {
  switch (action.type) {
  case LOAD_COORDINATE:
    return action.payload || state;
  case LOAD_COORDINATE_ERROR:
    return state;
  default:
    return state;
  }
};