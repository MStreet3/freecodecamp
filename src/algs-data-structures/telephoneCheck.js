function telephoneCheck(str) {
  let phoneRegex = /^1?(\s|-)?(\({1}\d{3}\){1}|\d{3})(\s|-)?(\d{3})(\s|-)?(\d{4})$/g;
  return phoneRegex.test(str);
}

export { telephoneCheck };
