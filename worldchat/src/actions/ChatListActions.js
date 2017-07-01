import { LOAD_CHAT_PERSON_LIST, LOAD_CHAT_PERSON_LIST_ERROR } from './actionTypes';

import StorageFactory from './../stores/StorageFactory';

export const loadChatPersonList = () => (dispatch) => {
  StorageFactory.getFriends()
  .then(friends => dispatch( {type: LOAD_CHAT_PERSON_LIST, payload: friends} ));
};