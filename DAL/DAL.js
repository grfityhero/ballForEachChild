import axios from 'axios';
import { getData } from '../Components/Config/localStorage';

const APP_URL = 'http://161.35.43.123:5000/api/';

export const get = async (url) => {
  const token = await getData('token');
  return await axios.get(APP_URL + url, {
    headers: {
      'x-auth-token': JSON.parse(token),
    },
  });
};

export const post = async (url, data) => {
  const token = await getData('token');
  // console.log('token : ',token);
  return axios.post(APP_URL + url, data, {
    headers: {
      'x-auth-token': JSON.parse(token),
    },
  });
};

export const put = async (url, data) => {
  const token = await getData('token');
  return axios.put(APP_URL + url, data, {
    headers: {
      'x-auth-token': JSON.parse(token),
    },
  });
};
