import React from 'react';
import { Box, Alert, AlertTitle } from '@mui/material';

const InvalidAccessCode = () => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'center',
  }}>
    <Alert
      sx={{ m: 4 }}
      severity='error'
    >
      <AlertTitle>Invalid Access Code</AlertTitle>
      You access code is invalid. Please try a different one.
    </Alert>
  </Box>
)

export default InvalidAccessCode;
