import { thousandSeparator } from './thousandSeparator';

export const displayPrice = (price) => {
  const floatPrice = parseFloat(price);
  return floatPrice >= 0 ? '$' + thousandSeparator(floatPrice.toFixed(2)) : '-$' + -1 * thousandSeparator(floatPrice.toFixed(2));
}
