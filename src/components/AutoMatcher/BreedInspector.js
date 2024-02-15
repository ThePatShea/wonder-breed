import React, { useState } from 'react';
import BreedAccordion from './BreedAccordion';
import { Box, Card, ButtonGroup, Button, Select, MenuItem, FormControl, InputLabel, Typography, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfiniteScroll from 'react-infinite-scroll-component';

const BreedInspector = ({ axieBreedingCosts, possibleBreeds, availableBreeds, userAxies, userAxiesWithGenes, axieListItems, setAxieListItems }) => {
  const [sortPairsBy, setSortPairsBy] = useState('d');
  const [bestOrAll, setBestOrAll] = useState('all');
  const [maxBreedCount, setMaxBreedCount] = useState(7);

  possibleBreeds.sort((a,b) => {
    return b.probabilities[0][0][sortPairsBy] - a.probabilities[0][0][sortPairsBy];
  });

  const possibleBreedsUnderBreedCount = possibleBreeds.filter(breed => breed.axie1BreedCount < maxBreedCount && breed.axie2BreedCount < maxBreedCount);

  const bestBreeds = [];
  const alreadyBred = [];

  possibleBreedsUnderBreedCount.forEach(breed => {
    if (alreadyBred.indexOf(breed.axie1) === -1 && alreadyBred.indexOf(breed.axie2) === -1) {
      bestBreeds.push(breed);
      alreadyBred.push(breed.axie1);
      alreadyBred.push(breed.axie2);
    }
  });

  const breedSet = {
    all: possibleBreedsUnderBreedCount,
    best: bestBreeds,
  };

  if (breedSet[bestOrAll].length !== 0 && axieListItems.length === 0) {
    setAxieListItems(breedSet[bestOrAll].slice(0,10));
  }

  if (!availableBreeds) {
    return (
      <Box sx={{
        display: 'flex',
        p: 2,
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
            No Breeds Possible
          </Typography>
          <Typography align='center' p={1}>
            It is not possible to get your target body parts through breeding any of the Axies in your wallets.
          </Typography>
        </Card>
      </Box>
    );
  } else if (possibleBreeds.length === 0) {
    return (
      <Box sx={{
        display: 'flex',
        p: 2,
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
            Input Your Info
          </Typography>
          <Typography align='center' p={1}>
            Input your Ronin wallets and target traits to simulate your breeds.
          </Typography>
        </Card>
      </Box>
    );
  } else {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        p:2,
      }}>
        <Card sx={{
          mb: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>

          <Box sx={{
            backgroundColor: 'grey.200',
            border: 1,
            borderColor: 'grey.400',
            overflow: 'hidden',
            borderRadius: 1,
          }}>
            <Box backgroundColor='primary.main'>

              <Typography
                variant='h6'
                component='div'
                align='center'
                color='grey.50'
                fontSize='1.15rem'
                textTransform='capitalize'
                sx={{
                  pl: 1,
                  pr: 1,
                }}
              >
                Maximum Breeds
                <Tooltip title={`Set the maximum number of times you are willing to breed any individual Axie.`} arrow>
                  <InfoOutlinedIcon sx={{ position: 'relative', top: 5, ml: 1, }}/>
                </Tooltip>
              </Typography>
            </Box>
            <Box sx={{
              p: 1,
            }}>
              <FormControl variant="standard" sx={{ width: '100%', }}>
                <Select
                  labelId="set-maximum-breed-count-label"
                  id="set-maximum-breed-count"
                  value={maxBreedCount}
                  onChange={(e) => {
                    setMaxBreedCount(e.target.value);
                    setAxieListItems([]);
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{
            backgroundColor: 'grey.200',
            border: 1,
            borderColor: 'grey.400',
            overflow: 'hidden',
            borderRadius: 1,
          }}>
            <Box backgroundColor='primary.main'>
              <Typography
                variant='h6'
                component='div'
                align='center'
                color='grey.50'
                fontSize='1.15rem'
                textTransform='capitalize'
                sx={{
                  pl: 1,
                  pr: 1,
                }}
              >
                Show Pairs
                <Tooltip title={`Choose whether to show all possible breeding pairs (ALL), or only the breeding pairs that lead to the highest overall probability of success (BEST).`} arrow>
                  <InfoOutlinedIcon sx={{ position: 'relative', top: 5, ml: 1, }}/>
                </Tooltip>
              </Typography>
            </Box>
            <Box sx={{
              p: 1,
            }}>
              <ButtonGroup
                aria-label='show pairs'
                variant='outlined'
              >
                <Button
                  onClick={() => {
                    setBestOrAll('all');
                    setAxieListItems([]);
                  }}
                  sx={{
                    backgroundColor: bestOrAll === 'all' ? 'primary.main' : '',
                    color: bestOrAll === 'all' ? 'grey.50' : '',
                    '&:hover': {
                      backgroundColor: bestOrAll === 'all' ? 'primary.main' : '',
                    }
                  }}
                >
                  all
                </Button>
                <Button
                  onClick={() => {
                    setBestOrAll('best');
                    setAxieListItems([]);
                  }}
                  sx={{
                    backgroundColor: bestOrAll === 'best' ? 'primary.main' : '',
                    color: bestOrAll === 'best' ? 'grey.50' : '',
                    '&:hover': {
                      backgroundColor: bestOrAll === 'best' ? 'primary.main' : '',
                    }
                  }}
                >
                  best
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
          <Box sx={{
            backgroundColor: 'grey.200',
            border: 1,
            borderColor: 'grey.400',
            overflow: 'hidden',
            borderRadius: 1,
          }}>
            <Box backgroundColor='primary.main'>
              <Typography
                variant='h6'
                component='div'
                align='center'
                color='grey.50'
                fontSize='1.15rem'
                textTransform='capitalize'
                sx={{
                  pl: 1,
                  pr: 1,
                }}
              >
                Sort Pairs
                <Tooltip title={`Sort the breeding pairs by probability of getting your target body parts in one gene (D, R1, R2), or all genes (PRINTER).`} arrow>
                  <InfoOutlinedIcon sx={{ position: 'relative', top: 5, ml: 1, }}/>
                </Tooltip>
              </Typography>
            </Box>
            <Box sx={{
              p: 1,
            }}>
              <ButtonGroup
                aria-label='sort pairs'
                variant='outlined'
              >
                <Button
                  onClick={() => {
                    setSortPairsBy('d');
                    setAxieListItems([]);
                  }}
                  sx={{
                    backgroundColor: sortPairsBy === 'd' ? 'primary.main' : '',
                    color: sortPairsBy === 'd' ? 'grey.50' : '',
                    '&:hover': {
                      backgroundColor: sortPairsBy === 'd' ? 'primary.main' : '',
                    }
                  }}
                >
                  D
                </Button>
                <Button
                  onClick={() => {
                    setSortPairsBy('r1');
                    setAxieListItems([]);
                  }}
                  sx={{
                    backgroundColor: sortPairsBy === 'r1' ? 'primary.main' : '',
                    color: sortPairsBy === 'r1' ? 'grey.50' : '',
                    '&:hover': {
                      backgroundColor: sortPairsBy === 'r1' ? 'primary.main' : '',
                    }
                  }}
                >
                  R1
                </Button>
                <Button
                  onClick={() => {
                    setSortPairsBy('r2');
                    setAxieListItems([]);
                  }}
                  sx={{
                    backgroundColor: sortPairsBy === 'r2' ? 'primary.main' : '',
                    color: sortPairsBy === 'r2' ? 'grey.50' : '',
                    '&:hover': {
                      backgroundColor: sortPairsBy === 'r2' ? 'primary.main' : '',
                    }
                  }}
                >
                  R2
                </Button>
                <Button
                  onClick={() => {
                    setSortPairsBy('p');
                    setAxieListItems([]);
                  }}
                  sx={{
                    backgroundColor: sortPairsBy === 'p' ? 'primary.main' : '',
                    color: sortPairsBy === 'p' ? 'grey.50' : '',
                    '&:hover': {
                      backgroundColor: sortPairsBy === 'p' ? 'primary.main' : '',
                    }
                  }}
                >
                  Printer
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Card>
        <Box
          id='AxieList'
          sx={{
            height: 'calc(100vh - 230px)', // Hacky. Should be dynamic based on the size of the elements inside it.
            overflowY: 'scroll',
          }}
        >
          <InfiniteScroll
            dataLength={axieListItems.length} //This is important field to render the next data
            next={() => setAxieListItems([...axieListItems, ...breedSet[bestOrAll].slice(axieListItems.length, axieListItems.length + 5)])}
            hasMore={axieListItems.length < breedSet[bestOrAll].length}
            scrollableTarget='AxieList'
          >
            {
              axieListItems.map((breed, i) => (
                <BreedAccordion
                  axieBreedingCosts={axieBreedingCosts}
                  availableBreeds={availableBreeds}
                  possibleBreeds={possibleBreeds}
                  maxBreedCount={maxBreedCount}
                  userAxies={userAxiesWithGenes}
                  breed={breed}
                  i={i}
                />
              ))
            }
          </InfiniteScroll>
        </Box>
      </Box>
    )
  }

};

export default BreedInspector;
