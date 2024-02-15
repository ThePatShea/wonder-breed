import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { classColors } from '../../helpers/classColors';

const AxieImage = ({ axieClass, eyes, ears, back, mouth, horn, tail }) => {
  let axieColor = 'ffffff';

  switch (eyes) {
    case 'beast':
      eyes = 'puppy';
      break;
    case 'aquatic':
      eyes = 'gero';
      break;
    case 'plant':
      eyes = 'blossom';
      break;
    case 'bug':
      eyes = 'neo';
      break;
    case 'bird':
      eyes = 'mavis';
      break;
    case 'reptile':
      eyes = 'scar';
      break;
    default:
      eyes = 'puppy';
      break;
  }

  switch (ears) {
    case 'beast':
      ears = 'nyan';
      break;
    case 'aquatic':
      ears = 'inkling';
      break;
    case 'plant':
      ears = 'clover';
      break;
    case 'bug':
      ears = 'larva';
      break;
    case 'bird':
      ears = 'owl';
      break;
    case 'reptile':
      ears = 'pogona';
      break;
    default:
      ears = 'nyan';
      break;
  }

  switch (axieClass) {
    case 'Beast':
      axieColor = classColors.beast;
      break;
    case 'Aquatic':
      axieColor = classColors.aquatic;
      break;
    case 'Plant':
      axieColor = classColors.plant;
      break;
    case 'Bug':
      axieColor = classColors.bug;
      break;
    case 'Bird':
      axieColor = classColors.bird;
      break;
    case 'Reptile':
      axieColor = classColors.reptile;
      break;
    case 'Mech':
      axieColor = classColors.mech;
      break;
    case 'Dawn':
      axieColor = classColors.dawn;
      break;
    case 'Dusk':
      axieColor = classColors.dusk;
      break;
    default:
      axieColor = 'ffffff';
      break;
  }

  const axieImageUrl = `https://axie.zone/func/axiegenerator.php?color=${axieColor}&class=${axieClass}&eyes=${eyes}&ears=${ears}&back=${back}&mouth=${mouth}&horn=${horn}&tail=${tail}`;

  return <LazyLoadImage src={axieImageUrl} alt='axie' width='100%'/>
}

export default AxieImage;
