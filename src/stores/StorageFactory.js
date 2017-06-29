import { AsyncStorage } from 'react-native';

const FRIENDS = 'FRIENDS';
const MESSAGES = 'MESSAGES';

export default class StorageFactory {

  static async _getItem(itemName) {
    return JSON.parse(await AsyncStorage.getItem(itemName));
  }
  static _setItem(itemName, value) {
    return AsyncStorage.setItem(itemName, JSON.stringify(value));
  }
  static _removeItem(itemName) {
    return AsyncStorage.removeItem(itemName);
  }

  static async getFriends() {
    return await StorageFactory._getItem(FRIENDS);
  }
  static async addFriend(value) {
    let friends = (await StorageFactory.getFriends()) || [];
    friends.push(value);
    StorageFactory._setItem(FRIENDS, friends);
    return true;
  }
  static async removeFriend(friendId) {
    let friends = (await StorageFactory.getFriends()) || [];
    friends = friends.filter((friend) => friend.id === friendId ? false : true);
    StorageFactory.setFriends(friends);
    return true;
  }
  static removeFriends() {
    return StorageFactory._removeItem(FRIENDS);
  }

  static async getMessages(friendId) {
    return await StorageFactory._getItem(`${MESSAGES}_${friendId}`);
  }
  static removeMessages(friendId) {
    return StorageFactory._removeItem(`${MESSAGES}_${friendId}`);
  }
  static async addMessage(friendId, value) {
    let messages = (await StorageFactory.getMessages()) || [];
    messages.push(value);
    StorageFactory._setItem(`${MESSAGES}_${friendId}`, messages);
    return true;
  }
}