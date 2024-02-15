import React, { useState } from 'react';
import { getAxieInfo } from '../../helpers/getAxieInfo';
import { getPermutations } from '../../helpers/getPermutations';
import { getAxieListings } from '../../helpers/getAxieListings';
import { getAxiePrice } from '../../helpers/getAxiePrice';
import { getFloorPrice } from '../../helpers/getFloorPrice';
import { getTokenPrices } from '../../helpers/getTokenPrices';
import { breedingCosts } from '../../helpers/breedingCosts';
import { geneProbabilities } from '../../helpers/geneProbabilities';
import ExpectedValue from '../ExpectedValue/ExpectedValue';
import ProfitTable from '../ProfitTable/ProfitTable';
import RightSidebar from '../RightSidebar/RightSidebar';
import LeftSidebar from '../LeftSidebar/LeftSidebar';
import AnalysisTabs from '../AnalysisTabs/AnalysisTabs';
import { Card, Typography, Box } from '@mui/material';

import '../../styles/Universal.scss';

const constructAxie = (axie) => {
  let overallPurity = 0;

  [axie.genes.eyes, axie.genes.ears, axie.genes.mouth, axie.genes.horn, axie.genes.back, axie.genes.tail].forEach(geneSet => {
    ['d', 'r1', 'r2'].forEach(gene => overallPurity += geneSet[gene].cls === axie.genes.cls ? geneProbabilities[gene] / 3 : 0);
  });

  const purity = {
    dominant: [axie.genes.eyes, axie.genes.ears, axie.genes.mouth, axie.genes.horn, axie.genes.back, axie.genes.tail].filter(geneSet => geneSet.d.cls === axie.genes.cls).length,
    overall: overallPurity,
  }

  return {
    number: axie.details.id,
    class: axie.details.class,
    children: axie.details.children,
    parents: [axie.details.matronId, axie.details.sireId],
    breedCount: axie.details.breedCount,
    image: axie.details.image,
    allGenes: axie.genes,
    purity: purity,
    genes: {
      eyes: {
        d: axie.genes.eyes.d.cls, // Change from cls to partId for Axie Origin
        r1: axie.genes.eyes.r1.cls, // Change from cls to partId for Axie Origin
        r2: axie.genes.eyes.r2.cls, // Change from cls to partId for Axie Origin
      },
      ears: {
        d: axie.genes.ears.d.cls, // Change from cls to partId for Axie Origin
        r1: axie.genes.ears.r1.cls, // Change from cls to partId for Axie Origin
        r2: axie.genes.ears.r2.cls, // Change from cls to partId for Axie Origin
      },
      mouth: {
        d: axie.genes.mouth.d.partId,
        r1: axie.genes.mouth.r1.partId,
        r2: axie.genes.mouth.r2.partId,
      },
      horn: {
        d: axie.genes.horn.d.partId,
        r1: axie.genes.horn.r1.partId,
        r2: axie.genes.horn.r2.partId,
      },
      back: {
        d: axie.genes.back.d.partId,
        r1: axie.genes.back.r1.partId,
        r2: axie.genes.back.r2.partId,
      },
      tail: {
        d: axie.genes.tail.d.partId,
        r1: axie.genes.tail.r1.partId,
        r2: axie.genes.tail.r2.partId,
      },
    }
  }
};


const getExpectedPrice = (permutations, floorPrice) => {
  let expectedPrice = 0;
  let totalProbability = 0;
  let includedProbability = 0;

  permutations.forEach(permutation => {
    totalProbability += permutation.probability;

    if (permutation.include) {
      const insertPrice = permutation.customPrice ? permutation.customPrice : permutation.price;

      expectedPrice += insertPrice * permutation.probability;
      includedProbability += permutation.probability;
    }
  });

  const remainingProbability = 1 - totalProbability;
  includedProbability += remainingProbability;

  expectedPrice += floorPrice * remainingProbability;
  expectedPrice = expectedPrice / includedProbability;

  return expectedPrice;
}


const PairSimulator = (props) => {
  const [expectedPrice, setExpectedPrice] = useState(0);
  const [permutations, setPermutations] = useState(0);
  const [floorPrice, setFloorPrice] = useState(0);
  const [newAxie1, setNewAxie1] = useState('');
  const [newAxie2, setNewAxie2] = useState('');
  const [axie1, setAxie1] = useState(0);
  const [axie2, setAxie2] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [pricesCollected, setPricesCollected] = useState(false);
  const [tokenPrices, setTokenPrices] = useState(null);
  const [axieBreedingCosts, setAxieBreedingCosts] = useState(null);
  const [selectedPermutation, setSelectedPermutation] = useState(null);
  const [marketListings, setMarketListings] = useState([]);
  const [ignoreEyesAndEars, setIgnoreEyesAndEars] = useState(false);
  const [breedCountRange, setBreedCountRange] = useState([0,7]);
  const [cantBreedWarning, setCantBreedWarning] = useState('');
  const [axieListItems, setAxieListItems] = useState([]);
  const axieClass = axie1.class;

  const axie1Query = 'axie1=';
  let axie1FromUrl = '';

  if (props.location.search.indexOf(axie1Query) > -1) {
    axie1FromUrl = props.location.search.substring(props.location.search.indexOf(axie1Query) + axie1Query.length, props.location.search.indexOf('&'));
  }


  const axie2Query = 'axie2=';
  let axie2FromUrl = '';

  if (props.location.search.indexOf(axie2Query) > -1) {
    axie2FromUrl = props.location.search.substring(props.location.search.indexOf(axie2Query) + axie2Query.length, props.location.search.lastIndexOf('&'));

  }

  const updateAxies = () => {
    setSelectedPermutation(null);
    setIgnoreEyesAndEars(false);
    setAxieBreedingCosts(null);
    setPricesCollected(false);
    setBreedCountRange([0,7]);
    setMarketListings([]);
    setAxieListItems([]);
    setTokenPrices(null);
    setFirstLoad(false);
    setExpectedPrice(0);
    setPermutations(0);
    setFloorPrice(0);
    setAxie1(0);
    setAxie2(0);
  }

  if (!newAxie1 && axie1FromUrl) {
    setNewAxie1(axie1FromUrl);
  }

  if (!newAxie2 && axie2FromUrl) {
    setNewAxie2(axie2FromUrl);
  }

  if (firstLoad && axie1FromUrl && axie2FromUrl && newAxie1 && newAxie2) {
    updateAxies();
  }

  if (!tokenPrices) {
    getTokenPrices().then(res => {
      let newAxieBreedingCosts = {};

      Object.keys(breedingCosts).forEach(breedNum => {
        newAxieBreedingCosts[breedNum] = { ...breedingCosts[breedNum], usd: (breedingCosts[breedNum].slp * res.slp) + (breedingCosts[breedNum].axs * res.axs) };
      });

      setTokenPrices(res);
      setAxieBreedingCosts(newAxieBreedingCosts);
    });
  }

  if (!firstLoad && !axie1 && newAxie1) {
    getAxieInfo(newAxie1).then(res => setAxie1(constructAxie(res)));
  }

  if (!firstLoad && !axie2 && newAxie2) {
    getAxieInfo(newAxie2).then(res => setAxie2(constructAxie(res)));
  }

  if (!firstLoad && axie1 && axie2 && !permutations) {
    const permutationRes = getPermutations([axie1, axie2]);

    setCantBreedWarning(permutationRes.cantBreedWarning);
    setPermutations(permutationRes.permutations);
  }

  if (permutations && selectedPermutation === null) {
    setSelectedPermutation(0);
  }

  if (axie1 && floorPrice === 0) {
    getFloorPrice(axieClass).then(res => setFloorPrice(res));
  }

  if (permutations && permutations.filter(permutation => !permutation.price).length === 0 && expectedPrice === 0) {
    setExpectedPrice(getExpectedPrice(permutations, floorPrice));
  }

  if (!pricesCollected && permutations && floorPrice) {
    setPricesCollected(true);

    permutations.forEach((permutation, i) => {
      if (permutation.price === 0) {
        getAxiePrice(
          permutation.class,
          floorPrice,
          [permutation.eyes, permutation.ears, permutation.mouth, permutation.horn, permutation.back, permutation.tail],
          permutation.probability,
          i > 25,
        ).then(res => {
          let newPermutations = permutations;
          newPermutations[i].price = parseFloat(res).toFixed(2);

          setPermutations(newPermutations);

          if (newPermutations.filter(permutation => !permutation.price).length === 0 && expectedPrice === 0) {
            setExpectedPrice(getExpectedPrice(newPermutations, floorPrice));
          }
        });
      }
    });
  }

  const profitData = { };
  let maxProfitNum = 0;
  let maxProfitBreedCount = 0;

  if (axieBreedingCosts && axie1 && axie2) {
    Object.keys(axieBreedingCosts).forEach(breedNum => {
      const breedCountAxie1 = parseInt(axie1.breedCount);
      const breedCountAxie2 = parseInt(axie2.breedCount);
      const breedNumInt = parseInt(breedNum);

      if (breedCountAxie1 + breedNumInt <= 7 && breedCountAxie2 + breedNumInt <= 7) {
        const marketplaceFee = .0425;
        const revenue = (expectedPrice * breedNumInt)*(1 - marketplaceFee);

        let additionalSlpCost = 0;
        let additionalAxsCost = 0;
        let additionalUsdCost = 0;

        if (breedNumInt > 0) {
          additionalSlpCost = (axieBreedingCosts[breedCountAxie1 + breedNumInt]['slp'] / 2) + (axieBreedingCosts[breedCountAxie2 + breedNumInt]['slp'] / 2);
          additionalAxsCost = (axieBreedingCosts[breedCountAxie1 + breedNumInt]['axs'] / 2) + (axieBreedingCosts[breedCountAxie2 + breedNumInt]['axs'] / 2);
          additionalUsdCost = (axieBreedingCosts[breedCountAxie1 + breedNumInt]['usd'] / 2) + (axieBreedingCosts[breedCountAxie2 + breedNumInt]['usd'] / 2);
        }

        const slpCost = breedNumInt > 0 ? profitData[breedNumInt - 1]['slpCost'] + additionalSlpCost : additionalSlpCost;
        const axsCost = breedNumInt > 0 ? profitData[breedNumInt - 1]['axsCost'] + additionalAxsCost : additionalAxsCost;
        const totalCost = breedNumInt > 0 ? profitData[breedNumInt - 1]['totalCost'] + additionalUsdCost : additionalUsdCost;


        profitData[breedNum] = {
          revenue: revenue,
          slpCost: slpCost,
          axsCost: axsCost,
          totalCost: totalCost,
          profit: revenue - totalCost,
        }
      }
    });

    maxProfitNum = Math.max(...Object.keys(profitData).map(breedCount => profitData[breedCount]['profit']));
    maxProfitBreedCount = Object.keys(profitData).find( breedCount => profitData[breedCount]['profit'] === maxProfitNum);
  }

  if (selectedPermutation !== null && !marketListings[selectedPermutation]) {
    const permutation = permutations[selectedPermutation];

    getAxieListings(
      permutation.class,
      [permutation.eyes, permutation.ears, permutation.mouth, permutation.horn, permutation.back, permutation.tail],
    ).then(res => {
      setMarketListings({ ...marketListings, [selectedPermutation]: res })
    });
  }

  return (
    <main>
      <LeftSidebar
        cantBreedWarning={cantBreedWarning}
        updateAxies={updateAxies}
        setNewAxie1={setNewAxie1}
        setNewAxie2={setNewAxie2}
        newAxie1={newAxie1}
        newAxie2={newAxie2}
        axie1={axie1}
        axie2={axie2}
      />
      <RightSidebar
        setSelectedPermutation={setSelectedPermutation}
        selectedPermutation={selectedPermutation}
        setExpectedPrice={setExpectedPrice}
        setPermutations={setPermutations}
        permutations={permutations}
        setAxieListItems={setAxieListItems}
        axieListItems={axieListItems}
      />
      <div>
        {
          !firstLoad && axie1 && axie2 ? (
            <Box>
              <Box
                display='flex'
                sx={{
                  '.Card1': { mr: 1 },
                  '.Card2': { ml: 1 },
                }}
              >
                <ExpectedValue className='Card1' valueType='sale price' expectedValue={expectedPrice} loading={!expectedPrice}/>
                <ExpectedValue className='Card2' valueType='profit' expectedValue={maxProfitNum} breedCount={maxProfitBreedCount} loading={!expectedPrice}/>
              </Box>
              <Box>
                <AnalysisTabs
                  selectedPermutation={selectedPermutation}
                  marketListings={marketListings}
                  setIgnoreEyesAndEars={setIgnoreEyesAndEars}
                  ignoreEyesAndEars={ignoreEyesAndEars}
                  setBreedCountRange={setBreedCountRange}
                  breedCountRange={breedCountRange}
                  numPossibleBreeds={Object.keys(profitData).length}
                />
                <ProfitTable profitData={profitData} maxProfitBreedCount={maxProfitBreedCount}/>
              </Box>
            </Box>
          ) : firstLoad ? (
            <Box sx={{
              pt: 2,
            }}>
              <Card
                sx={{
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant='h6'
                  component='div'
                  align='center'
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'grey.300',
                    backgroundColor: 'primary.main',
                    color: 'grey.50',
                    fontSize: '1.15rem',
                  }}
                >
                  Select Your Axies
                </Typography>
                <Typography align='center' p={1}>
                  Type two Axie IDs in the left sidebar to simulate a breed between them.
                </Typography>
              </Card>
            </Box>
          ) : ''
        }
      </div>
    </main>
  )
}

export default PairSimulator;
