function totalFunds(cid) {
  return cid.reduce((total, denomination) => {
    return total + denomination[1];
  }, 0);
}

function setupDrawer() {
  const denominations = [
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
  ];
  const drawer = denominations.reduce((drawer, denomination) => {
    let [billOrCoin, unitValue] = denomination;
    drawer[billOrCoin] = {
      unitValue: unitValue,
      total: 0,
      count: 0
    };
    return drawer;
  }, {});
  return {
    drawer: drawer,
    denominations: denominations
  };
}

function fillDrawer(cid) {
  const initial = setupDrawer();
  const filledDrawer = cid.reduce((drawer, denomination) => {
    let [billOrCoin, totalValue] = denomination;
    let count = Math.round(totalValue / drawer[billOrCoin]['unitValue']);
    drawer[billOrCoin]['total'] = totalValue;
    drawer[billOrCoin]['count'] = count;
    return drawer;
  }, initial.drawer);
  return {
    initial: initial.drawer,
    filled: filledDrawer,
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

  return register.sortedDenominations
    .map((denomination) => {
      let available = register.filled[denomination]['count'];
      let unitValue = register.filled[denomination]['unitValue'];
      let remainder = Math.round((change % unitValue + 0.000001) * 100) / 100;
      let count = Math.round((change - remainder) / unitValue);
      if (count > 0) {
        let countValue =
          count >= available ? available * unitValue : count * unitValue;
        change = Math.round((change - countValue + 0.000000001) * 100) / 100;
        return [denomination, countValue];
      }
    })
    .filter((denomination) => denomination);
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
