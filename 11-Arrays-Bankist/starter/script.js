"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Star Bankist APP

// A)🎈 148 Displaying transaction called movements

const displayMovements = function (acc, sort = false) {
  // 3. get rid the element of movement__row class
  containerMovements.innerHTML = "";

  // I) 164 🎈 implementing sorting
  // check if sort is true and make a copy of movements array using slice() method
  const accMovements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  // 1. create a function to displaying data of account1.movements in forEach looping method
  accMovements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    // 2. changes the html element content
    containerMovements.insertAdjacentHTML("afterbegin", html);
    // movements: [1300, 70, -130, -650, 3000, -400, 450, 200];
    //              .8  .7    .6    .5    .4    .3   .2  .1

    // containerMovements.insertAdjacentHTML('beforeend', html);
    // movements: [200, 450, -400, 3000, -650, -130, 70, 1300];
    //
  });
};

// console.log(containerMovements.innerHTML);

// B)🎈 152 Computing usernames
/* 
// 1. The function receives a parameter that contains single value
// const createUsername = function (user) {
//   const username = user
//     .toLowerCase()
//     .split(' ')
//     // .map(function (name) {
//     //   return name[0];
//     // })
//     // with arrow function
//     .map(name => name[0])
//     .join('');
//   return username;
// };

// console.log(createUsername('Steven Thomas Williams'));
// ↪ with map : (3) ['s', 't', 'w']
// ↪ with join : stw
 */
// 2. The fucntion receives a parameter that contains array value
// do looping through parameter value
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    // create a new property into accounts object
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      // .map(function (name) {
      //   return name[0];
      // })
      // with arrow function
      .map((name) => name[0])
      .join("");
  });
};

createUsername(accounts);
// console.log(accounts);

// C) 🎈 Displaying balance
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((total, value) => total + value, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

// D) 🎈 Displaying summary
const calcDisplaySummary = function (acc) {
  // 1. Deposit
  const inComes = acc.movements
    .filter((value) => value > 0)
    .reduce((total, value) => total + value, 0);
  // console.log(inComes);
  labelSumIn.textContent = `${inComes}€`;

  // 2. Withdrawals
  const outComes = acc.movements
    .filter((value) => value < 0)
    .reduce((total, value) => total + value, 0);
  // console.log(Math.abs(outComes));
  labelSumOut.textContent = `${Math.abs(outComes)}€`;

  // 3. Interest
  const interest = acc.movements
    .filter((deposit) => deposit > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    // only sumarize the interest that are >= 1
    .filter((interes, i, arr) => {
      // console.log(arr);
      return interes >= 1;
    })
    .reduce((total, value) => total + value, 0);
  // console.log(interest);
  labelSumInterest.textContent = `${interest}€`;
};

// function displaying content
const updateUi = function (acc) {
  // B. Display movements
  displayMovements(acc);

  // C. Display balance
  displayBalance(acc);

  // D. Display summary
  calcDisplaySummary(acc);
};

// E) 🎈 159 Implementing login
// Event handlers

// global variable
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log('LOGIN');

  // 1. Find the account with username
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // 2. Macth the pin
  // check if the currentAccount is exist
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // A. Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    // set opacity to 100 to show the content
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";

    // Removes focus from an element
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // displaying content
    updateUi(currentAccount);
  }
});

// F) 🎈 160 Implementing tranfers
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const ammount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  // clear field
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();
  inputTransferTo.blur();
  // console.log(ammount, receiverAcc, currentAccount);

  if (
    ammount > 0 &&
    receiverAcc &&
    currentAccount.balance >= ammount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // add negative ammount to currentAccount
    currentAccount.movements.push(-ammount);

    // add positive ammount to receiverAcc
    receiverAcc.movements.push(ammount);

    // display current balance of currentAccount
    updateUi(currentAccount);
  }
});

// G) 🎈 161 Implementing close account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // check the index of username
    const indexUser = accounts.findIndex(
      (ind) => ind.username === currentAccount.username
    );
    console.log(`Succeed to delete ${accounts[indexUser].owner} account.`);

    // delete account
    accounts.splice(indexUser, 1);

    // hide the UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";

  // console.log(accounts);
});

// H) 🎈 162 implementing request loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const ammount = Number(inputLoanAmount.value);

  if (
    ammount > 0 &&
    currentAccount.movements.some((value) => value >= ammount * 0.1)
  ) {
    currentAccount.movements.push(ammount);
    updateUi(currentAccount);
  }

  inputLoanAmount.value = "";
});

// J) 🎈 164 Implementing sorting button
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  // console.log(sorted);
});

// console.log(accounts);

/////////////////////////////////////////////////
/* 
LECTURES
 */
/////////////////////////////////////////////////

// 142 Simple array methods
/* 
// slice()
const arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

// splice
arr.splice(2, 2);
console.log(arr);

// concate
const arr1 = ['Cecilie', 'Lone'];
const arr2 = ['Emil', 'Tobias', 'Linus'];
const arr3 = ['Robin'];
const children = arr1.concat(arr2, arr3);
console.log(children);

const [...children1] = [...arr1, ...arr2];
console.log(children1);

// join
const arr4 = ['j', 'k', 'l', 'm', 'n', 'j', 'd', 'e'];
const letters = arr4.join(' - ');
console.log(letters);

// The new at Method
console.log(arr4[0]);
console.log(arr4.at(0));
console.log(arr4.at(-1));

// length
const arr5 = [3, 4, 5];
console.log(arr5[arr5.length - 1]);
console.log(arr5.slice(-1)[0]);
console.log(arr5.at(-1));
 */

// 144 Looping arrays: forEach
/* 
const money = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of
for (const [index, value] of money.entries()) {
  let x = value;
  x /= 10;
  if (value > 0) {
    console.log(`${index + 1}: You deposited ${value} (${x})`);
  } else {
    console.log(`${index + 1}: You withdrew ${Math.abs(value)} (${x})`);
  }
}

// forEach
console.log('---FOREACH METHOD---');
money.forEach(function (value, index, arrMoney) {
  const x = (arrMoney[index] /= 10);
  if (value > 0) {
    console.log(`${index + 1}: You deposited ${value} (${x})`);
  } else {
    console.log(`${index + 1}: You withdrew ${Math.abs(value)} (${x})`);
  }
});
 */

// 145 forEach with Maps and Sets
/* 
// Maps
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Sets
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'GBP', 'RP', 'USD']);
console.log(currenciesUnique);

// sets doesn't have keys or index
currenciesUnique.forEach(function (value, key, sets) {
  console.log(`${key}: ${value}`);
});
 */

// 146 Project: 'Bankist' App
// id : js   pass : 1111

// 148 Coding challenge #1
/* 
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// GOOD LUCK 😀


// 1. Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'),

const checkDogs = function (dogsJulias, dogsKate) {
  // 2. remove the cat ages from that copied array
  const dogsJuliasCorrected = dogsJulias.slice();
  dogsJuliasCorrected.splice(0, 1);
  dogsJuliasCorrected.splice(-2);
  // console.log(dogsJuliasCorrected);

  // 2. Create an array with both Julia's (corrected) and Kate's data
  // const [...dogsBoth] = [...dogsJuliasCorrected, ...dogsKate];
  const dogsBoth = dogsJuliasCorrected.concat(dogsKate);
  console.log(dogsBoth);

  // 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
  dogsBoth.forEach(function (age, i, dogs) {
    console.log(
      age >= 3
        ? `Dog number ${i + 1} is an adult, and is ${age} years old`
        : `Dog number ${i + 1} is still a puppy 🐶`
    );
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
 */

// 149 Data transformations: map, filter, reduce
/* 
// map

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// convert euro to usd
const eurToUsd = 1.1;
const movementUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

console.log(movementUSD);
console.log(movements);

// for
const movementUSDfor = [];
for (const move of movements) {
  movementUSDfor.push(move * eurToUsd);
}
console.log(movementUSDfor);

// arrow function
const movementUsdArr = movements.map(mov => mov * eurToUsd);
console.log(movementUsdArr);

const movementDesc = movements.map(
  (value, i, arr) =>
    `Movement ${i + 1}: You ${value} > 0 ? 'Deposite' : Withdrawal ${Math.abs(
      value
    )}`
);
console.log(movementDesc);
 */

// 152 The filter method
/* 
// The filter() method creates a new array filled with elements that pass a test provided by a function.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposit = movements.filter(function (value) {
  return value > 0;
});
console.log(movements);
console.log(deposit);

const withdrawals = movements.filter(value => value < 0);
console.log(withdrawals);

// using for method
const depositFor = [];
for (const value of movements) {
  if (value > 0) {
    depositFor.push(value);
  }
}
console.log(depositFor);
const withdrawalsFor = [];
for (const value of movements) {
  if (value < 0) {
    withdrawalsFor.push(value);
  }
}
console.log(withdrawalsFor);
 */

// 153 reduce method
/* 
// The reduce() method returns a single value: the function's accumulated result.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const balance = movements.reduce(function (total, value, i, arr) {
  // show the iteration of the function
  console.log(`Iteration ${i}: ${total}`);

  return (total += value);
}, 0);

console.log(balance);

// using arrow function
const balanceArr = movements.reduce((total, value) => total + value);
console.log(balanceArr);

// using for loop
let balanceInit = 0;
for (const value of movements) {
  balanceInit += value;
}
console.log(balanceInit);

// Maximum value of an array
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
const max = movements.reduce(function (maxi, value) {
  if (maxi > value) {
    return maxi;
  } else {
    return value;
  }
}, movements[0]);
console.log(max);
 */

// 154 Coding challenge #2
/* 
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀

const calcAverageHumanAge = function (ages) {
  // 1.
  const humanAges = ages.map(function (dogAge) {
    return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
  });
  console.log(humanAges);
  // ↪ (7) [36, 4, 32, 2, 76, 48, 28]

  // 2.
  const adult = humanAges.filter(age => age >= 18);
  console.log(adult);
  // ↪ (5) [36, 32, 76, 48, 28]

  // 3.
  const average = adult.reduce(
    (avrg, age, i, arr) => avrg + age / arr.length,
    0
  );
  console.log(average);
  // ↪ 44
};

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);
// };

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
 */

// 155 The magic of chaining methods
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// Pipeline methode
const totalDeposit = movements
  .filter(value => value > 0)
  .map(value => value * eurToUsd)
  .reduce((total, value) => total + value, 0);
console.log(totalDeposit);
 */

// 156 Coding Challenge #3
/* 
// Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀

const calcAverageHumanAge2 = ages =>
  ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(age => age >= 18)
    .reduce((avrg, age, i, arr) => avrg + age / arr.length, 0);

const avg1 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1);
console.log(avg2);
 */

// 157 The find method
/* 
// find()	The value of the first element that passes a test
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const find = movements.find(value => value < 0, 'no');
// console.log(movements);
// console.log(find);
// ↪ -400

// using find() to an object
const accountsObj = [account1, account2, account3, account4];
// console.log(accountsObj);

const acc = accountsObj.find(value => value.owner === 'Jessica Davis');
// console.log(acc);
// ↪ {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

// using for loop
for (const property of accountsObj) {
  // console.log(property);

  const objKeys = Object.keys(property);
  // console.log(objKeys);
  const objValue = Object.values(property);
  // console.log(objValue);

  const owner = objValue.filter((value, i, arr) => {
    if (value === 'Jessica Davis') {
      // return arr;
      // return console.log(arr);
      // ↪ (5) ['Jessica Davis', Array(8), 1.5, 2222, 'jd']
    }
  });
}
 */

// 161 The findIndex() method

// 162 some and every method
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // includes method just return true value if there is value that equal in the array
// // The some() method returns true (and stops) if the function returns true for one of the array elements.
// console.log(movements.includes(-130));
// // ↪ true

// // some() method checks if any array elements pass a test (provided as a callback function).
// const anyDeposits = movements.some((value) => value > 0);
// console.log(anyDeposits);
// // ↪ true
// const anyDeposits1 = movements.some((value) => value > 4000);
// console.log(anyDeposits1);
// // ↪ false

// every() method
// The every() method returns true if the function returns true for all elements.

const isAllDeposit = movements.every((value) => value > 0);
console.log(isAllDeposit);
// ↪ false

// Separate callback
const deposit = (value) => value > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
 */

// 163 flat() and flatMap()
/* 
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());
// 💻 (8) [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat());
// 💻 (6) [Array(2), 3, 4, Array(2), 7, 8]

console.log(arrDeep.flat(2));
// 💻 (8) [1, 2, 3, 4, 5, 6, 7, 8]

// get all movements of accounts
const accMov = accounts.map((value) => value.movements);
console.log(accMov);
// 💻 (4) [Array(8), Array(8), Array(8), Array(5)]
// 0: (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// 1: (8) [5000, 3400, -150, -790, -3210, -1000, 8500, -30]
// 2: (8) [200, -200, 340, -300, -20, 50, 400, -460]
// 3: (5) [430, 1000, 700, 50, 90]

const allMov = accMov.flat();
console.log(allMov);
//💻 (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, //-20, 50, 400, -460, 430, 1000, 700, 50, 90]

// sum all of movements
const overalBalance = allMov.reduce((sum, value) => sum + value, 0);
console.log(overalBalance);
// 💻 1784

// flat()
// sum all of movements with chaining technique
const ovrlBlnChaining = accounts
  .map((value) => value.movements)
  .flat()
  .reduce((sum, value) => sum + value, 0);
console.log(ovrlBlnChaining);
// 💻 1784

// flatMap()
const ovrlBlnChainingFM = accounts
  .flatMap((value) => value.movements)
  .reduce((sum, value) => sum + value, 0);
console.log(ovrlBlnChainingFM);
// 💻 1784
 */

// 164 sorting arrays
/* 
// strings
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());
// 💻 (4) ['Adam', 'Jonas', 'Martha', 'Zach']

// number
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.sort());
// 💻 (8) [-130, -400, -650, 1300, 200, 3000, 450, 70]

const ascendingSort = movements.sort((a, b) => a - b);
console.log(ascendingSort);
// 💻 (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

const descendingSort = movements.sort((a, b) => b - a);
console.log(descendingSort);
// 💻 (8) [3000, 1300, 450, 200, 70, -130, -400, -650]

// return < 0, A, B
// return > 0, B, A
const anotherSortAsc = movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
console.log(anotherSortAsc);
// 💻 (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

const anotherSortDesc = movements.sort((a, b) => {
  if (b < a) return -1;
  if (a < b) return 1;
});
console.log(anotherSortDesc);
// 💻 (8) [3000, 1300, 450, 200, 70, -130, -400, -650]
 */

// 165 more ways of creating and filling arrays
/* 
// generate arrays programmatically, without having to define all the items manualy.

// syntax : Array.from(object, mapFunction, thisValue)
const accArrOwner = Array.from(accounts, (acc) => acc.owner);
console.log(accArrOwner);
// 💻 (4) ['Jonas Schmedtmann', 'Jessica Davis', 'Steven Thomas Williams', 'Sarah Smith']

labelBalance.addEventListener("click", function (e) {
  e.preventDefault();

  const movUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  // console.log(movUI);
  // 💻 (8) [div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value, div.movements__value]

  // console.log(movUI.map((el) => el.textContent));
  // 💻 (8) ['1300€', '70€', '-130€', '-650€', '3000€', '-400€', '450€', '200€']

  // remove euro sign and convert it to number
  // console.log(movUI.map((el) => Number(el.textContent.replace("€", ""))));
  console.log(movUI);
  // 💻 (8) [1300, 70, -130, -650, 3000, -400, 450, 200]
});
 */

// 166 Sumarry: wich array method to use?

// 167 array methods practice
/* 
// 1. sum all of accounts movement
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((value) => value > 0)
  .reduce((sum, value) => sum + value, 0);
console.log(bankDepositSum);
// 💻 25180

// 2.count number of deposit of accounts movement that >= 1000
// using filter()
const numDeposit1000 = accounts
  .flatMap((acc) => acc.movements)
  .filter((value) => value >= 1000).length;
console.log(numDeposit1000);
// 💻 6

// using reduce()
const numDeposit1000Red = accounts
  .flatMap((acc) => acc.movements)
  // .reduce((sum, value) => (value >= 1000 ? sum + 1 : sum), 0);
  .reduce((sum, value) => {
    value >= 1000 ? ++sum : sum;
    return sum;
  }, 0);
console.log(numDeposit1000Red);
// 💻 6

// 3. Create a new object using reduce() with initial parameter
const sumsObj = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sum, value) => {
      // 1. way
      // value > 0 ? (sum.deposits += value) : (sum.withdrawals += value);
      // 2. way
      sum[value > 0 ? "deposits" : "withdrawals"] += value;
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sumsObj);
// 💻 {deposits: 25180, withdrawals: -7340}

// destructure sumsObj
const { deposits, withdrawals } = sumsObj;
console.log(deposits, withdrawals);
// 💻 25180 -7340

// 4. Convert style of title to camel case
// just leave the word in exceptions in lowercase
// this is a nice tittle -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const exceptions = ["a", "an", "the", "but", "or", "on", "in", "with"];

  // const titleCase = title.toLowerCase().split(" ");
  // 💻 (5) ['this', 'is', 'a', 'nice', 'title']

  const titleCase = title
    .toLowerCase()
    .split(" ")
    // .map((word) => word[0].toUpperCase());
    // 💻 (5) ['T', 'I', 'A', 'N', 'T']
    // .map((word) => word.slice(1));
    // 💻 (5) ['his', 's', '', 'ice', 'itle']
    // .map((word) => word[0].toUpperCase() + word.slice(1));
    // 💻 (5) ['This', 'Is', 'A', 'Nice', 'Title']
    .map((word) =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    // 💻 (5) ['This', 'Is', 'a', 'Nice', 'Title']
    .join(" ");
  // 💻 This Is a Nice Title

  return capitalize(titleCase);
};
console.log(convertTitleCase("this is a nice title"));
// 💻 This Is a Nice Title
console.log(convertTitleCase("this is a LONG title but not too long"));
// 💻 This Is a Long Title but Not Too Long
console.log(convertTitleCase("and here is another title with an EXAMPLE"));
// 💻 And Here Is Another Title with an Example
 */

// 168 coding challenge #4
/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

GOOD LUCK 😀
*/
/* 
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1. Loop over the array containing dog objects,
// and for each dog, calculate the recommended food portion
// and add it to the object as a new property.
// Do NOT create a new array, simply loop over the array.
// Forumla: recommendedFood = weight ** 0.75 * 28.
// (The result is in grams of food, and the weight needs to be in kg)

dogs.forEach((property) => {
  property.recommendedFood = Math.trunc(property.weight ** 0.75 * 28);
});

console.log(dogs);

// 2. Find Sarah's dog
// and log to the console whether it's eating too much or too little.
// HINT: Some dogs have multiple owners, so you
// first need to find Sarah in the owners array,
//  and so this one is a bit tricky(on purpose) 🤓

const sarahDog = dogs.find((value, i, arr) => {
  return value.owners.includes("Sarah");
});

console.log(sarahDog);
// 💻 {weight: 13, curFood: 275, owners: Array(2), recommendedFood: 191}

console.log(
  `Sarah's dog is eating too ${
    sarahDog.curFood > sarahDog.recommendedFood ? "much" : "little"
  }`
);
// 💻 Sarah's dog is eating too much

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch')
// and an array with all owners of dogs who eat too little('ownersEatTooLittle').

const ownersEatTooMuch = dogs
  .filter((eat) => eat.curFood > eat.recommendedFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooMuch);
// 💻 (3) ['Matilda', 'Sarah', 'John']

const ownersEatTooLittle = dogs
  .filter((eat) => eat.curFood < eat.recommendedFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooLittle);
// 💻 (3) ['Alice', 'Bob', 'Michael']

// 4. Log a string to the console for each array created in 3.,
// like this: "Matilda and Alice and Bob's dogs eat too much!"
// and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
// 💻 Matilda and Sarah and John's dogs eat too much!

console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);
// 💻 Alice and Bob and Michael's dogs eat too little!

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

const isTrue = dogs.some(
  (isItTru) => isItTru.curFood === isItTru.recommendedFood
);
console.log(isTrue);
// 💻 false

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
const isOkay = dogs.some(
  (isItOkay) =>
    isItOkay.curFood > isItOkay.recommendedFood * 0.9 &&
    isItOkay.curFood < isItOkay.recommendedFood * 1.1
);
console.log(isOkay);
// 💻 true

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

const dogEatOkay = dogs.filter(
  (isItOkay) =>
    isItOkay.curFood > isItOkay.recommendedFood * 0.9 &&
    isItOkay.curFood < isItOkay.recommendedFood * 1.1
);
console.log(dogEatOkay);
// 💻 0 {weight: 32, curFood: 340, owners: Array(1), recommendedFood: 376}

// 8. Create a shallow copy of the dogs array
//  and sort it by recommended food portion in an ascending order(keep in mind that the portions are inside the array's objects)

const dogsAscendingSort = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsAscendingSort);
console.log(dogs);
 */
