import axios from 'axios';

export const axieQuery = (query) => new Promise((resolve, reject) => {
  axios
    .post('https://afternoon-brook-49757.herokuapp.com/https://graphql-gateway.axieinfinity.com/graphql', query)
    .then(res => {
      resolve(res.data.data);
    })
    .catch(error => {
      console.error(error);
    });
});
