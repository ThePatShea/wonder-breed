import { getAxiePrice } from "./getAxiePrice";

export async function getPossibleAxies(axieClass, floorPrice, permutations) {
  const possibleAxies = [];

  for (var i = 0; i < permutations.length; i++) {
    const permutation = permutations[i];
    const partsArray = [permutation.eyes, permutation.ears, permutation.mouth, permutation.horn, permutation.back, permutation.tail];

    const price = await getAxiePrice(axieClass, floorPrice, partsArray, permutation.probability);

    possibleAxies.push({
      probability: permutation.probability,
      parts: partsArray,
      price: price,
    });
  }

  return possibleAxies;
}
