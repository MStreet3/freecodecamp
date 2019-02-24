import { telephoneCheck } from '../../algs-data-structures/telephoneCheck';

test('telephoneCheck("555-555-5555") should return a boolean.', () => {
  let expected = typeof true;
  let received = typeof telephoneCheck('555-555-5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("1 555-555-5555") should return true.', () => {
  let expected = true;
  let received = telephoneCheck('1 555-555-5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("1 (555) 555-5555") should return true.', () => {
  let expected = true;
  let received = telephoneCheck('1 (555) 555-5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("5555555555") should return true.', () => {
  let expected = true;
  let received = telephoneCheck('5555555555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("555-555-5555") should return true.', () => {
  let expected = true;
  let received = telephoneCheck('555-555-5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("(555)555-5555") should return true.', () => {
  let expected = true;
  let received = telephoneCheck('(555)555-5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("1(555)555-5555") should return true.', () => {
  let expected = true;
  let received = telephoneCheck('1(555)555-5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("555-5555") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('555-5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("5555555") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('5555555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("1 555)555-5555") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('1 555)555-5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("1 555 555 5555") should return true.', () => {
  let expected = true;
  let received = telephoneCheck('1 555 555 5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("1 456 789 4444") should return true.', () => {
  let expected = true;
  let received = telephoneCheck('1 456 789 4444');
  expect(received).toEqual(expected);
});

test('telephoneCheck("123**&!!asdf#") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('123**&!!asdf#');
  expect(received).toEqual(expected);
});

test('telephoneCheck("55555555") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('55555555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("(6054756961)") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('(6054756961)');
  expect(received).toEqual(expected);
});

test('telephoneCheck("2 (757) 622-7382") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('2 (757) 622-7382');
  expect(received).toEqual(expected);
});

test('telephoneCheck("0 (757) 622-7382") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('0 (757) 622-7382');
  expect(received).toEqual(expected);
});

test('telephoneCheck("-1 (757) 622-7382") should return false', () => {
  let expected = false;
  let received = telephoneCheck('-1 (757) 622-7382');
  expect(received).toEqual(expected);
});

test('telephoneCheck("2 757 622-7382") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('2 757 622-7382');
  expect(received).toEqual(expected);
});

test('telephoneCheck("2 757 622-7382") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('2 757 622-7382');
  expect(received).toEqual(expected);
});

test('telephoneCheck("10 (757) 622-7382") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('10 (757) 622-7382');
  expect(received).toEqual(expected);
});

test('telephoneCheck("27576227382") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('27576227382');
  expect(received).toEqual(expected);
});

test('telephoneCheck("(275)76227382") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('(275)76227382');
  expect(received).toEqual(expected);
});

test('telephoneCheck("2(757)6227382") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('2(757)6227382');
  expect(received).toEqual(expected);
});

test('telephoneCheck("2(757)622-7382") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('2(757)622-7382');
  expect(received).toEqual(expected);
});

test('telephoneCheck("555)-555-5555") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('555)-555-5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("(555-555-5555") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('(555-555-5555');
  expect(received).toEqual(expected);
});

test('telephoneCheck("(555)5(55?)-5555") should return false.', () => {
  let expected = false;
  let received = telephoneCheck('(555)5(55?)-5555');
  expect(received).toEqual(expected);
});
