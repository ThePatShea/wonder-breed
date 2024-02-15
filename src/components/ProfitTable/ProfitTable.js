import React from 'react';
import { displayPrice } from '../../helpers/displayPrice';
import { thousandSeparator } from '../../helpers/thousandSeparator';
import { uuid } from '../../helpers/uuid';
import { Card, Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const ProfitTable = ({ profitData, maxProfitBreedCount }) => (
  <Card>
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
            <TableCell align='right'>SLP Cost</TableCell>
            <TableCell align='right'>AXS Cost</TableCell>
            <TableCell align='right'>Total Cost</TableCell>
            <TableCell align='right'>Revenue</TableCell>
            <TableCell align='right'>Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            Object.keys(profitData).map(breedCount => (
              <TableRow
                sx={{
                  backgroundColor: breedCount === maxProfitBreedCount ? 'success.light' : '',
                  '&:last-child td': {
                    border: 0,
                  },
                  '.MuiTableCell-root': {
                    color: breedCount === maxProfitBreedCount ? 'grey.50' : '',
                  }
                }}
                key={uuid()}
              >
                <TableCell align='left'>{breedCount}</TableCell>
                <TableCell align='right'>{thousandSeparator(profitData[breedCount]['slpCost'])}</TableCell>
                <TableCell align='right'>{thousandSeparator(profitData[breedCount]['axsCost'])}</TableCell>
                <TableCell align='right'>{displayPrice(profitData[breedCount]['totalCost'])}</TableCell>
                <TableCell align='right'>{displayPrice(profitData[breedCount]['revenue'])}</TableCell>
                <TableCell align='right'>{displayPrice(profitData[breedCount]['profit'])}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
)

export default ProfitTable;
