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

  Note:
  This version of the project is done with plain JavaScript.

*/

function totalFunds(cid) {
  return cid.reduce((total, denomination) => {
    return total + denomination[1];
  }, 0);
}

function setupDrawer(
  denominations = [
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
  ]
) {
  return {
    drawer: denominations.reduce((drawer, denomination) => {
      let [billOrCoin, unitValue] = denomination;
      drawer[billOrCoin] = {
        unitValue: unitValue,
        total: 0,
        count: 0
      };
      return drawer;
    }, {}),
    denominations: denominations
  };
}

function fillDrawer(cid) {
  const initial = setupDrawer();
  return {
    initial: initial.drawer,
    filled: cid.reduce((drawer, denomination) => {
      let [billOrCoin, totalValue] = denomination;
      let count = Math.round(totalValue / drawer[billOrCoin]['unitValue']);
      drawer[billOrCoin]['total'] = totalValue;
      drawer[billOrCoin]['count'] = count;
      return drawer;
    }, initial.drawer),
    sortedDenominations: initial.denominations
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .map((denomination) => {
        let [name] = denomination;
        return name;
      })
  };
}

function countOutChange(change, cid) {
  const register = fillDrawer(cid);
  return (
    register.sortedDenominations
      // for each denomination in the drawer from largest to smallest ..
      .map((denomination) => {
        let available = register.filled[denomination]['count'];
        let unitValue = register.filled[denomination]['unitValue'];
        let remainder =
          Math.round((change % unitValue + 0.0000001) * 100) / 100;
        let count = Math.round((change - remainder) / unitValue);
        if (count > 0) {
          let countValue =
            count >= available ? available * unitValue : count * unitValue;
          change = Math.round((change - countValue + 0.0000001) * 100) / 100;
          return [denomination, countValue];
        }
      })
      // remove the undefined denominations
      .filter((denomination) => denomination)
  );
}

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let cashOnHand = totalFunds(cid);
  let cashDifference = cashOnHand - change;
  let status =
    cashDifference === 0
      ? 'CLOSED'
      : cashDifference < 0
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
      // check for situations where cashOnHand > change
      // but insufficient denominations to return the required change
      // e.g., change = 0.96 yet the register has only a single dollar bill.
      return totalFunds(res) < change
        ? {
            status: 'INSUFFICIENT_FUNDS',
            change: []
          }
        : {
            status: status,
            change: res
          };
  }
}

export { checkCashRegister };
