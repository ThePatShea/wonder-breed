export const displayProbability = (probability) => {
  let percent = (probability * 100).toFixed(2);

  if (percent < 0.01) {
    percent = '< 0.01';
  }

  return percent + '%';
}

export const displayProbabilityCondensed = (probability) => {
  if (probability === 1) {
    return '100%';
  } else if (1 > probability && probability > .99) {
    return '> 99%';
  } else if (0 < probability && probability < 0.01) {
    return '< 1%';
  } else if (0 > probability) {
    return '< 1%'; // This handles glitches that lead to negative probabilities when the probability is so small that it probably messes with the minimum value of a number in Javascript
  } else {
    return (probability * 100).toFixed(0) + '%';
  }
}
