function palindrome(str) {
  /*
  Return true if the given string is a palindrome. Otherwise, return false.

  A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.
  */
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (str.length === 1) {
    return true;
  } else if (str.length === 2) {
    return str[0] === str[1] ? true : false;
  } else {
    return str[0] === str[str.length - 1]
      ? palindrome(str.slice(1, -1))
      : false;
  }
}

export { palindrome };
