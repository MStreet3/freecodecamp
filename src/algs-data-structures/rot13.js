function rot13(str) {
  /*
    Receives a ROT13 encoded string as input
    and returns a decoded string.
    */
  let result = '';
  let value, tmp;

  for (var i = 0; i < str.length; i++) {
    value = str.charCodeAt(i);
    if (value >= 65 && value <= 90) {
      // do something
      tmp = value + 13;
      if (tmp > 90) {
        value = 65 + tmp - 90 - 1;
      } else {
        value = tmp;
      }
      result += String.fromCharCode(value);
    } else {
      result += str[i];
    }
  }

  return result;
}

export { rot13 };
