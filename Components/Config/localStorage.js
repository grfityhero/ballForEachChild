import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (name) => {
  return await AsyncStorage.getItem(name);
};

export const getUserId = async () => {
  return await AsyncStorage.getItem('user');
  // if (user) {
  //   return await JSON.parse(user).id;
  // }
};

export const setData = async (name, value) => {
  await AsyncStorage.setItem(name, value);
};

export const clearStorage = async () => {
  AsyncStorage.clear();
};
