'use strict';

// 128 Default parameters
/* 
const bookings = [];

const createBooking = function (
  flightNum = 1,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //   ES5 - Create a default values using old ways
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
// console.log(bookings);
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
// skip to input parameter using undefined
createBooking('LH123', undefined, 1000);
 */

// 129 How passing arguments work: Value vs Reference
/* 
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schedtman',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  //   flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    console.log('Checked in');
    console.log(`Happy flying! ${passenger.name}`);
    //   // Happy flying! Mr. Jonas Schedtman
    console.log(`Your passport: ${passenger.passport}`);
    //   // Your passport: 24739479284
    console.log(`Your flight number: ${flightNum}`);
    // LH999
  } else {
    console.log('Wrong passport');
    console.log(`Your passport: ${passenger.passport}`);
  }
};
checkIn(flight, jonas);
console.log(flight);
// LH234
console.log(jonas);
// // {name: 'Mr. Jonas Schedtman', passport: 24739479284}

// checkIn(undefined, { name: 'Udin', passport: 24739479284 });

// Change passport
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000000);
};

newPassport(jonas);
checkIn(flight, jonas);
 */

// 131 Functions accepting cllback functions
/* 
const oneWord = function (str) {
  const newStr = str.replace(/ /g, '').toLowerCase();
  //   console.log(newStr);
  // ↪ alrakasatriaramadhan

  return newStr;
};

const upperFirstWord = function (str1) {
  const [first, ...others] = str1.split(' ');
  const newestStr = [first.toUpperCase(), ...others].join(' ');

  //   console.log(first);
  // ↪ Alraka
  //   console.log(others);
  // ↪ (2)[('Satria', 'Ramadhan')]
  //   console.log(newestStr);
  // ↪ ALRAKA Satria Ramadhan

  return newestStr;
};

// Call function
// oneWord('Alraka Satria Ramadhan');
// upperFirstWord('Alraka Satria Ramadhan');

// High-order function
const transformer = function (str2, fn, oW) {
  console.log(`Original string: ${str2}`);
  // ↪ Original string: JavaScript is the best!
  console.log(`Transformed string: ${fn(str2)}`);
  // ↪ Transformed string: JAVASCRIPT is the best!
  console.log(`Transformed by: ${fn.name}`);
  // ↪ Transformed string: upperFirstWord
  console.log(`Transformed string: ${oW(str2)}`);
  // ↪ Transformed string: javascriptisthebest!
  console.log(`Transformed by: ${oW.name}`);
  // ↪ Transformed string: oneWord
};

// call function
transformer('JavaScript is the best!', upperFirstWord, oneWord);
 */

// 132 Function returning function
/* 
const greet = function (greeting) {
  return function (name) {
    // console.log(`${greeting} ${name}`);
    return function (why) {
      console.log(`${greeting} ${name} ${why}`);
    };
  };
};

const greetHey = greet('Hey');
greetHey('slur')('kumaha damang?');
// ↪ Hey slur Kumaha damang?

greet('Whatsup')('dulur')('kamana wae atuh?');
// ↪ Whatsup dulur kamana wae atuh?

// using arrow function
const greet1 = greeting1 => name1 => why1 =>
  console.log(`${greeting1} ${name1} ${why1}`);

greet1('Hello')('dulur')('pinjem dulu seratus?');
// ↪ Hello dulur pinjem dulu seratus?
 */

// 133 The call and apply methods
/* 
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  booking: [],
  // book(flightNum, name) {}
  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
    this.booking.push({
      flight: `${this.iataCode} ${flightNum}`,
      name: `${name}`,
    });
  },
};

lufthansa.book(239, 'Jonas Schedtmann');
// ↪ Jonas Schedtmann booked a seat on Lufthansa flight LH 239
lufthansa.book(635, 'Jhon Smith');
// ↪ Jhon Smith booked a seat on Lufthansa flight LH 635

// console.log(lufthansa);
// console.log(lufthansa.booking);
// ↪ 0: {flight: 'LH 239', name: 'Jonas Schedtmann'}
// ↪ 1: {flight: 'LH 635', name: 'Jhon Smith'}

// extract value of [{object}]
// const [[index, { flight, name }]] = lufthansa.booking.entries();
// console.log(index, flight, name);
// ↪ 0 'LH 239' 'Jonas Schedtmann'

// for (const [i, { flight, name }] of lufthansa.booking.entries()) {
//   console.log(i, flight, name);
// ↪ 0 'LH 239' 'Jonas Schedtmann'
// }

// Call method
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  booking: [],
};

const book = lufthansa.book;

book.call(eurowings, 23, 'Alraka Ramadhan');
book.call(lufthansa, 413, 'Udin Sedunia');

// console.log(eurowings);
// console.log(lufthansa);

// Apply method
const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'LX',
  booking: [],
};

const flightData = [678, 'Asep Bensin'];

book.apply(swiss, flightData);
// ↪ Asep Bensin booked a seat on Swiss Airlines flight LX 678

// or you can do call method with spread operator (...spread)
book.call(swiss, ...flightData);
// ↪ Asep Bensin booked a seat on Swiss Airlines flight LX 678

// lopping through flightData
const flightData1 = [
  [456, 'Dadang Seeng'],
  [234, 'Mansyur Knalpot'],
  [856, 'Edi Gaspul'],
];

for (const dataFlight of flightData1) {
  book.apply(swiss, dataFlight);
}

for (const [num, name] of flightData1) {
  lufthansa.book(num, name);
}

const bandara = {
  name: [lufthansa.airline, swiss.airline, eurowings.airline],
  flightData1: [
    [456, 'Dadang Seeng'],
    [234, 'Mansyur Knalpot'],
    [856, 'Edi Gaspul'],
  ],
};

// looping through object
const bandara2 = {
  name: [lufthansa, swiss, eurowings],
  flightData1: [
    [456, 'Sarah Azhari'],
    [234, 'Mia Khalifa'],
    [856, 'Karley Greey'],
  ],
};
// book.call(eurowings, 23, 'Alraka Ramadhan');

for (const [i, [num, person]] of bandara2.flightData1.entries()) {
  //   console.log(i, num, person);
  //   console.log(bandara2.name[i]);
  book.call(bandara2.name[i], num, person);
}
 */

// 134 The bind method
/* 
const lufthansa = {
  name: 'lufthansa',
  airline: 'Lufthansa',
  iataCode: 'LH',
  booking: [],
  // book(flightNum, name) {}
  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
    this.booking.push({
      flight: `${this.iataCode} ${flightNum}`,
      name: `${name}`,
    });
  },
};

// bind lufthansa object method
const book = lufthansa.book;
const bookLuft = book.bind(lufthansa);
bookLuft(234, 'Afira Sinata');

// bind eurowing object with lufthansa object method
const eurowings = {
  name: 'eurowings',
  airline: 'Eurowings',
  iataCode: 'EW',
  booking: [],
};

const book1 = lufthansa.book;
const bookEW = book1.bind(eurowings);
bookEW(345, 'Adit Sopo Jarwo');

// bind eurowing object with lufthansa object method
const swiss = {
  name: 'swiss',
  airline: 'Swiss Airlines',
  iataCode: 'LX',
  booking: [],
};

const book2 = lufthansa.book;
const bookSA = book2.bind(swiss);
bookSA(345, 'Adit Sopo Jarwo');

// using preset
const bookSA93 = book2.bind(swiss, 93);
bookSA93('Alex ngaberelex');
bookSA93('Dadang begal');

// Using event listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(lufthansa);

//   lufthansa.planes++;
//   console.log(lufthansa.planes);
// };

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// Using event listeners with this keyword
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// binding function
const addTax = function (rate, value) {
  return value + value * rate;
};

const addVAT = addTax.bind(null);
console.log(addVAT(0.23, 100));

// preset parameter
const ppn = addTax.bind(null, 0.11);
console.log(ppn(5000));
// ↪ 5550
console.log(ppn(4500));
// ↪ 4995

// something similar with the technique above
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const ppn2 = addTaxRate(0.11);
console.log(ppn2(5000));
// ↪ 5550
console.log(ppn2(4500));
// ↪ 4995
 */

// 135 Coding Challenge #1
/* 
// Let's build a simple poll app!

// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

// Here are your tasks:

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)

//   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// HINT: Use many of the tools you learned about in this and the last section 😉

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

// GOOD LUCK 😀

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  // ↪ (4) [0, 0, 0, 0]
  registerNewAnswer: function () {
    // Get answer
    const answer = Number(
      prompt(`${this.question}\n${this.options.join('\n')}`)
    );
    console.log(answer);

    // Register answer
    // Short-circuit evaluation
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },

  displayResults: function (type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [1, 2, 3, 4] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

// And oprator behavior (short circuiting)
// function A() {
//   console.log('called A');
//   return true;
// }
// function B() {
//   console.log('called B');
//   return false;
// }
// function C() {
//   console.log('called C');
//   return false;
// }
// function D() {
//   console.log('called D');
//   return true;
// }
// console.log(A() && B() && C() && D());
 */

// 136 Immediately invoked function expresssions

// 137 Closure

// Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// re-asiggning f funciton
h();
f();
console.dir(f);

// Example 2
const boarPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passenger`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boarPassengers(180, 3);

console.dir(setTimeout);
