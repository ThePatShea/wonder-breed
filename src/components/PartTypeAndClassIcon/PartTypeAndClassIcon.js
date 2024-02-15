import React from 'react';
import { classColors } from '../../helpers/classColors';
import { Box, } from '@mui/material';

export const PartTypeAndClassIcon = ({ partClass, partType }) => (
  <Box sx={{ backgroundColor: `#${classColors[partClass]}`, display: 'inline', mr: 1, p: 0.5, borderRadius: 1 }}>
    <img className='PartIcon' src={`https://axie.zone/assets/images/icons/svg/part_${partType}.svg`} alt={`${partType} icon`} sx={{ height: '10px' }}/>
  </Box>
);
