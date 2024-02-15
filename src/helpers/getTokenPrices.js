import { getApiData } from './getApiData';

export const getTokenPrices = (url) => new Promise((resolve, reject) => {
  getApiData('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion,axie-infinity&vs_currencies=usd').then(data => {
    resolve({
      slp: data['smooth-love-potion']['usd'],
      axs: data['axie-infinity']['usd'],
    });
  });
});
