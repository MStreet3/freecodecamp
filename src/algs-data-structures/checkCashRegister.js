/*
  Project:

  Design a cash register drawer function checkCashRegister() 
  that accepts purchase price as the first argument (price),
  payment as the second argument (cash), and   cash-in-drawer (cid) 
  as the third argument.

  cid is a 2D array listing available currency.

  The checkCashRegister() function should always return an object 
  with a status key and a change key.

  Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer 
  is less than the change due, or if you cannot return the exact change.

  Return {status: "CLOSED", change: [...]} with cash-in-drawer 
  as the value for the key change if it is equal to the change due.

  Otherwise, return {status: "OPEN", change: [...]}, with the 
  change due in coins and bills, sorted in highest to lowest order, 
  as the value of the change key.
*/

import BigNumber from 'bignumber.js';
import { fromJS, Map } from 'immutable';

function totalFunds(cid) {
  let drawer = fromJS(cid);
  return drawer.reduce((total, denomination) => {
    return total.plus(new BigNumber(denomination.get(1)));
  }, new BigNumber('0'));
}

function totalReturned(returned) {
  return returned.reduce((acc, value) => {
    return acc.plus(value);
  }, new BigNumber('0'));
}

function countOutChange(change, cid) {
  let remainingChange = Map({ total: change });
  const drawerSetup = Map({
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    'ONE HUNDRED': 100
  }).map((value) => {
    return Map({
      unitvalue: new BigNumber(value),
      total: new BigNumber('0'),
      count: new BigNumber('0')
    });
  });

  const drawer = cid.reduce((acc, pair) => {
    let unitvalue = acc.getIn([pair[0], 'unitvalue']);
    let total = new BigNumber(pair[1]);
    let count = total.dividedBy(acc.getIn([pair[0], 'unitvalue']));
    return acc
      .setIn([pair[0], 'unitvalue'], unitvalue)
      .setIn([pair[0], 'total'], total)
      .setIn([pair[0], 'count'], count);
  }, drawerSetup);

  return drawer
    .sort((a, b) => {
      return b.get('unitvalue').minus(a.get('unitvalue'));
    })
    .reduce((changeToReturn, denomination, index) => {
      let leftover = remainingChange.get('total');
      let denomName = index;
      let available = denomination.get('count');
      let unitValue = denomination.get('unitvalue');
      let remainder = leftover.modulo(unitValue);
      let count = leftover.minus(remainder).dividedBy(unitValue);
      if (count.isGreaterThan('0')) {
        let countValue = count.isGreaterThanOrEqualTo(available)
          ? available.times(unitValue)
          : count.times(unitValue);
        remainingChange = remainingChange.set(
          'total',
          leftover.minus(countValue)
        );
        changeToReturn = changeToReturn.set(denomName, countValue.toNumber());
      }
      return changeToReturn;
    }, Map());
}

function checkCashRegister(price, cash, cid) {
  let change = new BigNumber(cash).minus(new BigNumber(price));
  let cashOnHand = totalFunds(cid);
  let cashDifference = cashOnHand.minus(change);
  let status = cashDifference.isEqualTo('0')
    ? 'CLOSED'
    : cashDifference.isLessThan('0')
      ? 'INSUFFICIENT_FUNDS'
      : 'OPEN';
  let res;

  switch (status) {
    case 'INSUFFICIENT_FUNDS':
      return { status: status, change: [] };
    case 'CLOSED':
      return { status: status, change: cid };
    default:
      res = countOutChange(change, cid);
      return totalReturned(res).isLessThan(change)
        ? {
            status: 'INSUFFICIENT_FUNDS',
            change: []
          }
        : {
            status: status,
            change: res.toArray()
          };
  }
}

export { checkCashRegister };
