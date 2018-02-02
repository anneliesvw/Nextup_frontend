import axios from 'axios';
import base64 from 'base-64';

const TOKEN_ENDPOINT = 'http://localhost:8080/oauth/token';

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

export default {
  tryLogin,
};
