import { thousandSeparator } from './thousandSeparator';

export const displayPercent = (percentDecimal, decimalCount) => thousandSeparator(parseFloat(percentDecimal * 100).toFixed(decimalCount)) + '%';
