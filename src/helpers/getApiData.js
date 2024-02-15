const axios = require('axios');

export const getApiData = (url) => new Promise((resolve, reject) => {
  axios
    .get(url)
    .then(res => {
      resolve(res.data);
    })
    .catch(error => {
      console.error(error);
    });
});
