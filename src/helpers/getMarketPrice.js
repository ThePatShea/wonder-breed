import { axieQuery } from "./axieQuery";
import { marketCutoff } from "./marketCutoff";

export const getMarketPrice = (axieClass, partsArray = []) => {
  return new Promise((resolve, reject) => {
    axieQuery({
      "operationName": "GetAxieBriefList",
      "variables": {
        "from": 0,
        "size": marketCutoff + 1,
        "sort": "PriceAsc",
        "auctionType": "Sale",
        "criteria": {
          classes: axieClass,
          parts: partsArray,
        }
      },
      "query": "query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\n    total\n    results {\n      ...AxieBrief\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieBrief on Axie {\n  id\n  name\n  stage\n  class\n  breedCount\n  image\n  title\n  battleInfo {\n    banned\n    __typename\n  }\n  auction {\n    currentPrice\n    currentPriceUSD\n    __typename\n  }\n  parts {\n    id\n    name\n    class\n    type\n    specialGenes\n    __typename\n  }\n  __typename\n}\n"
    }).then(res => {
      const { results } = res.axies;

      let price = 0;

      if (results.length > 0) {
        price = parseFloat(results[0].auction.currentPriceUSD);
      }

      resolve({ totalAxies: results.length, price });
    });
  });
}
