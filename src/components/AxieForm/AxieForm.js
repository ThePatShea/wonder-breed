import React from 'react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { TextField, Button, Box } from '@mui/material';

const invalidAxieId = (axieId) => axieId ? axieId.match(/\D/) : false;

const AxieForm = ({ newAxie1, newAxie2, setNewAxie1, setNewAxie2, updateAxies, axie1, axie2 }) => {
  const twoValidAxies = newAxie1 && newAxie2 && !invalidAxieId(newAxie1) && !invalidAxieId(newAxie2);


  return (
    <Box
      autoComplete='off'
      component='form'
      sx={{
        '.MuiButton-root': { width: '100%' },
      }}
      onSubmit={e => {
        e.preventDefault();
        trackCustomEvent({ category: 'Axie Form', action: 'Submit', label: 'Axie Form - Pair Simulator', value: 1, });

        if (twoValidAxies) {
          updateAxies();
        }
      }}
    >
      <TextField
        label='Axie 1 ID'
        variant='standard'
        type='search'
        value={newAxie1}
        onChange={e => setNewAxie1(e.target.value)}
        error={invalidAxieId(newAxie1)}
        helperText={invalidAxieId(newAxie1) ? 'Invalid Axie ID' : ''}
        sx={{
          width: 'calc(50% - 4px)', // Hacky
          mr: .5
        }}
      />
      <TextField
        label='Axie 2 ID'
        variant='standard'
        type='search'
        value={newAxie2}
        onChange={e => setNewAxie2(e.target.value)}
        error={invalidAxieId(newAxie2)}
        helperText={invalidAxieId(newAxie2) ? 'Invalid Axie ID' : ''}
        sx={{
          width: 'calc(50% - 4px)', // Hacky
          ml: .5
        }}
      />
      <Button
        disabled={!twoValidAxies}
        variant='contained'
        type='submit'
        sx={{ mt: 2 }}
      >
        analyze
      </Button>
    </Box>
  )
}

export default AxieForm;
