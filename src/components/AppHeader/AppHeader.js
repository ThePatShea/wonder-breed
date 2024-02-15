import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Disclaimer from '../Disclaimer/Disclaimer';

const AppHeader = () => (
  <div>
    <AppBar
      position='static'
      sx={{
        '.MuiToolbar-root': {
          minHeight: 45,
        }
      }}
    >
      <Toolbar>
        <Typography variant='h6' component='span'>
          <Box component='span' color='custom.orange1'>W</Box>onder<Box component='span' color='custom.orange1'>B</Box>reed
        </Typography>
        <Typography textTransform='uppercase' color='grey.300' pt={0.25} ml={0.5}>
          beta
        </Typography>
      </Toolbar>
    </AppBar>
    <Disclaimer/>
  </div>
)

export default AppHeader;
