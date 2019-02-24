function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let res = { status: '', change: [] };
  let denominations = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    DOLLAR: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    'ONE HUNDRED': 100
  };

  // let drawerSum = cid.reduce( (acc, curr) =>  )

  for (var i = 0; i < cid.length; i++) {
    let rem = change % denominations[cid[i][0]];
    let num = (change - rem) / denominations[cid[i][0]];
    let total = num * denominations[cid[i][0]];
    if (total <= cid[i][1]) {
      change -= total;
      res.change.push([cid[i][0], total]);
    } else {
      res.change.push([cid[i][0], 0]);
    }
  }

  return price, cash, cid;
}

export { checkCashRegister };
