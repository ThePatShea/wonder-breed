import React from 'react';
import { Alert } from '@mui/material';

const Disclaimer = () => (
  <Alert
    sx={{
      borderRadius: 0,
      pt: 0,
      pb: 0,
    }}
    severity='error'
  >
    All information provided by this tool is estimated, assumes no market movement, and is not guaranteed to be accurate. Nothing in this tool is financial advice. Please do your own research.
  </Alert>
)

export default Disclaimer;
