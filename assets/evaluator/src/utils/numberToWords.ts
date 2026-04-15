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

  let res = '';
  const million = Math.floor(num / 1000000);
  const thousand = Math.floor((num % 1000000) / 1000);
  const remainder = Math.floor(num % 1000);

  if (million > 0) res += convertGroup(million) + 'Million ';
  if (thousand > 0) res += convertGroup(thousand) + 'Thousand ';
  if (remainder > 0) res += convertGroup(remainder);

  return res.trim() + ' Pesos Only';
};
