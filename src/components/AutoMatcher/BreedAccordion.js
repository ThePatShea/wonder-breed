import React from 'react';
import { Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Typography, Box, Tooltip, Card, Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { displayProbabilityCondensed } from '../../helpers/displayProbability';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TabPanel, a11yProps } from '../TabPanel/TabPanel';
import AxieDetailsV3 from '../AxieDetails/AxieDetailsV3';
import { displayPrice } from '../../helpers/displayPrice';
import { thousandSeparator } from '../../helpers/thousandSeparator';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { uuid } from '../../helpers/uuid';


const BreedAccordion = ({ axieBreedingCosts, availableBreeds, possibleBreeds, maxBreedCount, userAxies, breed, i }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const axie1Full = userAxies.filter(axie => axie.id === breed.axie1)[0];
  const axie2Full = userAxies.filter(axie => axie.id === breed.axie2)[0];

  const maxDesirableBreeds = maxBreedCount - Math.max(axie1Full.breedCount, axie2Full.breedCount);
  // const maxPossibleBreeds = 7 - Math.max(axie1Full.breedCount, axie2Full.breedCount);

  const breedingCostSummation = { };

  Object.keys(axieBreedingCosts).forEach(breedNum => {
    const breedCountAxie1 = parseInt(axie1Full.breedCount);
    const breedCountAxie2 = parseInt(axie2Full.breedCount);
    const breedNumInt = parseInt(breedNum);

    if (breedCountAxie1 + breedNumInt <= 7 && breedCountAxie2 + breedNumInt <= 7) {
      let additionalSlpCost = 0;
      let additionalAxsCost = 0;
      let additionalUsdCost = 0;

      if (breedNumInt > 0) {
        additionalSlpCost = (axieBreedingCosts[breedCountAxie1 + breedNumInt]['slp'] / 2) + (axieBreedingCosts[breedCountAxie2 + breedNumInt]['slp'] / 2);
        additionalAxsCost = (axieBreedingCosts[breedCountAxie1 + breedNumInt]['axs'] / 2) + (axieBreedingCosts[breedCountAxie2 + breedNumInt]['axs'] / 2);
        additionalUsdCost = (axieBreedingCosts[breedCountAxie1 + breedNumInt]['usd'] / 2) + (axieBreedingCosts[breedCountAxie2 + breedNumInt]['usd'] / 2);
      }

      const slpCost = breedNumInt > 0 ? breedingCostSummation[breedNumInt - 1]['slpCost'] + additionalSlpCost : additionalSlpCost;
      const axsCost = breedNumInt > 0 ? breedingCostSummation[breedNumInt - 1]['axsCost'] + additionalAxsCost : additionalAxsCost;
      const totalCost = breedNumInt > 0 ? breedingCostSummation[breedNumInt - 1]['totalCost'] + additionalUsdCost : additionalUsdCost;


      breedingCostSummation[breedNum] = {
        slpCost: slpCost,
        axsCost: axsCost,
        totalCost: totalCost,
      }
    }
  });

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        key={i}
        sx={{
          '.MuiAccordionSummary-content': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }
        }}
      >
        <Box sx={{
          backgroundColor: 'grey.200',
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
              1 breed
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            border: 1,
            borderColor: 'grey.400',
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
              <Tooltip title={`${displayProbabilityCondensed(breed.probabilities[0][0].d)} chance that the child Axie will have all of your target body parts in its D genes if you breed this pair 1 time.`} arrow>
                <Box sx={{ p: 1, pb: .5, }}>
                  <Typography align='center' fontSize='14px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
                    D
                  </Typography>
                  <Typography align='center' variant='h6' component='div' lineHeight='1'>
                    {displayProbabilityCondensed(breed.probabilities[0][0].d)}
                  </Typography>
                </Box>
              </Tooltip>
              <Tooltip title={`${displayProbabilityCondensed(breed.probabilities[0][0].r1)} chance that the child Axie will have all of your target body parts in its R1 genes if you breed this pair 1 time.`} arrow>
                <Box sx={{ p: 1, pb: .5, }}>
                  <Typography align='center' fontSize='14px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
                    R1
                  </Typography>
                  <Typography align='center' variant='h6' component='div' lineHeight='1'>
                    {displayProbabilityCondensed(breed.probabilities[0][0].r1)}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
              <Tooltip title={`${displayProbabilityCondensed(breed.probabilities[0][0].r2)} chance that the child Axie will have all of your target body parts in its R2 genes if you breed this pair 1 time.`} arrow>
                <Box sx={{ p: 1, pt: .5, }}>
                  <Typography align='center' fontSize='14px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
                    R2
                  </Typography>
                  <Typography align='center' variant='h6' component='div' lineHeight='1'>
                    {displayProbabilityCondensed(breed.probabilities[0][0].r2)}
                  </Typography>
                </Box>
              </Tooltip>
              <Tooltip title={`${displayProbabilityCondensed(breed.probabilities[0][0].p)} chance that the child Axie will have all of your target body parts in its D, R1, and R2 genes if you breed this pair 1 time.`} arrow>
                <Box sx={{ p: 1, pt: .5, }}>
                  <Typography align='center' fontSize='14px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
                    Printer
                  </Typography>
                  <Typography align='center' variant='h6' component='div' lineHeight='1'>
                    {displayProbabilityCondensed(breed.probabilities[0][0].p)}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Box sx={{
          backgroundColor: 'grey.200',
          borderRadius: 1,
        }}>
          <Box
            backgroundColor='primary.main'
            sx={{
              borderTopRightRadius: '4px', // Hacky. Should use material UI's spacign numbers.
              borderTopLeftRadius: '4px', // Hacky. Should use material UI's spacign numbers.
            }}
          >
            <Typography
              variant='h6'
              component='div'
              align='center'
              color='grey.50'
              fontSize='1.15rem'
              textTransform='capitalize'
            >
              Breeding Pair
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            border: 1,
            borderColor: 'grey.400',
            borderBottomRightRadius: '4px', // Hacky. Should use material UI's spacign numbers.
            borderBottomLeftRadius: '4px', // Hacky. Should use material UI's spacign numbers.
          }}>
            <Box
              sx={{
                display: 'flex',
                '.AxieImgWrapper': {
                  position: 'relative',
                  left: 12, // Hacky. Should be dynamic based on the side of the box.
                  top: 5, // Hacky. Should be dynamic based on the side of the box.
                  overflow: 'hidden',
                  height: 67, // Hacky. This is just to make the height equal the height of the components surrounding it.
                  width: 75,
                },
                '.AxieImg': {
                  position: 'absolute',
                  width: '120px',
                  left: '-22px',
                  top: '-18px',
                }
              }}
            >
              <Box sx={{
                borderRight: 1,
                borderColor: 'grey.400',
                position: 'relative',
                '&:hover': {
                  '.AxieDetailsBox': {
                    display: 'block',
                  }
                }
              }}>
                <Box
                  className='AxieDetailsBox'
                  sx={{
                    position: 'absolute',
                    display: 'none',
                    width: 300, // Hacky. Should be dynamic.
                    zIndex: 10,
                    left: '10px', // Hacky. Should use material UI's spacign numbers.
                    top: '10px', // Hacky. Should use material UI's spacign numbers.
                  }}
                >
                  <AxieDetailsV3
                    axieId={axie1Full.id}
                    axieClass={axie1Full.class}
                    breedCount={axie1Full.breedCount}
                    axieImage={axie1Full.image}
                    axieGenes={axie1Full.genes}
                  />
                </Box>
                <Box className='AxieImgWrapper'>
                  <img className='AxieImg' src={axie1Full.image} alt='Axie'/>
                </Box>
                <Box sx={{
                  backgroundColor: 'grey.300',
                  borderTop: 1,
                  borderColor: 'grey.400',
                  pt: .5,
                  pb: .5,
                  pr: 1,
                  pl: 1,
                }}>
                  <Typography align='center' fontSize='16px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
                    #{axie1Full.id}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{
                position: 'relative',
                '&:hover': {
                  '.AxieDetailsBox': {
                    display: 'block',
                  }
                }
              }}>
                <Box
                  className='AxieDetailsBox'
                  sx={{
                    position: 'absolute',
                    display: 'none',
                    width: 300, // Hacky. Should be dynamic.
                    zIndex: 10,
                    left: '10px', // Hacky. Should use material UI's spacign numbers.
                    top: '10px', // Hacky. Should use material UI's spacign numbers.
                  }}
                >
                  <AxieDetailsV3
                    axieId={axie2Full.id}
                    axieClass={axie2Full.class}
                    breedCount={axie2Full.breedCount}
                    axieImage={axie2Full.image}
                    axieGenes={axie2Full.genes}
                  />
                </Box>
                <Box className='AxieImgWrapper'>
                  <img className='AxieImg' src={axie2Full.image} alt='Axie'/>
                </Box>
                <Box sx={{
                  backgroundColor: 'grey.300',
                  borderTop: 1,
                  borderColor: 'grey.400',
                  pt: .5,
                  pb: .5,
                  pr: 1,
                  pl: 1,
                }}>
                  <Typography align='center' fontSize='16px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
                    #{axie2Full.id}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{
          backgroundColor: 'grey.200',
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
              Breeding Costs
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            border: 1,
            borderColor: 'grey.400',
            height: '92px',
            overflowY: 'scroll',
          }}>
            <TableContainer>
              <Table
                aria-label='profit table'
                sx={{
                  '.MuiTableCell-root': { pt: .5, pb: .5, pl: 1, pr: 1, }
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      '.MuiTableCell-root': { fontWeight: 'bold', fontSize: '1rem' }
                    }}
                  >
                    <TableCell align='left'>Breeds</TableCell>
                    <TableCell align='right'>SLP</TableCell>
                    <TableCell align='right'>AXS</TableCell>
                    <TableCell align='right'>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.keys(breedingCostSummation).filter(breedCount => breedCount > 0).map(breedCount => (
                      <TableRow
                        sx={{
                          '&:last-child td': {
                            border: 0,
                          }
                        }}
                        key={uuid()}
                      >
                        <TableCell align='left'>{breedCount}</TableCell>
                        <TableCell align='right'>{thousandSeparator(breedingCostSummation[breedCount]['slpCost'])}</TableCell>
                        <TableCell align='right'>{thousandSeparator(breedingCostSummation[breedCount]['axsCost'])}</TableCell>
                        <TableCell align='right'>{displayPrice(breedingCostSummation[breedCount]['totalCost'])}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box sx={{
          backgroundColor: 'grey.200',
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
              {`${maxDesirableBreeds} ${maxDesirableBreeds > 1 ? 'breeds' : 'breed'}`}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            border: 1,
            borderColor: 'grey.400',
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
              <Tooltip title={`${displayProbabilityCondensed(breed.probabilities[maxDesirableBreeds - 1][0].d)} chance that at least 1 child Axie will have all of your target body parts in its D genes if you breed this pair ${maxDesirableBreeds} times.`} arrow>
                <Box sx={{ p: 1, pb: .5, }}>
                  <Typography align='center' fontSize='14px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
                    D
                  </Typography>
                  <Typography align='center' variant='h6' component='div' lineHeight='1'>
                    {displayProbabilityCondensed(breed.probabilities[maxDesirableBreeds - 1][0].d)}
                  </Typography>
                </Box>
              </Tooltip>
              <Tooltip title={`${displayProbabilityCondensed(breed.probabilities[maxDesirableBreeds - 1][0].r1)} chance that at least 1 child Axie will have all of your target body parts in its R1 genes if you breed this pair ${maxDesirableBreeds} times.`} arrow>
                <Box sx={{ p: 1, pb: .5, }}>
                  <Typography align='center' fontSize='14px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
                    R1
                  </Typography>
                  <Typography align='center' variant='h6' component='div' lineHeight='1'>
                    {displayProbabilityCondensed(breed.probabilities[maxDesirableBreeds - 1][0].r1)}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
              <Tooltip title={`${displayProbabilityCondensed(breed.probabilities[maxDesirableBreeds - 1][0].r2)} chance that at least 1 child Axie will have all of your target body parts in its R2 genes if you breed this pair ${maxDesirableBreeds} times.`} arrow>
                <Box sx={{ p: 1, pt: .5, }}>
                  <Typography align='center' fontSize='14px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
                    R2
                  </Typography>
                  <Typography align='center' variant='h6' component='div' lineHeight='1'>
                    {displayProbabilityCondensed(breed.probabilities[maxDesirableBreeds - 1][0].r2)}
                  </Typography>
                </Box>
              </Tooltip>
              <Tooltip title={`${displayProbabilityCondensed(breed.probabilities[maxDesirableBreeds - 1][0].p)} chance that at least 1 child Axie will have all of your target body parts in its D, R1, and R2 genes if you breed this pair ${maxDesirableBreeds} times.`} arrow>
                <Box sx={{ p: 1, pt: .5, }}>
                  <Typography align='center' fontSize='14px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
                    Printer
                  </Typography>
                  <Typography align='center' variant='h6' component='div' lineHeight='1'>
                    {displayProbabilityCondensed(breed.probabilities[maxDesirableBreeds - 1][0].p)}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Tabs
          variant='fullWidth'
          value={tabValue}
          onChange={handleTabChange}
          aria-label='tabs'
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: 'grey.300',
          }}
        >
          { [0,1,2,3,4,5,6].filter(k => k + 1 + axie1Full.breedCount <= 7 && k + 1 + axie2Full.breedCount <= 7).map((breedCount, i) => <Tab label={`${breedCount + 1} ${breedCount + 1 === 1 ? 'Breed' : 'Breeds'}`} {...a11yProps(i)} />) }
        </Tabs>
        {
          [0,1,2,3,4,5,6].filter(k => k + 1 + axie1Full.breedCount <= 7 && k + 1 + axie2Full.breedCount <= 7).map((breedCount, i) => {
            return (
              <TabPanel value={tabValue} index={i}>
                <TableContainer sx={{
                  border: 1,
                  borderRadius: 1,
                  borderColor: 'grey.300',
                }}>
                  <Table aria-label='full gene probabilities'>
                    <TableHead sx={{
                      backgroundColor: 'grey.200',
                    }}>
                      <TableRow
                        sx={{
                          '.MuiTableCell-root': { p: 1, fontWeight: 'bold', fontSize: '1rem' }
                        }}
                      >
                        <TableCell align='center'>Successes</TableCell>
                        <TableCell align='center'>D</TableCell>
                        <TableCell align='center'>R1</TableCell>
                        <TableCell align='center'>R2</TableCell>
                        <TableCell align='center'>Printer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{
                        '.MuiTableCell-root': { p: 1, lineHeight: 1.1 }
                      }}
                    >
                      {breed.probabilities[breedCount].map((probability, j) => (
                        <TableRow
                          key={j}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align='center' sx={{ textTransform: 'capitalize' }}>{`at least ${j + 1}`}</TableCell>
                          <Tooltip title={`${displayProbabilityCondensed(probability.d)} chance that at least ${j + 1} child ${j + 1 === 1 ? 'Axie' : 'Axies'} will have all of your target body parts in its D genes if you breed this pair ${i + 1} times.`}  arrow>
                            <TableCell align='center'>
                                {displayProbabilityCondensed(probability.d)}
                            </TableCell>
                          </Tooltip>
                          <Tooltip title={`${displayProbabilityCondensed(probability.r1)} chance that at least ${j + 1} child ${j + 1 === 1 ? 'Axie' : 'Axies'} will have all of your target body parts in its R1 genes if you breed this pair ${i + 1} times.`}  arrow>
                            <TableCell align='center'>
                                {displayProbabilityCondensed(probability.r1)}
                            </TableCell>
                          </Tooltip>
                          <Tooltip title={`${displayProbabilityCondensed(probability.r2)} chance that at least ${j + 1} child ${j + 1 === 1 ? 'Axie' : 'Axies'} will have all of your target body parts in its R2 genes if you breed this pair ${i + 1} times.`}  arrow>
                            <TableCell align='center'>
                                {displayProbabilityCondensed(probability.r2)}
                            </TableCell>
                          </Tooltip>
                          <Tooltip title={`${displayProbabilityCondensed(probability.p)} chance that at least ${j + 1} child ${j + 1 === 1 ? 'Axie' : 'Axies'} will have all of your target body parts in its D, R1, and R2 genes if you breed this pair ${i + 1} times.`}  arrow>
                            <TableCell align='center'>
                                {displayProbabilityCondensed(probability.p)}
                            </TableCell>
                          </Tooltip>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            )
          })
        }
      </AccordionDetails>
    </Accordion>
  );
}

export default BreedAccordion;
