import React from 'react';
import { Box, Typography, Card, Tabs, Tab, Switch, FormGroup, FormControlLabel, Slider } from '@mui/material';
import MarketListings from '../MarketListings/MarketListings';
import { TabPanel, a11yProps } from '../TabPanel/TabPanel';

const RangeSlider = ({ setBreedCountRange }) => {
  const [value, setValue] = React.useState([0, 7]);

  const handleChange = (event, newValue) => {
    setBreedCountRange(newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200, height: 38 }}>
      <Slider
        getAriaLabel={() => 'Slider'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='off'
        marks={[
          {value: 0, label: '0'},
          {value: 1, label: '1'},
          {value: 2, label: '2'},
          {value: 3, label: '3'},
          {value: 4, label: '4'},
          {value: 5, label: '5'},
          {value: 6, label: '6'},
          {value: 7, label: '7'},
        ]}
        min={0}
        max={7}
        sx={{
          position: 'relative',
          top: '4px',
          '.MuiSlider-markLabel': {
            top: '5px',
            zIndex: '1',
            color: 'grey.50',
            '&:nth-of-type(4)': { display: [value[0], value[1]].indexOf(0) === -1 ? 'none' : '' },
            '&:nth-of-type(6)': { display: [value[0], value[1]].indexOf(1) === -1 ? 'none' : '' },
            '&:nth-of-type(8)': { display: [value[0], value[1]].indexOf(2) === -1 ? 'none' : '' },
            '&:nth-of-type(10)': { display: [value[0], value[1]].indexOf(3) === -1 ? 'none' : '' },
            '&:nth-of-type(12)': { display: [value[0], value[1]].indexOf(4) === -1 ? 'none' : '' },
            '&:nth-of-type(14)': { display: [value[0], value[1]].indexOf(5) === -1 ? 'none' : '' },
            '&:nth-of-type(16)': { display: [value[0], value[1]].indexOf(6) === -1 ? 'none' : '' },
            '&:nth-of-type(18)': { display: [value[0], value[1]].indexOf(7) === -1 ? 'none' : '' },
          }
        }}
      />
    </Box>
  );
}

const AnalysisTabs = ({ selectedPermutation, marketListings, ignoreEyesAndEars, setIgnoreEyesAndEars, breedCountRange, setBreedCountRange, numPossibleBreeds }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const contentHeight = `calc(100vh - 332px - ${numPossibleBreeds * 29}px)` // Hacky

  return (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant='fullWidth' value={value} onChange={handleChange} aria-label='tabs'>
          <Tab label='Market Listings' {...a11yProps(0)} />
          <Tab label='Sales History' {...a11yProps(1)} />
          <Tab label='Price Chart' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Box sx={{ backgroundColor: 'grey.200', overflow: 'hidden' }}>
        <FormGroup sx={{ float: 'left', overflow: 'hidden' }}>
          <FormControlLabel
            control={<RangeSlider setBreedCountRange={setBreedCountRange}/>}
            label='Breeds'
            sx={{
              mt: 0,
              mb: 0,
              ml: 2.35,
              mr: 2.35,
              '.MuiFormControlLabel-label': { pl: 2.75 },
              cursor: 'default',
            }}
          />
        </FormGroup>
        <FormGroup sx={{ mr: 2, float: 'right', overflow: 'hidden' }}>
          <FormControlLabel
            control={<Switch onClick={() => setIgnoreEyesAndEars(!ignoreEyesAndEars)}/>}
            label='Ignore Eyes and Ears'
            sx={{ m: 0 }}
          />
        </FormGroup>
      </Box>
      <Box sx={{
        height: contentHeight,
        '.css-19kzrtu': { p: 0 },
      }}>
        <TabPanel value={value} index={0}>
          <MarketListings
            selectedPermutation={selectedPermutation}
            marketListings={marketListings}
            ignoreEyesAndEars={ignoreEyesAndEars}
            breedCountRange={breedCountRange}
            contentHeight={contentHeight}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography align='center' backgroundColor='grey.300' p={1}>Coming Soon - This section will display the recent sales history for the specified Axie</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography align='center' backgroundColor='grey.300' p={1}>Coming Soon - This section will show a graph of historical sale prices for the specified Axie</Typography>
        </TabPanel>
      </Box>
    </Card>
  )
}

export default AnalysisTabs;
