export const numberToWords = (num: number): string => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const convertGroup = (n: number): string => {
    let res = '';
    if (n >= 100) {
      res += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      res += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    } else if (n >= 10) {
      res += teens[n - 10] + ' ';
      return res;
    }
    if (n > 0) {
      res += ones[n] + ' ';
    }
    return res;
  };

  if (num === 0) return 'Zero Pesos Only';

  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num - (integerPart)) * 100);

  let res = '';
  const billion = Math.floor(integerPart / 1000000000);
  const million = Math.floor((integerPart % 1000000000) / 1000000);
  const thousand = Math.floor((integerPart % 1000000) / 1000);
  const remainder = integerPart % 1000;

  if (integerPart > 0) {
    if (billion > 0) res += convertGroup(billion) + 'Billion ';
    if (million > 0) res += convertGroup(million) + 'Million ';
    if (thousand > 0) res += convertGroup(thousand) + 'Thousand ';
    if (remainder > 0) res += convertGroup(remainder);

    res = res.trim();
    res += integerPart === 1 ? ' Peso' : ' Pesos';
  } else if (decimalPart > 0) {
    res = 'Zero Pesos';
  }

  if (decimalPart > 0) {
    res += ' and ' + convertGroup(decimalPart).trim();
    res += decimalPart === 1 ? ' Centavo' : ' Centavos';
  }

  return (res || 'Zero Pesos').trim() + ' Only';
};
