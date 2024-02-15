import { getMarketPrice } from "./getMarketPrice";

export const getFloorPrice = (axieClass) => {
  return new Promise((resolve, reject) => {
    getMarketPrice(axieClass).then(res => resolve(res.price));
  });
}
