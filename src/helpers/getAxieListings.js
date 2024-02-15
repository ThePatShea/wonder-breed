import { eyesAndEarsParts } from "./eyesAndEarsParts";
import { getMarketListings } from "./getMarketListings";

export const getAxieListings = (axieClass, partsArray) => {
  return new Promise((resolve, reject) => {
    const parts = eyesAndEarsParts;

    const partsArrayNoEyesNoEars = [...partsArray];
    partsArrayNoEyesNoEars.splice(0,2);

    const partsArrayMain = [...partsArrayNoEyesNoEars];
    const partsArrayInverse = [...partsArrayNoEyesNoEars];

    const eyesClass = partsArray[0];
    const earsClass = partsArray[1];

    parts['eyes'][eyesClass].forEach(part => partsArrayMain.push(part));
    parts['ears'][earsClass].forEach(part => partsArrayMain.push(part));
    parts['eyes'][earsClass].forEach(part => partsArrayInverse.push(part));
    parts['ears'][eyesClass].forEach(part => partsArrayInverse.push(part));

    getMarketListings(axieClass, partsArrayNoEyesNoEars).then(resNoEyesNoEars => {
      getMarketListings(axieClass, partsArrayMain).then(resMain => {
        if (eyesClass !== earsClass) {
          getMarketListings(axieClass, partsArrayInverse).then(resInverse => {
            const resCombined = resMain.concat(resInverse);

            resCombined.sort((a, b) => (parseFloat(a.auction.currentPriceUSD) > parseFloat(b.auction.currentPriceUSD)) ? 1 : -1);


            resolve({ listingsIncludeEyesAndEars: resCombined, listingsIgnoreEyesAndEars: resNoEyesNoEars });
          });
        } else {
          resolve({ listingsIncludeEyesAndEars: resMain, listingsIgnoreEyesAndEars: resNoEyesNoEars });
        }
      });
    });
  });
}
