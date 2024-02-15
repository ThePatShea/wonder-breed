import React, { useState } from 'react';
import AxieBox from '../AxieBox/AxieBox';
import { uuid } from '../../helpers/uuid';
import { Box, LinearProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

const AxieList = ({ permutations, selectedPermutation, setSelectedPermutation, setPermutations, setExpectedPrice, axieListItems, setAxieListItems }) => {
  if (permutations !== 0 && axieListItems.length === 0) {
    setAxieListItems(permutations.slice(0,10));
  }

  return (
    <Box
      id='AxieList'
      sx={{
        maxHeight: 'calc(100vh - 119px)', // hacky
        overflow: 'scroll',
      }}
    >
      {
        permutations !== 0 ? (
          permutations.filter(permutation => !permutation.price).length === 0 ? (
            <InfiniteScroll
              dataLength={axieListItems.length} //This is important field to render the next data
              next={() => setAxieListItems([...axieListItems, ...permutations.slice(axieListItems.length, axieListItems.length + 5)])}
              hasMore={axieListItems.length < permutations.length}
              scrollableTarget='AxieList'
            >
              {
                axieListItems.map((axie, i) => (
                  <AxieBox
                    setSelectedPermutation={setSelectedPermutation}
                    selectedPermutation={selectedPermutation}
                    setExpectedPrice={setExpectedPrice}
                    setAxieListItems={setAxieListItems}
                    axieListItems={axieListItems}
                    setPermutations={setPermutations}
                    permutations={permutations}
                    permutationIndex={i}
                    key={uuid()}
                    axie={axie}
                  />
                ))
              }
            </InfiniteScroll>
          ) : <LinearProgress/>
        ) : ''
      }
    </Box>
  )
}

export default AxieList;
