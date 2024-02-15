import React from 'react';
import { uuid } from '../../helpers/uuid';
import { Box, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Typography, Button } from '@mui/material';
import { displayPrice } from '../../helpers/displayPrice';
import { displayBodyPart } from '../../helpers/displayBodyPart';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';

const MarketListings = ({ marketListings, selectedPermutation, ignoreEyesAndEars, breedCountRange, contentHeight }) => {
  const filteredEyesEarsMarketListings = marketListings[selectedPermutation] ? ignoreEyesAndEars ? marketListings[selectedPermutation].listingsIgnoreEyesAndEars : marketListings[selectedPermutation].listingsIncludeEyesAndEars : [];

  const filteredMarketListings = filteredEyesEarsMarketListings.filter(listing => breedCountRange[0] <= listing.breedCount && listing.breedCount <= breedCountRange[1]);

  return (
    <Box>
      {
        filteredMarketListings && filteredMarketListings.length > 0 ? (
          <TableContainer sx={{ maxHeight: contentHeight }}>
            <Table
              aria-label='market listings'
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
                  <TableCell align='center'>Axie ID</TableCell>
                  <TableCell align='center'>Class</TableCell>
                  <TableCell align='center'>Eyes</TableCell>
                  <TableCell align='center'>Ears</TableCell>
                  <TableCell align='center'>Breeds</TableCell>
                  <TableCell align='center'>Purity</TableCell>
                  <TableCell align='center'>Price</TableCell>
                  <TableCell align='center'>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  filteredMarketListings.map(marketListing => (
                    <TableRow key={uuid()}>
                      <TableCell align='center'>{marketListing.id}</TableCell>
                      <TableCell align='center'>{marketListing.class}</TableCell>
                      <TableCell align='center'>{displayBodyPart(marketListing.parts.filter(part => part.type === 'Eyes')[0].class)}</TableCell>
                      <TableCell align='center'>{displayBodyPart(marketListing.parts.filter(part => part.type === 'Ears')[0].class)}</TableCell>
                      <TableCell align='center'>{marketListing.breedCount}</TableCell>
                      <TableCell align='center'>{marketListing.parts.filter(part => part.class === marketListing.class).length}</TableCell>
                      <TableCell align='center'>{displayPrice(marketListing.auction.currentPriceUSD)}</TableCell>
                      <TableCell align='center'>
                        <Button
                          variant='text'
                          onClick={() => window.open(`https://marketplace.axieinfinity.com/axie/${marketListing.id}`, '_blank', 'noopener,noreferrer')}
                        >
                          <OpenInNewIcon/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography align='center' sx={{ p: 2 }}>No Axies are currently listed on the market that meet these criteria.</Typography>
        )
      }
    </Box>
  )
}

export default MarketListings;
