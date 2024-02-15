import React from 'react';
import { displayPrice } from '../../helpers/displayPrice';
import { Card, Typography, Skeleton } from '@mui/material';

const ExpectedValue = ({ className, expectedValue, valueType, breedCount = null, loading = false }) => (
  <Card
    className={className}
    sx={{
      flexGrow: 1,
      mt: 2,
      mb: 2,
      p: .5,
    }}
  >
    <Typography align='center' fontSize='16px' textTransform='capitalize' color='text.secondary' lineHeight='1.1'>
      expected {valueType}
    </Typography>
    <Typography align='center' fontSize='32px' lineHeight='1' sx={{ justifyContent: 'center', display: 'flex' }}>
      {!loading ? displayPrice(expectedValue) : <Skeleton variant='text' width={90} sx={{ transform: 'scale(1,1)' }}/>}
    </Typography>
    {
      breedCount !== null ? (
        <Typography align='center' fontSize='18px' textTransform='capitalize' color='text.secondary' lineHeight='1'>
          {breedCount} {breedCount !== '1' ? 'breeds' : 'breed'}
        </Typography>
      ) : ''
    }
  </Card>
)

export default ExpectedValue;
