import { combineReducers } from 'redux';

import peopleReducer from './peopleReducer';
import chatsReducer from './chatsReducer';
import coordinateReducer from './coordinateReducer';

export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    people_list: peopleReducer,
    chat_list: chatsReducer,
    coordinate: coordinateReducer,
  });
}
