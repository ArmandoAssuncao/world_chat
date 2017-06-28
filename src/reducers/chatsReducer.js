import { LOAD_CHAT_LIST, LOAD_CHAT_LIST_ERROR } from '../actions/actionTypes';

const initState = [];

export default (state = initState, action = {}) => {
  switch (action.type) {
  case LOAD_CHAT_LIST:
    return action.payload || state;
  case LOAD_CHAT_LIST_ERROR:
    return state;
  default:
    return state;
  }
};