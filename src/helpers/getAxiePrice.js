import { eyesAndEarsParts } from "./eyesAndEarsParts";
import { getMarketPrice } from "./getMarketPrice";
import { marketCutoff } from "./marketCutoff";

export const getAxiePrice = (axieClass, floorPrice, partsArray, probability, useFloor = false) => {
  return new Promise((resolve, reject) => {
    if (!useFloor) {
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

      getMarketPrice(axieClass, partsArrayMain).then(resMain => {
        if (eyesClass !== earsClass) {
          getMarketPrice(axieClass, partsArrayInverse).then(resInverse => {
            if (resMain.totalAxies > 0 && resInverse.totalAxies > 0 && resMain.totalAxies + resInverse.totalAxies > marketCutoff) {
              resolve(resMain.price < resInverse.price ? resMain.price : resInverse.price);
            } else if (resMain.totalAxies > marketCutoff && resInverse.totalAxies <= 0) {
              resolve(resMain.price);
            } else if (resMain.totalAxies <= 0 && resInverse.totalAxies > marketCutoff) {
              resolve(resInverse.price);
            }

            getMarketPrice(axieClass, partsArrayNoEyesNoEars).then(resNoEyesNoEars => {
              resolve(resNoEyesNoEars.totalAxies > marketCutoff ? resNoEyesNoEars.price : floorPrice);
            });
          });
        } else {
          if (resMain.totalAxies > marketCutoff) {
            resolve(resMain.price);
          } else {
            getMarketPrice(axieClass, partsArrayNoEyesNoEars).then(resNoEyesNoEars => {
              resolve(resNoEyesNoEars.totalAxies > marketCutoff ? resNoEyesNoEars.price : floorPrice);
            });
          }
        }
      });
    } else {
      resolve(floorPrice);
    }
  });
}
