import React from 'react';
import { Box, Typography } from '@mui/material';
import AxieList from '../AxieList/AxieList';

const RightSidebar = ({ permutations, selectedPermutation, setSelectedPermutation, setPermutations, setExpectedPrice, axieListItems, setAxieListItems }) => (
  <Box sx={{
    flexDirection: 'column',
    height: 'calc(100vh - 81px)', // Hacky
    width: 328,
    backgroundColor: 'grey.200',
    float: 'right',
    ml: 2,
  }}>
    <Box backgroundColor='primary.main'>
      <Typography
        variant='h6'
        component='div'
        align='center'
        color='grey.50'
        fontSize='1.15rem'
      >
        Possible Children
      </Typography>
    </Box>
    <Box sx={{
      p: 2,
    }}>
      <AxieList
        setSelectedPermutation={setSelectedPermutation}
        selectedPermutation={selectedPermutation}
        setExpectedPrice={setExpectedPrice}
        setPermutations={setPermutations}
        permutations={permutations}
        setAxieListItems={setAxieListItems}
        axieListItems={axieListItems}
      />
    </Box>
  </Box>
)

export default RightSidebar;
