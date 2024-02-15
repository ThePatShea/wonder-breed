import React from 'react';
import { displayBodyPart } from '../../helpers/displayBodyPart';
import { displayPercent } from '../../helpers/displayPercent';
import { bodyPartLabels } from '../../helpers/bodyPartLabels';
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const AxieDetails = ({ axie }) => {
  return (
  <Card sx={{
    mb: 2
  }}>
    <Box
      sx={{
        position: 'relative',
        borderBottom: '1px solid',
        borderColor: 'grey.300',
        height: 44,
        padding: 1,
      }}
    >
      <Typography
        variant='h6'
        component='div'
        sx={{
          '.AxieClassIcon': {
            float: 'left',
            height: 22,
            borderRadius: 22,
            border: '1px solid',
            borderColor: 'primary.dark',
            p: .25,
            mr: 1.5,
            position: 'relative',
            top: '8px'
          },
        }}
      >
        <img
          className='AxieClassIcon'
          src={`https://axie.zone/assets/images/icons/svg/class_${axie.class.toLowerCase()}.svg`}
          alt='Axie Class Icon'
        />
        <Box sx={{ lineHeight: '28px' }}>
          Axie #{axie.number}
        </Box>
      </Typography>
      <Typography sx={{ fontSize: 14, ml: 5, position: 'relative', top: '-6px' }} color='text.secondary'>
        {axie.breedCount} Breeds - {axie.purity.dominant} Purity ({displayPercent(axie.purity.overall)})
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          '.AxieImgWrapper': {
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderLeft: '1px solid',
            borderColor: 'grey.300',
            height: 60,
            width: 75,
          },
          '.AxieImg': {
            position: 'absolute',
            width: '120px',
            left: '-22px',
            top: '-18px',
          }
        }}
      >
        <div className='AxieImgWrapper'>
          <img className='AxieImg' src={axie.image} alt='Axie'/>
        </div>
      </Box>
    </Box>

    <TableContainer>
      <Table aria-label='axie genes'>
        <TableBody
          sx={{
            '.MuiTableCell-root': { p: .5, lineHeight: 1.1, maxWidth: 75 }
          }}
        >
          {bodyPartLabels.map((part) => (
            <TableRow
              key={part}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                align='center'
                sx={{
                  '.PartIcon': { height: 18 }
                }}
              >
                <img className='PartIcon' src={`https://axie.zone/assets/images/icons/svg/part_${part}.svg`} alt={`${part} icon`}/>
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='center'>{displayBodyPart(axie.genes[part].d)}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='center'>{displayBodyPart(axie.genes[part].r1)}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='center'>{displayBodyPart(axie.genes[part].r2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
)};

export default AxieDetails;
