export const formatCurrency = (
  value: number,
  currency: string = 'USD',
): string => {
  return new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

export function formatNumber(
  number: number | string,
  decimalPlaces: number = 0,
): string {
  const num = typeof number === 'string' ? parseFloat(number) : number;
  if (isNaN(num)) return '0';

  const fixedNum =
    decimalPlaces > 0 ? num.toFixed(decimalPlaces) : Math.round(num).toString();
  const [integerPart, decimalPart] = fixedNum.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
}
