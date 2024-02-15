import React, { useState } from 'react';
import AxieImage from '../AxieImage/AxieImage';
import { displayProbability } from '../../helpers/displayProbability';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { eyesAndEarsParts } from '../../helpers/eyesAndEarsParts';
import { displayBodyPart } from '../../helpers/displayBodyPart';
import { bodyPartLabels } from '../../helpers/bodyPartLabels';
import { displayPrice } from '../../helpers/displayPrice';
import { Box, Card, CardActionArea, Typography, Table, TableBody, TableCell, TableContainer, TableRow, ButtonGroup, Button, Tooltip, Modal, Fade, Backdrop, TextField } from '@mui/material';
import { Edit as EditIcon, Cancel as CancelIcon, OpenInNew as OpenInNewIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const invalidPrice = (price) => price !== '' && (isNaN(parseFloat(price)) || !isFinite(price));

const AxieBox = ({ axie, selectedPermutation, setSelectedPermutation, permutationIndex, setAxieListItems, axieListItems, setPermutations, permutations, setExpectedPrice }) => {
  const [open, setOpen] = React.useState(false);
  const [newCustomPrice, setNewCustomPrice] = React.useState(axie.customPrice ? axie.customPrice : axie.price);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const noSaveClose = () => {
    setOpen(false);
    setNewCustomPrice(axie.customPrice ? axie.customPrice : axie.price);
  }

  let marketplaceLink = `https://marketplace.axieinfinity.com/axie/?class=${axie.class}&auctionTypes=Sale&part=${axie.back}&part=${axie.mouth}&part=${axie.horn}&part=${axie.tail}`;

  eyesAndEarsParts.eyes[axie.eyes].forEach(part => marketplaceLink += `&part=${part}`);
  eyesAndEarsParts.ears[axie.ears].forEach(part => marketplaceLink += `&part=${part}`);

  return (
    <Card
      sx={{
        mb: 2,
        backgroundColor: selectedPermutation === permutationIndex ? 'grey.400' : '',
      }}
    >
      <CardActionArea
        onClick={() => setSelectedPermutation(permutationIndex)}
        sx={{ pt: 1, pb: 1 }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Box mt={1}>
            <Typography align='center' fontSize='14px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
              probability
            </Typography>
            <Typography align='center' variant='h6' component='div' lineHeight='1'>
              {displayProbability(axie.probability)}
            </Typography>
          </Box>
          <Box width='120px' height='55px'>
            <Box position='relative' top='-18px'>
              <AxieImage
                axieClass={axie.class}
                eyes={displayBodyPart(axie.eyes, 'image')}
                ears={displayBodyPart(axie.ears, 'image')}
                back={displayBodyPart(axie.back, 'image')}
                mouth={displayBodyPart(axie.mouth, 'image')}
                horn={displayBodyPart(axie.horn, 'image')}
                tail={displayBodyPart(axie.tail, 'image')}
              />
            </Box>
          </Box>
          <Box mt={1}>
            <Typography align='center' fontSize='14px' textTransform='capitalize' color={axie.customPrice ? 'primary.main' : 'text.secondary'} lineHeight='1'>
              {`${axie.customPrice ? 'custom' : 'market'} price`}
            </Typography>
            <Typography align='center' variant='h6' component='div' lineHeight='1' color={axie.customPrice ? 'primary.main' : ''}>
              {displayPrice(axie.customPrice ? axie.customPrice : axie.price)}
            </Typography>
          </Box>
        </Box>
        <TableContainer>
          <Table aria-label='axie genes'>
            <TableBody
              sx={{
                '.MuiTableCell-root': { p: .5, lineHeight: 1.1 }
              }}
            >
              {[0, 3].map(startingPosition => (
                <TableRow
                  key={startingPosition}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {bodyPartLabels.slice(startingPosition, startingPosition + 3).map(part => (
                    <TableCell
                      align='center'
                      key={part}
                      sx={{
                        textTransform: 'capitalize',
                        '.PartIcon': { height: 18 },
                        borderColor: selectedPermutation === permutationIndex ? 'grey.500' : '',
                      }}
                    >
                      <img className='PartIcon' src={`https://axie.zone/assets/images/icons/svg/part_${part}.svg`} alt={`${part} icon`}/>
                      <Box>{displayBodyPart(axie[part])}</Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardActionArea>
      <ButtonGroup
        aria-label='axie actions'
        color={ axie.include ? 'primary' : 'error' }
        variant='contained'
        fullWidth
      >
        <Tooltip title={`${permutations[permutationIndex].include ? 'Ignore' : 'Include'} Axie`} arrow>
          <Button
            sx={{ borderTopLeftRadius: 0 }}
            onClick={() => {
              const updatedSelectedPermutation = { ...permutations[permutationIndex], include: !permutations[permutationIndex].include };

              const updatedAxieListItems = [ ...axieListItems ];
              const updatedPermutations = [ ...permutations ];

              updatedAxieListItems[permutationIndex] = updatedSelectedPermutation;
              updatedPermutations[permutationIndex] = updatedSelectedPermutation;

              setAxieListItems(updatedAxieListItems);
              setPermutations(updatedPermutations, setExpectedPrice(0));
            }}
          >
            { permutations[permutationIndex].include ? <CancelIcon/> : <CheckCircleIcon/> }
          </Button>
        </Tooltip>
        <Tooltip title='View on Marketplace' arrow>
          <Button onClick={() => window.open(marketplaceLink, '_blank', 'noopener,noreferrer')}>
            <OpenInNewIcon/>
          </Button>
        </Tooltip>
        <Tooltip title='Edit Price' arrow>
          <Button sx={{ borderTopRightRadius: 0 }} onClick={handleOpen}>
            <EditIcon/>
          </Button>
        </Tooltip>
      </ButtonGroup>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={noSaveClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <Box backgroundColor='primary.main'>
              <Typography
                variant='h6'
                component='div'
                align='center'
                color='grey.50'
                fontSize='1.15rem'
              >
                Edit Axie Price
              </Typography>
            </Box>
            <Box
              sx={{ p: 4 }}
              component='form'
              onSubmit={e => {
                e.preventDefault();
                trackCustomEvent({ category: 'Save', action: 'Form Submit - Save', label: 'Edit Axie Price Modal - Pair Simulator', value: 1, });

                if (newCustomPrice && !invalidPrice(newCustomPrice)) {
                  const updatedSelectedPermutation = { ...permutations[permutationIndex], customPrice: newCustomPrice !== axie.price ? newCustomPrice : null };

                  const updatedAxieListItems = [ ...axieListItems ];
                  const updatedPermutations = [ ...permutations ];

                  updatedAxieListItems[permutationIndex] = updatedSelectedPermutation;
                  updatedPermutations[permutationIndex] = updatedSelectedPermutation;

                  setAxieListItems(updatedAxieListItems);
                  setPermutations(updatedPermutations, setExpectedPrice(0));

                  handleClose();
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  label='Axie Price ($)'
                  variant='standard'
                  type='search'
                  value={newCustomPrice}
                  onChange={e => setNewCustomPrice(e.target.value)}
                  error={invalidPrice(newCustomPrice)}
                  helperText={invalidPrice(newCustomPrice) ? 'Invalid Price' : ''}
                />
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => setNewCustomPrice(axie.price)}
                  sx={{ mt: 2.25, ml: 3 }}
                >
                  use market price
                </Button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant='contained'
                  type='submit'
                  disabled={!newCustomPrice || invalidPrice(newCustomPrice)}
                  sx={{ mt: 3, pl: 8, pr: 8 }}
                >
                  save
                </Button>
              </Box>
            </Box>
          </Card>
        </Fade>
      </Modal>
    </Card>
  )
}

export default AxieBox;
