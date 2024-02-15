import { geneProbabilities } from "./geneProbabilities";

export const getPermutations = (axies) => {
  const childPossibilities = {
    eyes: [],
    ears: [],
    mouth: [],
    horn: [],
    back: [],
    tail: [],
  };

  axies.forEach((axie, i) => {
    Object.keys(axie.genes).forEach((part, i) => {
      Object.values(axie.genes[part]).forEach((name, i) => {
        if (!childPossibilities[part].includes(name)) {
          childPossibilities[part].push(name);
        }
      });
    });
  });

  let childPermutations = [];

  childPossibilities.eyes.forEach((eyesName, i) => {
    childPossibilities.ears.forEach((earsName, j) => {
      childPossibilities.mouth.forEach((mouthName, j) => {
        childPossibilities.horn.forEach((hornName, j) => {
          childPossibilities.back.forEach((backName, j) => {
            childPossibilities.tail.forEach((tailName, j) => {
              childPermutations.push({
                eyes: eyesName,
                ears: earsName,
                mouth: mouthName,
                horn: hornName,
                back: backName,
                tail: tailName,
              });
            });
          });
        });
      });
    });
  });

  const childPermutationsWithClass = [];

  childPermutations.forEach((child, i) => {
    let partProbabilities = {
      eyes: 0,
      ears: 0,
      mouth: 0,
      horn: 0,
      back: 0,
      tail: 0,
    }

    Object.keys(child).forEach((part, i) => {
      axies.forEach((axie, i) => {
        Object.keys(axie.genes[part]).forEach((geneType, i) => {
          if (axie.genes[part][geneType] === child[part]) {
            partProbabilities[part] += geneProbabilities[geneType];
          }
        });
      });
    });

    child.partProbabilities = partProbabilities;
    child.price = 0;

    let overallProbability = 1;

    Object.keys(partProbabilities).forEach((part, i) => {
      overallProbability *= partProbabilities[part];
    });

    if (axies[0].class === axies[1].class) {
      child.probability = overallProbability;
      childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability, class: axies[0].class });
    } else {
      if (
        (axies[0].purity.dominant === 6 && axies[1].purity.dominant === 6) && (
          (axies[0].class === 'Aquatic' && axies[1].class === 'Reptile') ||
          (axies[0].class === 'Reptile' && axies[1].class === 'Aquatic')
        )
      ) {
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 3, class: axies[0].class });
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 3, class: axies[1].class });
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 3, class: 'Dusk' });
      } else if (
        (axies[0].purity.dominant === 6 && axies[1].purity.dominant === 6) && (
          (axies[0].class === 'Bug' && axies[1].class === 'Beast') ||
          (axies[0].class === 'Beast' && axies[1].class === 'Bug')
        )
      ) {
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 3, class: axies[0].class });
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 3, class: axies[1].class });
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 3, class: 'Mech' });
      } else if (
        (axies[0].purity.dominant === 6 && axies[1].purity.dominant === 6) && (
          (axies[0].class === 'Plant' && axies[1].class === 'Bird') ||
          (axies[0].class === 'Bird' && axies[1].class === 'Plant')
        )
      ) {
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 3, class: axies[0].class });
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 3, class: axies[1].class });
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 3, class: 'Dawn' });
      } else {
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 2, class: axies[0].class });
        childPermutationsWithClass.push({ ...child, include: true, probability: overallProbability / 2, class: axies[1].class });
      }
    }
  });

  childPermutationsWithClass.sort((a, b) => (a.probability < b.probability) ? 1 : -1);

  const probablePermutations = [];

  // childPermutationsWithClass.forEach(inputPermutation => probablePermutations.push(inputPermutation));

  for (var i = 0; i < 100; i++) {
    if (!childPermutationsWithClass[i]) {
      break;
    }

    probablePermutations.push(childPermutationsWithClass[i]);
  }

  let cantBreedWarning = '';

  if (axies[0].number === axies[1].number) {
    cantBreedWarning = 'An axie cannot breed with itself';
  } else if (axies[0].parents.indexOf(parseInt(axies[1].number)) > -1 || axies[1].parents.indexOf(parseInt(axies[0].number)) > -1) {
    cantBreedWarning = 'An axie cannot breed with its parent';
  } else if (
    ( // Allows Origin axies to breed with each other (because they have no parents)
      axies[0].parents.indexOf(0) === -1 &&
      axies[1].parents.indexOf(0) === -1
    )
    &&
    (
      axies[0].parents.indexOf(axies[1].parents[0]) > -1 ||
      axies[0].parents.indexOf(axies[1].parents[1]) > -1 ||
      axies[1].parents.indexOf(axies[0].parents[0]) > -1 ||
      axies[1].parents.indexOf(axies[0].parents[1]) > -1
    )
  ) {
    cantBreedWarning = 'An axie cannot breed with its sibling';
  } else if (axies[0].breedCount >= 7 || axies[1].breedCount >= 7) {
    cantBreedWarning = 'An axie cannot breed over 7 times';
  }

  return { permutations: probablePermutations, cantBreedWarning };
}
