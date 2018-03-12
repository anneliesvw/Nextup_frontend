import axios from 'axios';

const API_URL = process.env.IMAGE_ENDPOINT;
const IMAGES_URL = `${API_URL}/api/images`;

const getConfig = () => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  return config;
};

const uploadImage = (imageType, file, onSuccess, onError) => {
  axios
    .post(`${IMAGES_URL}/${imageType}`, file, getConfig())
    .then(onSuccess, onError);
};

const updateImage = (imageKey, file, onSuccess, onError) => {
  axios
    .put(`${IMAGES_URL}/${imageKey}`, file, getConfig())
    .then(onSuccess, onError);
};

export default {
  uploadImage,
  updateImage,
};
