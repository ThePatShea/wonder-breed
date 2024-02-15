import React from 'react';
import AxieForm from '../AxieForm/AxieForm';
import AxieDetails from '../AxieDetails/AxieDetails';
import { Box, Typography, Alert, AlertTitle } from '@mui/material';

const LeftSidebar = ({ newAxie1, newAxie2, setNewAxie1, setNewAxie2, updateAxies, axie1, axie2, cantBreedWarning }) => (
  <Box sx={{
    flexDirection: 'column',
    height: 'calc(100vh - 81px)', // hacky
    width: 328,
    backgroundColor: 'grey.200',
    float: 'left',
    mr: 2,
  }}>
    <Box backgroundColor='primary.main'>
      <Typography
        variant='h6'
        component='div'
        align='center'
        color='grey.50'
        fontSize='1.15rem'
      >
        Axie Selector
      </Typography>
    </Box>
    <Box sx={{
      p: 2,
      pt: 1,
    }}>
      <AxieForm
        updateAxies={updateAxies}
        setNewAxie1={setNewAxie1}
        setNewAxie2={setNewAxie2}
        newAxie1={newAxie1}
        newAxie2={newAxie2}
        axie1={axie1}
        axie2={axie2}
      />
      {
        cantBreedWarning ? (
          <Alert severity='error' sx={{ borderRadius: 1, mt: 2 }}>
            <AlertTitle>Breed Not Possible</AlertTitle>
            {cantBreedWarning}
          </Alert>
        ) : ''
      }
      {axie1 && axie2 ? (
          <Box sx={{
            height: cantBreedWarning ? 'calc(100vh - 227px - 92px)' : 'calc(100vh - 227px)', // hacky
            overflow: 'scroll',
            mt: 2
          }}>
            <AxieDetails axie={axie1}/>
            <AxieDetails axie={axie2}/>
          </Box>
        ) : ''
      }
    </Box>
  </Box>
)

export default LeftSidebar;
