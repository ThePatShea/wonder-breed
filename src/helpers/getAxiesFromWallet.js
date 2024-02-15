import { axieQuery } from "./axieQuery";

export const getAxiesFromWallet = (ownerId, prevResults = [], offset = 0) => {
  if (ownerId.substring(0,5) === 'ronin') {
    ownerId = '0x' + ownerId.substring(6,ownerId.length);
  }

  return new Promise((resolve, reject) => {
    axieQuery({
      "operationName": "GetAxieBriefList",
      "variables": {
        owner: ownerId,
        from: offset,
        size: 100,
      },
      "query": "query GetAxieBriefList($criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\n  axies(criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\n    total\n    results {\n      ...AxieBrief\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieBrief on Axie {\n  id\n  name\n  stage\n  class\n  breedCount\n  image\n  title\n  battleInfo {\n    banned\n    __typename\n  }\n  parts {\n    id\n    name\n    class\n    type\n    specialGenes\n    __typename\n  }\n  __typename\n}\n"
    }).then(res => {
      const newResults = res.axies.results;
      const allRestuls = prevResults.concat(newResults);

      if (newResults.length < 100) {
        resolve(allRestuls);
      } else {
        resolve(getAxiesFromWallet(ownerId, allRestuls, offset + 100));
      }
    });
  });
}
