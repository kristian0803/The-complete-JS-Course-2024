'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-10-18T21:31:17.178Z',
    '2023-11-23T07:42:02.383Z',
    '2023-12-13T09:15:04.904Z',
    '2023-12-27T10:17:24.185Z',
    '2023-12-28T14:11:59.604Z',
    '2024-01-15T17:01:17.194Z',
    '2024-01-19T06:36:17.929Z',
    '2024-01-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2023-09-05T17:01:17.194Z',
    '2023-10-18T21:31:17.178Z',
    '2023-11-23T07:42:02.383Z',
    '2023-12-13T09:15:04.904Z',
    '2023-12-27T10:17:24.185Z',
    '2023-01-17T14:11:59.604Z',
    '2024-01-19T04:36:17.929Z',
    '2024-01-20T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

// Jonas code
/* 
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
 */

// Star Bankist APP

// A)🎈 148 Displaying transaction called movements

const formatMovementDate = function (moveDate, localeTime) {
  // 177 🎈 Adding dates
  // format dates (day/month/year)

  // convert Date to days
  // (hours/day, minutes/hour, seconds/minute, milisecond/second)
  const a1day = 24 * 60 * 60 * 1000;
  // 💻 86400000

  // count days has passed
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / a1day));

  // store days has been passed to variable
  const daysPassed = calcDaysPassed(moveDate, new Date());
  // console.log(daysPassed);

  // Get actual date
  // const day = now.getDate();
  // 💻 1, 2, 3, 4, 5, ...
  const day = `${moveDate.getDate()}`.padStart(2, 0);
  // 💻 01, 02, 03, 04, 05, ...

  const month = `${moveDate.getMonth() + 1}`.padStart(2, 0);
  const year = moveDate.getFullYear();

  const month1 = moveDate.toLocaleString('en-us', { month: 'short' });

  // request a weekday along with a long date
  let options = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  // console.log(new Intl.DateTimeFormat('id-ID', options).format(now));
  // 💻 "Rabu, 24 Januari 2024"

  // display format dates has been passed
  if (daysPassed === 0) {
    return 'Today';
  } else if (daysPassed === 1) {
    return 'Yesterday';
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    return new Intl.DateTimeFormat(localeTime, options).format(moveDate);
  }
};

const formattedCurr = function (accLocale, accCurency, value) {
  return new Intl.NumberFormat(accLocale, {
    style: 'currency',
    currency: accCurency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  // 3. get rid the element of movement__row class
  containerMovements.innerHTML = '';

  // I) 164 🎈 implementing sorting
  // check if sort is true and make a copy of movements array using slice() method
  const accMovements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  // 1. create a function to displaying data of account1.movements in forEach looping method
  accMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const moveDate = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(moveDate, acc.locale);
    const displayMov = formattedCurr(acc.locale, acc.currency, mov);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}
        </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${displayMov}</div>
      </div>
    `;

    // 2. changes the html element content
    containerMovements.insertAdjacentHTML('afterbegin', html);
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
      .split(' ')
      // .map(function (name) {
      //   return name[0];
      // })
      // with arrow function
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);
// console.log(accounts);

// C) 🎈 Displaying balance
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((total, value) => total + value, 0);
  // 💻 25952.59€
  const displayBlnc = formattedCurr(acc.locale, acc.currency, acc.balance);

  labelBalance.textContent = `${displayBlnc}`;
};

// D) 🎈 Displaying summary
const calcDisplaySummary = function (acc) {
  // 1. Deposit
  const inComes = acc.movements
    .filter(value => value > 0)
    .reduce((total, value) => total + value, 0);
  // console.log(inComes);
  // 💻 27 035,20 €
  const displaySmry = formattedCurr(acc.locale, acc.currency, inComes);
  labelSumIn.textContent = `${displaySmry}`;

  // 2. Withdrawals
  const outComes = acc.movements
    .filter(value => value < 0)
    .reduce((total, value) => total + value, 0);
  // console.log(Math.abs(outComes));
  // 💻 1082.61€
  const displayOutCm = formattedCurr(
    acc.locale,
    acc.currency,
    Math.abs(outComes)
  );
  labelSumOut.textContent = `${displayOutCm}`;

  // 3. Interest
  const interest = acc.movements
    .filter(deposit => deposit > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    // only sumarize the interest that are >= 1
    .filter((interes, i, arr) => {
      // console.log(arr);
      return interes >= 1;
    })
    .reduce((total, value) => total + value, 0);
  // console.log(interest);
  // 💻 323.46€
  const displayIntrs = formattedCurr(acc.locale, acc.currency, interest);
  labelSumInterest.textContent = `${displayIntrs}`;
};

// 🎈 function displaying content
const updateUi = function (acc) {
  // B. Display movements
  displayMovements(acc);

  // C. Display balance
  displayBalance(acc);

  // D. Display summary
  calcDisplaySummary(acc);
};

// K) 🎈 177 Adding Dates
const displayDate = function (date, localeTime) {
  // 2. dates
  const now = new Date();
  // format dates (day/month/year)

  // const day = now.getDate();
  // 💻 1, 2, 3, 4, 5, ...
  const day = `${now.getDate()}`.padStart(2, 0);
  // 💻 01, 02, 03, 04, 05, ...
  const dayName = now.toLocaleString('en-us', { weekday: 'long' });

  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = `${now.getHours()}`.padStart(2, 0);
  const min = `${now.getMinutes()}`.padStart(2, 0);

  const month1 = now.toLocaleString('en-us', { month: 'short' });
  // return (labelDate.textContent = `${dayName}, ${day} ${month1} ${year}, ${hours}:${min}`);

  // 📍 ---  179 Internationalizing Date(Intl) --- 📍
  // request a weekday along with a long date
  let options = {
    weekday: 'long',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  // console.log(new Intl.DateTimeFormat('id-ID', options).format(now));
  // 💻 "Rabu, 24 Januari 2024"

  const locale = currentAccount.locale;

  return (labelDate.textContent = new Intl.DateTimeFormat(
    localeTime,
    options
  ).format(date));

  // ♨_♨ --- END SECTION --- ♨_♨
};

// E) 🎈 159 Implementing login

// Event handlers

// global variable
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('LOGIN');

  // 1. Find the account with username
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // 2. Macth the pin
  // check if the currentAccount is exist
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // A. Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // set opacity to 100 to show the content
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    // Removes focus from an element
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // displaying content
    updateUi(currentAccount);

    // displaying dates
    const now = new Date();
    const locale = currentAccount.locale;
    displayDate(now, locale);
  }
});

// F) 🎈 160 Implementing tranfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const ammount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // clear field
  inputTransferAmount.value = inputTransferTo.value = '';
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

    // add movementsDates
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // display current balance of currentAccount
    updateUi(currentAccount);
  }
});

// G) 🎈 161 Implementing close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // check the index of username
    const indexUser = accounts.findIndex(
      ind => ind.username === currentAccount.username
    );
    console.log(`Succeed to delete ${accounts[indexUser].owner} account.`);

    // delete account
    accounts.splice(indexUser, 1);

    // hide the UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';

  // console.log(accounts);
});

// H) 🎈 162 implementing request loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // const ammount = Number(inputLoanAmount.value);
  // rounding ammount using floor automatically convert it to number
  const ammount = Math.floor(inputLoanAmount.value);

  if (
    ammount > 0 &&
    currentAccount.movements.some(value => value >= ammount * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(ammount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUi(currentAccount);
    }, 2500);
  }

  inputLoanAmount.value = '';
});

// J) 🎈 164 Implementing sorting button
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  // console.log(sorted);
});

// 1. FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUi(currentAccount);
containerApp.style.opacity = 100;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// 171. Converting and Checking
/* 
console.log(23 === 23.0);
// 💻 true

// Base 10 - 0 to 9. 1/10 0.1. 3/10 = 3.33333
// Binary base 2- 0 1
console.log(0.1 + 0.2);
// 💻 0.30000000000000004

console.log((0.1 + 0.2).toPrecision(1));
// 💻 0.3

// conversion
// 1. string to number
console.log(Number('23'));
// The Unary + Operator
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px, 10'));
// 💻 30
console.log(Number.parseInt('e23, 10'));
// 💻 NaN
console.log(Number.parseFloat('2.5rem'));
// 💻 2.5
console.log(Number.parseInt('2.5rem'));
// 💻 2

// Check if value is number
console.log(Number.isNaN(20));
// 💻 false
console.log(Number.isNaN('20'));
// 💻 false
console.log(Number.isNaN(+'20X'));
// 💻 true
console.log(Number.isNaN(23 / 0));
// 💻 false
console.log(Number.isFinite(20));
// 💻 true
console.log(Number.isFinite('20'));
// 💻 false
console.log(Number.isFinite(+'20X'));
// 💻 false
console.log(Number.isFinite(23 / 0));
// 💻 false
console.log(Number.isInteger(23));
// 💻 true
 */

// 172. Math and Rounding
/* 
console.log(Math.sqrt(25));
// 💻 5
console.log(255 ** (1 / 2));
// 💻 5

console.log(Math.max(5, 18, 23, 11, 2));
// 💻 23
console.log(Math.max(5, 18, '23', 11, 2));
// 💻 23
console.log(Math.max(5, 18, '23px', 11, 2));
// NaN
console.log(Math.min(5, 18, 23, 11, 2));
// 💻 2
console.log(Math.PI * Number.parseFloat('10px') ** 2);
// 💻 314.1592653589793
// random number (0 - 10)
console.log(Math.trunc(Math.random() * 10) + 1);

// random number (x - y)
const randomInt = (min, max) => {
  return Math.trunc(Math.random() * (max - min) + 1) + min;
  // 0...1 -> 0...(max - min) -> min...max
};
// random number ((-x) - (-y))
const randomMin = (min, max) => {
  return Math.floor(Math.random() * (max - min) + 1) + min;
  // 0...1 -> 0...(max - min) -> min...max
};
console.log(randomInt(10, 20));
console.log(randomInt(-10, -20));

// Rounding integers
console.log(Math.trunc(23.3));
// 💻 23
console.log(Math.round(23.3));
// 💻 23
console.log(Math.round(23.9));
// 💻 24

console.log(Math.ceil(23.3));
// 💻 24
console.log(Math.ceil(23.9));
// 💻 24

console.log(Math.floor(23.3));
// 💻 23
console.log(Math.floor(23.9));
// 💻 23

// Rounding decimals
// toFixed() return a string
console.log((2.7).toFixed(0));
// 💻 3
console.log((2.7).toFixed(3));
// 💻 2.700
console.log((2.345).toFixed(2));
// 💻 2.35
// convert to number using unary +
console.log(+(2.345).toFixed(2));
 */

// 173. The Remainder Operator
/* 
console.log(5 % 2);
// 💻 1
console.log(5 / 2); // 5 = 2 * 2 + 1
// 💻 2.5

console.log(8 % 3);
// 💻 2

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    // 0, 2, 4, 6 ... rows
    // if (i % 2 === 0) {
    //   row.style.backgroundColor = 'orangered';
    //   row.style.opacity = '80';
    // }
    // 0, 3, 6, 9 ... rows
    if (i % 3 === 0) {
      row.style.backgroundColor = 'blue';
      row.style.opacity = '80';
    }
  });
});
 */

// 174. Numeric Separators
/* 
// 287,460,000,000
const money = 287_460_000_000;
console.log(money);
// 💻 287460000000
 */

// 175. Working with BigInt

// 176. Creating dates
/* 
console.log(account1);
const movementsDates = [
  '2019-11-18T21:31:17.178Z',
  '2019-12-23T07:42:02.383Z',
  '2020-01-28T09:15:04.904Z',
  '2020-04-01T10:17:24.185Z',
  '2020-05-08T14:11:59.604Z',
  '2020-05-27T17:01:17.194Z',
  '2020-07-11T23:36:17.929Z',
  '2020-07-12T10:51:36.790Z',
];

const now = new Date();
console.log(now);
// 💻 Fri Jan 19 2024 01:34:34 GMT+0700 (Western Indonesia Time)
console.log(new Date('Fri Jan 19 2024 01:28:12'));
// 💻 Fri Jan 19 2024 01:28:12 GMT+0700 (Western Indonesia Time)
console.log(new Date('Dec 24, 2024'));
// 💻 Tue Dec 24 2024 00:00:00 GMT+0700 (Western Indonesia Time)
console.log(new Date(account1.movementsDates[0]));
// 💻 Tue Nov 19 2019 04:31:17 GMT+0700 (Western Indonesia Time)

// "2019-11-18T21:31:17.178Z"
// Mon Nov 18 2019 21:31:17 GMT+0000 (Western European Standard Time)

const indTime = Date.parse(new Date());
console.log(indTime);
// 💻 1705604169000
console.log(new Date(1705604169000));
// 💻 Fri Jan 19 2024 01:56:09 GMT+0700 (Western Indonesia Time)

console.log(new Date().toISOString());
// 💻 2024-01-18T19:03:49.551Z
console.log(new Date('2024-01-18T19:03:49.551Z'));
// 💻 Fri Jan 19 2024 02:03:49 GMT+0700 (Western Indonesia Time)

// Date.prototype.getUTCTime = function () {
//   return new Date(
//     this.getUTCFullYear(),
//     this.getUTCMonth(),
//     this.getUTCDate(),
//     this.getUTCHours(),
//     this.getUTCMinutes(),
//     this.getUTCSeconds()
//   ).getTime();
// };


// Date(FullYear, Month, Date, Hours, Minutes, Seconds)
console.log(new Date(2037, 10, 19, 15, 23, 5));
// 💻 Thu Nov 19 2037 15:23:05 GMT+0700 (Western Indonesia Time)
console.log(new Date(2037, 10, 19, 15, 23, 5).toISOString());
// 💻 2037-11-19T08:23:05.000Z
console.log(new Date('2037-11-19T08:23:05.000Z'));
// 💻 Thu Nov 19 2037 15:23:05 GMT+0700 (Western Indonesia Time)


// The toISOString() method returns a date object as a string, using the ISO standard.
// The standard is called ISO - 8601 and the format is:
// 'YYYY-MM-DDTHH:mm:ss.sssZ'
// '2037-11-19T08:23:05.000Z'
 

// get 3 days after
console.log(new Date(0));
// 💻 Thu Jan 01 1970 07:00:00 GMT+0700 (Western Indonesia Time)
console.log(new Date(3 * 24 * 60 * 60 * 1000));
// 💻 Sun Jan 04 1970 07:00:00 GMT+0700 (Western Indonesia Time)

// TimeStamp
const timeStamp = 3 * 24 * 60 * 60 * 1000;
console.log(timeStamp);
// 💻 259200000
console.log(new Date(timeStamp));
// 💻 Sun Jan 04 1970 07:00:00 GMT+0700 (Western Indonesia Time)
console.log(Date.now());
// 💻 1705607809985

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
// 💻 Thu Nov 19 2037 15:23:00 GMT+0700 (Western Indonesia Time)
console.log(future.getFullYear());
// 💻 2037
console.log(future.getMonth());
// 💻 10
console.log(future.getDate());
// 💻 19
console.log(future.getHours());
// 💻 15
console.log(future.getMinutes());
// 💻 23
console.log(future.getSeconds());
// 💻 0
console.log(future.toISOString());
// 💻 2037-11-19T08:23:00.000Z
console.log(future.getTime());
// 💻 2142231780000
*/

// 178. Operations with dates
/* 
// Date(FullYear, Month, Date, Hours, Minutes, Seconds)
const future = new Date(2037, 10, 19, 15, 23);
console.log(typeof future);
// 💻 object
console.log(future);
// 💻 Thu Nov 19 2037 15:23:00 GMT+0700 (Western Indonesia Time)

// convert to number using unary operator (+)
console.log(typeof +future);
// 💻 number
console.log(+future);
// 💻 2142231780000

// convert Date to days
// (hours/day, minutes/hour, seconds/minute, milisecond/second)
const a1day = 24 * 60 * 60 * 1000;
// 💻 86400000

const calcDaysPassed = (date1, date2) => Math.abs((date2 - date1) / a1day);

// (minutes/day hours/day, minutes/hour, seconds/minute, milisecond/second)
const a1Min = 1440 * 24 * 60 * 60 * 1000;

const calcMinutesPassed = (date1, date2) => {
  const hours = new Date(Math.abs((date2 - date1) % a1day)).getHours();
  const minutes = new Date(Math.abs((date2 - date1) % a1day)).getMinutes();
  return console.log(`${hours}h ${minutes}m`);
};

const days1 = calcDaysPassed(
  new Date(2037, 3, 4),
  // 💻 2123254800000
  new Date(2037, 3, 14)
  // 💻 2124118800000
);
console.log(days1);
// 💻 (2124118800000 - 2123254800000) / 86400000 = 10

// calcMinutesPassed(
//   new Date(2037, 3, 24, 12, 10, 30),
//   // 💻
//   new Date(2037, 3, 24, 12, 17, 20)
//   // 💻
// );
 */

// 📍 ---  179 Internationalizing Dates(Intl) --- 📍
/* 
// request a weekday along with a long date
const date = new Date();
let dateFromat = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
// The navigator object contains information about the browser.
// .language -> Returns browser language
const localeTime = navigator.language;
console.log(new Intl.DateTimeFormat(localeTime, dateFromat).format(date));
// 💻  "Rabu, 24 Januari 2024"
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  180 Internationalizing Number (Intl) --- 📍
/* 
const num = 3884764.23;
const options = {
  style: 'unit',
  unit: 'kilometer',
};

console.log('US: ', new Intl.NumberFormat('en-US').format(num));
// 💻 US:  3,884,764.23
console.log('Germany: ', new Intl.NumberFormat('de-DE').format(num));
// 💻 Germany:  3.884.764,23
console.log('Syria: ', new Intl.NumberFormat('ar-SY').format(num));
// 💻 Syria:  ٣٬٨٨٤٬٧٦٤٫٢٣
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(num)
);
// 💻 id-ID 3.884.764,23
console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
// 💻 3,884,764.23 km
console.log(
  'ID: ',
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
    num
  )
);
// 💻 ID:  Rp 3.884.764,23
console.log(
  'Germany: ',
  new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(
    num
  )
);
// 💻 Germany:  3 884 764,23 €
console.log(
  typeof new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num)
);
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  181 Timer: setTimeout and setInterval --- 📍

// syntax: setTimeout(function, milliseconds, param1, param2, ...)

// setTimeOut()
const inggredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...inggredients
);
console.log('Waiting...');

if (inggredients.includes('spinach')) {
  clearTimeout(pizzaTimer);
}

// setInterval()

// ♨_♨ --- END SECTION --- ♨_♨
