import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, Tooltip } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { uuid } from '../../helpers/uuid';
import { calculateAutoMatch } from '../../helpers/calculateAutoMatch';
import BodyPartSelector from './BodyPartSelector';


const LeftSidebar = ({
  setAvailableBreeds,
  availableBreeds,
  updateAxieBreedingCosts,
  setPossibleBreeds,
  possibleBreeds,
  setTargetBodyParts,
  targetBodyParts,
  setNewUserWallets,
  newUserWallets,
  setUserWallets,
  userWallets,
  setUserAxies,
  userAxies,
  userAxiesWithGenes,
  setSyncedWallets,
  syncedWallets,
  syncWallets,
  setAxieListItems,
}) => {
  const [numUpdates, setNumUpdates] = useState(0); // Hacky

  return (
    <Box sx={{
      flexDirection: 'column',
      height: 'calc(100vh - 81px)', // Hacky
      width: 328,
      backgroundColor: 'grey.200',
      float: 'left',
    }}>
      <Box backgroundColor='primary.main'>
        <Typography
          variant='h6'
          component='div'
          align='center'
          color='grey.50'
          fontSize='1.15rem'
          sx={{ mb: 2 }}
        >
          Breed Parameters
        </Typography>
      </Box>
      <Box sx={{
        height: 'calc(100vh - 81px - 44px)', // Hacky
        overflowY: 'scroll',
      }}>
        <Box sx={{
          p: 2,
          pt: 0,
        }}>
          <Card>
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
              Ronin Wallets
            </Typography>
            <Box sx={{ p: 2 }}>
              <Typography fontSize='16px' color='text.secondary' lineHeight='1.1' pb={1}>
                Your Ronin Wallets
              </Typography>
              <List dense sx={{
                border: 1,
                borderBottom: 0,
                borderRadius: 1,
                borderColor: 'grey.400',
                backgroundColor: 'grey.100',
                p: 0,
                '.MuiListItemText-root': {
                  overflow: 'hidden',
                },
              }}>
                {
                  userWallets.length > 0 ? userWallets.map((walletAddress, i) => (
                    <ListItem
                      key={uuid()}
                      sx={{ borderBottom: 1, borderColor: 'grey.400', }}
                      secondaryAction={
                        <IconButton edge='end' aria-label='delete' onClick={() => {
                          const updatedUserWallets = userWallets;
                          updatedUserWallets.splice(i,1);
                          setUserWallets(updatedUserWallets);
                          setNumUpdates(numUpdates + 1); // Hacky
                        }}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <Tooltip title={walletAddress} arrow>
                        <ListItemText
                          primary={walletAddress}
                        />
                      </Tooltip>
                    </ListItem>
                  )) : (
                    <ListItem
                      sx={{
                        borderBottom: 1,
                        borderColor: 'grey.400',
                      }}
                    >
                      <ListItemText
                        primary='No wallets yet'
                      />
                    </ListItem>
                  )
                }
              </List>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography fontSize='16px' color='text.secondary' lineHeight='1.1' pb={1}>
                Add your Ronin wallets
              </Typography>
              <TextField
                label='Ronin wallet IDs'
                multiline
                placeholder='ronin:abcde, ronin:12345, etc.'
                onChange={ e => setNewUserWallets(e.target.value) }
                value={newUserWallets}
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                }}
              />
              <Button
                variant='contained'
                type='submit'
                sx={{ mt: 2, width: '100%' }}
                disabled={newUserWallets.length === 0}
                onClick={() => {
                  const updatedUserWallets = userWallets;
                  const addUserWalletsString = newUserWallets.replace(/\s/g, '');
                  const addUserWalletsArray = addUserWalletsString.split(',');

                  addUserWalletsArray.forEach(walletAddress => {
                    if (updatedUserWallets.indexOf(walletAddress) === -1 && walletAddress.length > 0) {
                      updatedUserWallets.push(walletAddress);
                    }
                  });

                  setUserWallets(updatedUserWallets, () => {
                    setNewUserWallets('');
                    syncWallets();
                  });
                }}
              >
                add wallets
              </Button>
            </Box>
          </Card>
          <Card sx={{ mt: 2 }}>
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
              Target Body Parts
            </Typography>
            <Box sx={{ p: 2 }}>
              <Typography fontSize='16px' color='text.secondary' lineHeight='1.1' pb={1}>
                Select your target body parts
              </Typography>
              <BodyPartSelector setTargetBodyParts={setTargetBodyParts} targetBodyParts={targetBodyParts}/>
            </Box>
          </Card>
          <Button
            variant='contained'
            type='submit'
            sx={{ mt: 2, width: '100%' }}
            disabled={userAxiesWithGenes.length === 0 || targetBodyParts.length === 0}
            onClick={() => {
              updateAxieBreedingCosts().then(res => {
                const newPossibleBreeds = calculateAutoMatch(userAxiesWithGenes, targetBodyParts);

                setPossibleBreeds(newPossibleBreeds);
                setAvailableBreeds(newPossibleBreeds.length > 0);
                setAxieListItems([]);
              });
            }}
          >
            analyze
          </Button>
        </Box>
      </Box>
    </Box>
  )
};

export default LeftSidebar;
