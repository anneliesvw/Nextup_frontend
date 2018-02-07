import axios from 'axios';
import base64 from 'base-64';

const API_URL = process.env.API_ENDPOINT;
const TOKEN_ENDPOINT = `${API_URL}/oauth/token`;
const API_ENDPOINT = `${API_URL}/api/users`;

const tryLogin = (username, password, onSuccess, onError) => {
  const authOptions = {
    method: 'POST',
    url: `${TOKEN_ENDPOINT}?grant_type=password&username=${username}&password=${password}`,
    headers: {
      Authorization: `Basic ${base64.encode('webclient:websecret')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  axios(authOptions).then(onSuccess, onError);
};

const confirmEmail = (token, onSuccess, onError) => {
  axios.put(`${API_ENDPOINT}/confirmEmail?token=${token}`).then(onSuccess, onError);
};

const register = (userInfo, onSuccess, onError) => {
  axios.post(`${API_ENDPOINT}/register`, userInfo).then(onSuccess, onError);
};

export default {
  tryLogin,
  confirmEmail,
  register,
};
