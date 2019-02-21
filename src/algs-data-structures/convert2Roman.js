function convertToRoman(num) {
  /*
    Convert the given number into a roman numeral.
  */
  if (num > 3999) {
    throw new Error('no bar notation. num must be less than 4000.');
  }
  let stringNum = String(num);
  let padding = '0'.repeat(4 - stringNum.length);
  stringNum = padding + stringNum;

  let thousands = { '1': 'M', '2': 'MM', '3': 'MMM', '0': '' };
  let hundreds = {
    '1': 'C',
    '2': 'CC',
    '3': 'CCC',
    '4': 'CD',
    '5': 'D',
    '6': 'DC',
    '7': 'DCC',
    '8': 'DCCC',
    '9': 'CM',
    '0': ''
  };
  let tens = {
    '1': 'X',
    '2': 'XX',
    '3': 'XXX',
    '4': 'XL',
    '5': 'L',
    '6': 'LX',
    '7': 'LXX',
    '8': 'LXXX',
    '9': 'XC',
    '0': ''
  };
  let ones = {
    '1': 'I',
    '2': 'II',
    '3': 'III',
    '4': 'IV',
    '5': 'V',
    '6': 'VI',
    '7': 'VII',
    '8': 'VIII',
    '9': 'IX',
    '0': ''
  };
  return (
    thousands[stringNum[0]] +
    hundreds[stringNum[1]] +
    tens[stringNum[2]] +
    ones[stringNum[3]]
  );
}

export { convertToRoman };
