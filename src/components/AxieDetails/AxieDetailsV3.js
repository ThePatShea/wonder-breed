import React from 'react';
import { displayBodyPart } from '../../helpers/displayBodyPart';
import { displayPercent } from '../../helpers/displayPercent';
import { bodyPartLabels } from '../../helpers/bodyPartLabels';
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { geneProbabilities } from '../../helpers/geneProbabilities';

const AxieDetailsV3 = ({ axieId, axieClass, breedCount, axieImage, axieGenes }) => {
  let overallPurity = 0;

  [axieGenes.eyes, axieGenes.ears, axieGenes.mouth, axieGenes.horn, axieGenes.back, axieGenes.tail].forEach(geneSet => {
    ['d', 'r1', 'r2'].forEach(gene => overallPurity += geneSet[gene].cls === axieGenes.cls ? geneProbabilities[gene] / 3 : 0);
  });

  const purity = {
    dominant: [axieGenes.eyes, axieGenes.ears, axieGenes.mouth, axieGenes.horn, axieGenes.back, axieGenes.tail].filter(geneSet => geneSet.d.cls === axieGenes.cls).length,
    overall: overallPurity,
  }

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
          src={`https://axie.zone/assets/images/icons/svg/class_${axieClass.toLowerCase()}.svg`}
          alt='Axie Class Icon'
        />
        <Box sx={{ lineHeight: '28px' }}>
          Axie #{axieId}
        </Box>
      </Typography>
      <Typography sx={{ fontSize: 14, ml: 5, position: 'relative', top: '-6px' }} color='text.secondary'>
        {breedCount} Breeds - {purity.dominant} Purity ({displayPercent(purity.overall)})
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: -5,
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
            top: '-15px',
          }
        }}
      >
        <div className='AxieImgWrapper'>
          <img className='AxieImg' src={axieImage} alt='Axie'/>
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
              <TableCell sx={{ textTransform: 'capitalize' }} align='center'>{displayBodyPart(axieGenes[part].d.partId)}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='center'>{displayBodyPart(axieGenes[part].r1.partId)}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='center'>{displayBodyPart(axieGenes[part].r2.partId)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
)};

export default AxieDetailsV3;
