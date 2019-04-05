function telephoneCheck(str) {
  /*
    Return true if the passed string looks like a valid US phone number.
    - Area code is required
    - Country code is optional but must be 1, if present.
  */
  let phoneRegex = /^1?(\s|-)?(\({1}\d{3}\){1}|\d{3})(\s|-)?(\d{3})(\s|-)?(\d{4})$/g;
  return phoneRegex.test(str);
}

export { telephoneCheck };
