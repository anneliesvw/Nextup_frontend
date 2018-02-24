import axios from 'axios';

const API_URL = process.env.IMAGE_ENDPOINT;
const IMAGES_URL = `${API_URL}/api/images`;

const uploadImage = (imageType, file, onSuccess, onError) => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  axios
    .post(`${IMAGES_URL}/${imageType}`, file, config)
    .then(onSuccess, onError);
};

export default {
  uploadImage,
};
