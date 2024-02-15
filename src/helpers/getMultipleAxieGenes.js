import axios from 'axios';

export const getMultipleAxieGenes = (commaAxieIds) => new Promise((resolve, reject) => {
  axios
    .get('https://api.axie.technology/getaxies/' + commaAxieIds)
    .then(res => {
      resolve(res);
    })
    .catch(error => {
      console.error(error);
    });
});
