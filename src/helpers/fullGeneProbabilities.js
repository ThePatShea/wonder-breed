const axieSet = {
  'childD': {
    'parentD': [
      {
        coinFlips: [1],
        probabilityEvent: 1/2,
        probabilityInherit: 3/4,
      },
      {
        coinFlips: [0],
        probabilityEvent: 1/2,
        probabilityInherit: 0,
      },
    ],
    'parentR1': [
      {
        coinFlips: [1],
        probabilityEvent: 1/2,
        probabilityInherit: 3/16,
      },
      {
        coinFlips: [0],
        probabilityEvent: 1/2,
        probabilityInherit: 0,
      },
    ],
    'parentR2': [
      {
        coinFlips: [1],
        probabilityEvent: 1/2,
        probabilityInherit: 1/16,
      },
      {
        coinFlips: [0],
        probabilityEvent: 1/2,
        probabilityInherit: 0,
      },
    ],
  },
  'childR1': {
    'parentD': [
      {
        coinFlips: [0, 1],
        probabilityEvent: 1/4,
        probabilityInherit: 3/16,
      },
      {
        coinFlips: [0, 0],
        probabilityEvent: 1/4,
        probabilityInherit: 0,
      },
      {
        coinFlips: [1, 0],
        probabilityEvent: 1/4,
        probabilityInherit: 0,
      },
      {
        coinFlips: [1, 1],
        event: `this parent's D gene was inherited to the child's D gene`,
        probabilityEvent: (1/4) * (3/4),
        probabilityInherit: 0,
      },
      {
        coinFlips: [1, 1],
        event: `this parent's D gene was NOT inherited to the child's D gene`,
        probabilityEvent: (1/4) * (1/4),
        probabilityInherit: 1,
      },
    ],
    'parentR1': [
      {
        coinFlips: [0, 1],
        probabilityEvent: 1/4,
        probabilityInherit: 9/16,
      },
      {
        coinFlips: [0, 0],
        probabilityEvent: 1/4,
        probabilityInherit: 0,
      },
      {
        coinFlips: [1, 0],
        probabilityEvent: 1/4,
        probabilityInherit: 0,
      },
      {
        coinFlips: [1, 1],
        event: `this parent's D gene was inherited to the child's D gene`,
        probabilityEvent: (1/4) * (3/4),
        probabilityInherit: 3/4,
      },
      {
        coinFlips: [1, 1],
        event: `this parent's D gene was NOT inherited to the child's D gene`,
        probabilityEvent: (1/4) * (1/4),
        probabilityInherit: 0,
      },
    ],
    'parentR2': [
      {
        coinFlips: [0, 1],
        probabilityEvent: 1/4,
        probabilityInherit: 4/16,
      },
      {
        coinFlips: [0, 0],
        probabilityEvent: 1/4,
        probabilityInherit: 0,
      },
      {
        coinFlips: [1, 0],
        probabilityEvent: 1/4,
        probabilityInherit: 0,
      },
      {
        coinFlips: [1, 1],
        event: `this parent's D gene was inherited to the child's D gene`,
        probabilityEvent: (1/4) * (3/4),
        probabilityInherit: 1/4,
      },
      {
        coinFlips: [1, 1],
        event: `this parent's D gene was NOT inherited to the child's D gene`,
        probabilityEvent: (1/4) * (1/4),
        probabilityInherit: 0,
      },
    ],
  },
  'childR2': {
    'parentD': [
      {
        event: `all events`,
        probabilityEvent: 1,
        probabilityInherit: 0,
      },
    ],
    'parentR1': [
      {
        event: `the coin flip ends up on a parent that the child still hasn't inherited any of the R genes from`,
        probabilityEvent: ((1/8) * (1)) + ((1/8) * (3/16)) + ((1/8) * (3/4)),
        probabilityInherit: 1/4,
      },
      {
        event: `the child already inherited this parent's R2 gene`,
        probabilityEvent: ((1/8) * (1/16)) + ((1/8) * (4/16)) + ((1/8) * ((1/16) + ((3/4) * (1/4)))),
        probabilityInherit: 1,
      },
    ],
    'parentR2': [
      {
        event: `the coin flip ends up on a parent that the child still hasn't inherited any of the R genes from`,
        probabilityEvent: ((1/8) * (1)) + ((1/8) * (3/16)) + ((1/8) * (3/4)),
        probabilityInherit: 3/4,
      },
      {
        event: `the child already inherited this parent's R1 gene`,
        probabilityEvent: ((1/8) * (3/16)) + ((1/8) * (9/16)) + ((1/8) * ((3/16) + ((3/4) * (3/4)))),
        probabilityInherit: 1,
      },
    ],
  }
};

const fullGeneProbabilities = {};

Object.keys(axieSet).forEach(childGene => {
  fullGeneProbabilities[childGene] = {};
  Object.keys(axieSet[childGene]).forEach(parentGene => {
    let geneProbability = 0;

    axieSet[childGene][parentGene].forEach(geneEvent => geneProbability += (geneEvent.probabilityEvent * geneEvent.probabilityInherit));

    fullGeneProbabilities[childGene][parentGene] = geneProbability;
  });
});

console.log('fullGeneProbabilities - No Mutations:');
console.log(fullGeneProbabilities);

const completeProbabilities = {
  'childD': {
    'sireD': fullGeneProbabilities['childD']['parentD'],
    'sireR1': fullGeneProbabilities['childD']['parentR1'],
    'sireR2': fullGeneProbabilities['childD']['parentR2'],
    'matronD': fullGeneProbabilities['childD']['parentD'],
    'matronR1': fullGeneProbabilities['childD']['parentR1'],
    'matronR2': fullGeneProbabilities['childD']['parentR2'],
    'mutation': 0,
  },
  'childR1': {},
  'childR2': {},
};

const selfMutationOdds = {
  'Back / Horn / Tail / Ears': (1/36) * 0.1,
  'Mouth / Eyes': (1/24) * 0.1,
};

['childR1', 'childR2'].forEach(childGene => {
  Object.keys(selfMutationOdds).forEach(partSet => {
    completeProbabilities[childGene][partSet] = { 'sireD': 0, 'sireR1': 0, 'sireR2': 0, 'matronD': 0, 'matronR1': 0, 'matronR2': 0, 'mutation': 0, };

    Object.keys(fullGeneProbabilities[childGene]).forEach(parentGene => {
      const geneType = parentGene.substring(6,parentGene.length);
      completeProbabilities[childGene][partSet]['sire' + geneType] = fullGeneProbabilities[childGene][parentGene] * (0.9 + selfMutationOdds[partSet]);
      completeProbabilities[childGene][partSet]['matron' + geneType] = completeProbabilities[childGene][partSet]['sire' + geneType];
    });

    completeProbabilities[childGene][partSet]['mutation'] = 1 - (0.9 + selfMutationOdds[partSet]);
  });
});


console.log('\n');
console.log('fullGeneProbabilities - Complete Mutations:');
console.log(fullGeneProbabilities);
console.log('\n\n\n');
console.log('completeProbabilities:');
console.log(completeProbabilities);


/*

Total Cards:

Back: 36
Horn: 36
Tail: 36
Ears: 36
Mouth: 24
Eyes: 24

*/


/*
`the child already inherited this parent's R1 gene`
((1/8) * (3/16)) + ((1/8) * (9/16)) + ((1/8) * ((3/16) + ((3/4) * (3/4))))
101 - (1/8) * (3/16)
011 - (1/8) * (9/16)
111 - (1/8) * ( (3/16) + ((3/4) * (3/4)) )




`the child already inherited this parent's R2 gene`
((1/8) * (1/16)) + ((1/8) * (4/16)) + ((1/8) * ((1/16) + ((3/4) * (1/4))))


101 - (1/8) * (1/16)
011 - (1/8) * (4/16)
111 - (1/8) * ( (1/16) + ((3/4) * (1/4)) )


`the coin flip ends up on a parent that the child still hasn't inherited any of the R genes from`
001 - (1/8) * (1)
011 - (1/8) * (3/16)
101 - (1/8) * (3/4)

000
110
100
010
111
*/
