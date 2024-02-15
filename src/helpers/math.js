export const factorial = (num) => {
  if (num === 0) {
    return 1;
  }

  let total = num;

  for (var i = num - 1; i > 1; i--) {
    total *= i;
  }

  return total;
}

export const binomialDistribution = (probability, totalTrials, trialNum) => {
  return (factorial(totalTrials)/(factorial(trialNum) * factorial(totalTrials - trialNum))) * Math.pow(probability, trialNum) * Math.pow(1 - probability, totalTrials - trialNum);
};

export const cumulativeDistribution = (probability, totalTrials, numSuccesses) => {
  let total = 0;

  for (var i = 0; i < numSuccesses; i++) {
    total += binomialDistribution(probability, totalTrials, i);
  }

  return total;
};

export const successProbability = (probability, totalTrials, numSuccesses) => {
  return 1 - cumulativeDistribution(probability, totalTrials, numSuccesses);
}
