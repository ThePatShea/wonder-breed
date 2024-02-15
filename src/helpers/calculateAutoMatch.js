import { factorial, binomialDistribution, cumulativeDistribution, successProbability } from './math';
import { geneProbabilities as dGeneProb } from './geneProbabilities';

const prob = {
  back: {
    d: dGeneProb,
    r1: {
      d: 0.0987413194444444,
      r1: 0.25390625,
      r2: 0.0987413194444444,
      m: 0.0972222222222222,
    },
    r2: {
      d: 0,
      r1: 0.118136935763888,
      r2: 0.333251953125,
      m: 0.0972222222222222,
    },
  },
  horn: {
    d: dGeneProb,
    r1: {
      d: 0.0987413194444444,
      r1: 0.25390625,
      r2: 0.0987413194444444,
      m: 0.0972222222222222,
    },
    r2: {
      d: 0,
      r1: 0.118136935763888,
      r2: 0.333251953125,
      m: 0.0972222222222222,
    },
  },
  tail: {
    d: dGeneProb,
    r1: {
      d: 0.0987413194444444,
      r1: 0.25390625,
      r2: 0.0987413194444444,
      m: 0.0972222222222222,
    },
    r2: {
      d: 0,
      r1: 0.118136935763888,
      r2: 0.333251953125,
      m: 0.0972222222222222,
    },
  },
  ears: {
    d: dGeneProb,
    r1: {
      d: 0.0987413194444444,
      r1: 0.25390625,
      r2: 0.0987413194444444,
      m: 0.0972222222222222,
    },
    r2: {
      d: 0,
      r1: 0.118136935763888,
      r2: 0.333251953125,
      m: 0.0972222222222222,
    },
  },
  mouth: {
    d: dGeneProb,
    r1: {
      d: 0.0988932291666666,
      r1: 0.254296875,
      r2: 0.0988932291666666,
      m: 0.0958333333333333,
    },
    r2: {
      d: 0,
      r1: 0.118318684895833,
      r2: 0.3337646484375,
      m: 0.0958333333333333,
    },
  },
  eyes: {
    d: dGeneProb,
    r1: {
      d: 0.0988932291666666,
      r1: 0.254296875,
      r2: 0.0988932291666666,
      m: 0.0958333333333333,
    },
    r2: {
      d: 0,
      r1: 0.118318684895833,
      r2: 0.3337646484375,
      m: 0.0958333333333333,
    },
  },
};


export const calculateAutoMatch = (userAxies, targetBodyParts) => {
  const ideals = {
    mouth: [],
    horn: [],
    back: [],
    tail: [],
    eyes: [],
    ears: [],
  };

  targetBodyParts.forEach(target => {
    ideals[target.partType].push(target.partTypeAndPart);
  });

  const processedAxies = [];

  let pushCounter = 0;

  userAxies.forEach((axie, i) => {
    const processedAxie = {
      breedCount: axie.breedCount,
      parents: axie.parents,
      name: axie.name,
      id: axie.id,
      mouth: {
        d: ideals.mouth.length === 0 ? 0.5 : prob.mouth.d.d * (ideals.mouth.indexOf(axie.genes.mouth.d.partId) > -1) + prob.mouth.d.r1 * (ideals.mouth.indexOf(axie.genes.mouth.r1.partId) > -1) + prob.mouth.d.r2 * (ideals.mouth.indexOf(axie.genes.mouth.r2.partId) > -1),
        r1: ideals.mouth.length === 0 ? 0.5 : prob.mouth.r1.d * (ideals.mouth.indexOf(axie.genes.mouth.d.partId) > -1) + prob.mouth.r1.r1 * (ideals.mouth.indexOf(axie.genes.mouth.r1.partId) > -1) + prob.mouth.r1.r2 * (ideals.mouth.indexOf(axie.genes.mouth.r2.partId) > -1),
        r2: ideals.mouth.length === 0 ? 0.5 : prob.mouth.r2.d * (ideals.mouth.indexOf(axie.genes.mouth.d.partId) > -1) + prob.mouth.r2.r1 * (ideals.mouth.indexOf(axie.genes.mouth.r1.partId) > -1) + prob.mouth.r2.r2 * (ideals.mouth.indexOf(axie.genes.mouth.r2.partId) > -1),
      },
      horn: {
        d: ideals.horn.length === 0 ? 0.5 : prob.horn.d.d * (ideals.horn.indexOf(axie.genes.horn.d.partId) > -1) + prob.horn.d.r1 * (ideals.horn.indexOf(axie.genes.horn.r1.partId) > -1) + prob.horn.d.r2 * (ideals.horn.indexOf(axie.genes.horn.r2.partId) > -1),
        r1: ideals.horn.length === 0 ? 0.5 : prob.horn.r1.d * (ideals.horn.indexOf(axie.genes.horn.d.partId) > -1) + prob.horn.r1.r1 * (ideals.horn.indexOf(axie.genes.horn.r1.partId) > -1) + prob.horn.r1.r2 * (ideals.horn.indexOf(axie.genes.horn.r2.partId) > -1),
        r2: ideals.horn.length === 0 ? 0.5 : prob.horn.r2.d * (ideals.horn.indexOf(axie.genes.horn.d.partId) > -1) + prob.horn.r2.r1 * (ideals.horn.indexOf(axie.genes.horn.r1.partId) > -1) + prob.horn.r2.r2 * (ideals.horn.indexOf(axie.genes.horn.r2.partId) > -1),
      },
      back: {
        d: ideals.back.length === 0 ? 0.5 : prob.back.d.d * (ideals.back.indexOf(axie.genes.back.d.partId) > -1) + prob.back.d.r1 * (ideals.back.indexOf(axie.genes.back.r1.partId) > -1) + prob.back.d.r2 * (ideals.back.indexOf(axie.genes.back.r2.partId) > -1),
        r1: ideals.back.length === 0 ? 0.5 : prob.back.r1.d * (ideals.back.indexOf(axie.genes.back.d.partId) > -1) + prob.back.r1.r1 * (ideals.back.indexOf(axie.genes.back.r1.partId) > -1) + prob.back.r1.r2 * (ideals.back.indexOf(axie.genes.back.r2.partId) > -1),
        r2: ideals.back.length === 0 ? 0.5 : prob.back.r2.d * (ideals.back.indexOf(axie.genes.back.d.partId) > -1) + prob.back.r2.r1 * (ideals.back.indexOf(axie.genes.back.r1.partId) > -1) + prob.back.r2.r2 * (ideals.back.indexOf(axie.genes.back.r2.partId) > -1),
      },
      tail: {
        d: ideals.tail.length === 0 ? 0.5 : prob.tail.d.d * (ideals.tail.indexOf(axie.genes.tail.d.partId) > -1) + prob.tail.d.r1 * (ideals.tail.indexOf(axie.genes.tail.r1.partId) > -1) + prob.tail.d.r2 * (ideals.tail.indexOf(axie.genes.tail.r2.partId) > -1),
        r1: ideals.tail.length === 0 ? 0.5 : prob.tail.r1.d * (ideals.tail.indexOf(axie.genes.tail.d.partId) > -1) + prob.tail.r1.r1 * (ideals.tail.indexOf(axie.genes.tail.r1.partId) > -1) + prob.tail.r1.r2 * (ideals.tail.indexOf(axie.genes.tail.r2.partId) > -1),
        r2: ideals.tail.length === 0 ? 0.5 : prob.tail.r2.d * (ideals.tail.indexOf(axie.genes.tail.d.partId) > -1) + prob.tail.r2.r1 * (ideals.tail.indexOf(axie.genes.tail.r1.partId) > -1) + prob.tail.r2.r2 * (ideals.tail.indexOf(axie.genes.horn.r2.partId) > -1),
      },
      eyes: {
        d: ideals.eyes.length === 0 ? 0.5 : prob.eyes.d.d * (ideals.eyes.indexOf(axie.genes.eyes.d.partId) > -1) + prob.eyes.d.r1 * (ideals.eyes.indexOf(axie.genes.eyes.r1.partId) > -1) + prob.eyes.d.r2 * (ideals.eyes.indexOf(axie.genes.eyes.r2.partId) > -1),
        r1: ideals.eyes.length === 0 ? 0.5 : prob.eyes.r1.d * (ideals.eyes.indexOf(axie.genes.eyes.d.partId) > -1) + prob.eyes.r1.r1 * (ideals.eyes.indexOf(axie.genes.eyes.r1.partId) > -1) + prob.eyes.r1.r2 * (ideals.eyes.indexOf(axie.genes.eyes.r2.partId) > -1),
        r2: ideals.eyes.length === 0 ? 0.5 : prob.eyes.r2.d * (ideals.eyes.indexOf(axie.genes.eyes.d.partId) > -1) + prob.eyes.r2.r1 * (ideals.eyes.indexOf(axie.genes.eyes.r1.partId) > -1) + prob.eyes.r2.r2 * (ideals.eyes.indexOf(axie.genes.eyes.r2.partId) > -1),
      },
      ears: {
        d: ideals.ears.length === 0 ? 0.5 : prob.ears.d.d * (ideals.ears.indexOf(axie.genes.ears.d.partId) > -1) + prob.ears.d.r1 * (ideals.ears.indexOf(axie.genes.ears.r1.partId) > -1) + prob.ears.d.r2 * (ideals.ears.indexOf(axie.genes.ears.r2.partId) > -1),
        r1: ideals.ears.length === 0 ? 0.5 : prob.ears.r1.d * (ideals.ears.indexOf(axie.genes.ears.d.partId) > -1) + prob.ears.r1.r1 * (ideals.ears.indexOf(axie.genes.ears.r1.partId) > -1) + prob.ears.r1.r2 * (ideals.ears.indexOf(axie.genes.ears.r2.partId) > -1),
        r2: ideals.ears.length === 0 ? 0.5 : prob.ears.r2.d * (ideals.ears.indexOf(axie.genes.ears.d.partId) > -1) + prob.ears.r2.r1 * (ideals.ears.indexOf(axie.genes.ears.r1.partId) > -1) + prob.ears.r2.r2 * (ideals.ears.indexOf(axie.genes.ears.r2.partId) > -1),
      },
    };

    processedAxie.overall = {
      d: (processedAxie.mouth.d * 2) * (processedAxie.horn.d * 2) * (processedAxie.back.d * 2) * (processedAxie.tail.d * 2) * (processedAxie.eyes.d * 2) * (processedAxie.ears.d * 2),
      r1: (processedAxie.mouth.r1 * 2) * (processedAxie.horn.r1 * 2) * (processedAxie.back.r1 * 2) * (processedAxie.tail.r1 * 2) * (processedAxie.eyes.r1 * 2) * (processedAxie.ears.r1 * 2),
      r2: (processedAxie.mouth.r2 * 2) * (processedAxie.horn.r2 * 2) * (processedAxie.back.r2 * 2) * (processedAxie.tail.r2 * 2) * (processedAxie.eyes.r2 * 2) * (processedAxie.ears.r2 * 2),
    };

    if (processedAxie.overall.d >= .01) {
      pushCounter++;
      processedAxies.push(processedAxie);
    }
  });

  const breeds = [];

  for (let i = 0; i < processedAxies.length; i++) {
    for (let j = i + 1; j < processedAxies.length; j++) {
      if (processedAxies[i].id === processedAxies[j].id) {
        continue; // An axie cannot breed with itself
      } else if (processedAxies[i].parents.indexOf(parseInt(processedAxies[j].id)) > -1 || processedAxies[j].parents.indexOf(parseInt(processedAxies[i].id)) > -1) {
        continue; // An axie cannot breed with its parent
      } else if (
        ( // Allows Origin axies to breed with each other (because they have no parents)
          processedAxies[i].parents.indexOf(0) === -1 &&
          processedAxies[j].parents.indexOf(0) === -1
        )
        &&
        (
          processedAxies[i].parents.indexOf(processedAxies[j].parents[0]) > -1 ||
          processedAxies[i].parents.indexOf(processedAxies[j].parents[1]) > -1 ||
          processedAxies[j].parents.indexOf(processedAxies[i].parents[0]) > -1 ||
          processedAxies[j].parents.indexOf(processedAxies[i].parents[1]) > -1
        )
      ) {
        continue; // An axie cannot breed with its sibling
      } else if (processedAxies[i].breedCount >= 7 || processedAxies[j].breedCount >= 7) {
        continue; // An axie cannot breed over 7 times
      }

      const child = {
        mouth: {
          d: processedAxies[i].mouth.d + processedAxies[j].mouth.d,
          r1: processedAxies[i].mouth.r1 + processedAxies[j].mouth.r1,
          r2: processedAxies[i].mouth.r2 + processedAxies[j].mouth.r2,
        },
        horn: {
          d: processedAxies[i].horn.d + processedAxies[j].horn.d,
          r1: processedAxies[i].horn.r1 + processedAxies[j].horn.r1,
          r2: processedAxies[i].horn.r2 + processedAxies[j].horn.r2,
        },
        back: {
          d: processedAxies[i].back.d + processedAxies[j].back.d,
          r1: processedAxies[i].back.r1 + processedAxies[j].back.r1,
          r2: processedAxies[i].back.r2 + processedAxies[j].back.r2,
        },
        tail: {
          d: processedAxies[i].tail.d + processedAxies[j].tail.d,
          r1: processedAxies[i].tail.r1 + processedAxies[j].tail.r1,
          r2: processedAxies[i].tail.r2 + processedAxies[j].tail.r2,
        },
        eyes: {
          d: processedAxies[i].eyes.d + processedAxies[j].eyes.d,
          r1: processedAxies[i].eyes.r1 + processedAxies[j].eyes.r1,
          r2: processedAxies[i].eyes.r2 + processedAxies[j].eyes.r2,
        },
        ears: {
          d: processedAxies[i].ears.d + processedAxies[j].ears.d,
          r1: processedAxies[i].ears.r1 + processedAxies[j].ears.r1,
          r2: processedAxies[i].ears.r2 + processedAxies[j].ears.r2,
        },
      };

      let newBreed = {
        axie1: processedAxies[i].id,
        axie2: processedAxies[j].id,
        axie1BreedCount: processedAxies[i].breedCount,
        axie2BreedCount: processedAxies[j].breedCount,
        probabilities: [
          [{
            d: child.mouth.d * child.horn.d * child.back.d * child.tail.d * child.eyes.d * child.ears.d,
            r1: child.mouth.r1 * child.horn.r1 * child.back.r1 * child.tail.r1 * child.eyes.r1 * child.ears.r1,
            r2: child.mouth.r2 * child.horn.r2 * child.back.r2 * child.tail.r2 * child.eyes.r2 * child.ears.r2,
          }],
          [], [], [], [], [], []
        ],
      };

      newBreed.probabilities[0][0].p = newBreed.probabilities[0][0].d * newBreed.probabilities[0][0].r1 * newBreed.probabilities[0][0].r2;
      newBreed.probabilities[0][0].g = (newBreed.probabilities[0][0].d * dGeneProb.d) + (newBreed.probabilities[0][0].r1 * dGeneProb.r1) + (newBreed.probabilities[0][0].r2 * dGeneProb.r2);

      breeds.push(newBreed);
    }
  }

  breeds.sort((a,b) => {
    return b.probabilities[0][0].d - a.probabilities[0][0].d;
  });


  breeds.forEach(breed => {
    const initialProb = breed.probabilities[0][0];

    for (var i = 1; i < 7; i++) {
      for (var j = 0; j <= i; j++) {
        breed.probabilities[i][j] = {
          d: successProbability(initialProb.d, i + 1, j + 1),
          r1: successProbability(initialProb.r1, i + 1, j + 1),
          r2: successProbability(initialProb.r2, i + 1, j + 1),
          p: successProbability(initialProb.p, i + 1, j + 1),
          g: successProbability(initialProb.g, i + 1, j + 1),
        };
      }
    }
  });

  const possibleBreeds = [];

  breeds.forEach(breed => {
    if (breed.probabilities[0][0].d > 0) {
      possibleBreeds.push(breed);
    }
  });

  return possibleBreeds;
};
