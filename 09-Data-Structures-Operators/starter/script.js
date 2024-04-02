'use strict';

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// create an method outside and add it to an object
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0,
    close: 24,
  },
  // sat: {
  //   open: 0,
  //   close: 24,
  // },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  // add some method from outside object
  openingHours,

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // in ES6 new function syntax you can write method like this
  // order(starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // Immediatly do destructuring while creating an object methods (line-106)
  orderDelivery: function ({
    time = '20:00',
    address,
    starterIndex = 1,
    mainIndex = 0,
  }) {
    return console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}. Will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}.`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// 103 Destructuring Arrays
/*
// 1. without destructuring
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log(a, b, c);

// 2. with destructuring technique
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

// 3. try doing destructuring with restaurant categories
const [first, ...rest] = restaurant.categories;
console.log(first, rest);

// 4. receive 2 values from a function using destructuring
console.log(typeof restaurant.order(2, 0), ':', restaurant.order(2, 0));
const [starer, mainCourse] = restaurant.order(2, 0);
console.log(typeof (starer, mainCourse), ':', starer, mainCourse);

// 5. nested array destructuring
const nested = [2, 5, [1, 4]];
const [n, e, [s, ted]] = nested;
console.log(typeof (n, e, s, ted), typeof nested);
console.log(n, e, s, ted);

// 6. default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

*/

// 104 Destructuring Object
/* 
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
console.log(typeof name, typeof openingHours);

// Assigning to a new variable names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default Values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

// Immediatly do destructuring while creating an object methods (line33)
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// default values
restaurant.orderDelivery({
  address: 'Via del sole, 21',
  starterIndex: 1,
});
 */

// 105 Spread operator (...)
/* 
// without spread operator
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// using spread operator
const newArr = [1, 2, ...arr];
console.log(newArr);

// create a new array menu
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays or more
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Itterables: arrays, string, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);

// Function with multiple arguments and use spread operator to pass those arguments (line 45)
// received values using prompt window
const ingredients = [
  // prompt(`Lets make pasta! Ingredient 1?`),
  // prompt('Ingredient 2'),
  // prompt('Ingredient 3'),
];
console.log(ingredients);
restaurant.orderPasta(...ingredients);

// Objects - using spread operator
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

// Enable to change a property value of an object without changing the original one
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
 */

// 106 Rest operator (...)
/* 
// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4, 5]];
console.log(arr);

// REST, because on LEFT side of =
const [a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a, b, rest);

const [pz, rs, ...otherFoods] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pz, rs, otherFoods);

// Objects
const { sat, ...rest1 } = restaurant.openingHours;
console.log(sat, rest1);

// FUnctions of sum
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
 */

// 107 Short Circuiting (&& and ||)
/* 
// OR statement: The first truthy value will be executed
console.log('---- OR ----');
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// compare tenary operator with short circuiting
// using tenary operator
restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// using short circuiting (OR)
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// AND statement: The second truthy value will be executed
console.log('---- AND ----');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'Jonas');

// using if logical
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

// using short circuiting (AND)
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
 */

// 108 Nulish coalescing operator
/* 
// Nullish : null and undefined (Not 0 or '')
// If the FIRST operand is null or undefined the SECOND operand will be executed

// using tenary operator
// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// using short circuiting (OR)
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// using Nullish coalescing operator
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests ?? 10;
console.log(guests3);
 */

// 109 Logical assignment operators
/* 
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// without OR assginment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// console.log(rest1);
// console.log(rest2);

// with  OR assginment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
// console.log(rest1);
// console.log(rest2);

// with Nullish assginment operator
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;
// console.log(rest1);
// console.log(rest2);

// with AND assignment operator
rest2.owner = rest2.owner && '<ANONYMOUS>';
rest2.owner = rest2.owner && '<ANONYMOUS>';

rest1.owner &&= '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
 */

// 110 Coding Challenge #1
/* 
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Create one player array for each team (variables 'players1' and 'players2')
// using destructuring technique
console.log('---#1---');
const [players1, players2] = game.players;
console.log(players1, players2);
console.log(`Players in ${game.team1} : ${players1}`);
console.log(`Players in ${game.team2} : ${players2}`);

// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
console.log('---#2---');
// using ...rest operator
const [gk1, ...fieldPlayers1] = players1;
console.log(gk1, fieldPlayers1);
console.log(`The ${game.team1}'s goalkeeper is : ${gk1}`);
console.log(`The ${game.team1}'s field players are : ${fieldPlayers1}`);

const [gk2, ...fieldPlayers2] = players2;
console.log(gk2, fieldPlayers2);
console.log(`The ${game.team2}'s goalkeeper is : ${gk2}`);
console.log(`The ${game.team2}'s field players are : ${fieldPlayers2}`);

// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
console.log('---#3---');
// using ...spread operator
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
console.log(`All players in today match : \n ${allPlayers}`);

// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
console.log('---#4---');
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
console.log(`The final players in ${game.team1} : ${players1Final}`);

// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
console.log('---#5---');
// first method
// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);
// second method
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
console.log('---#6---');

const printGoals = function (...numbersPlayer) {
  console.log(`${numbersPlayer.length} goals were scored`);
  console.log(`${numbersPlayer}`);
};
// first way to call the printGoals function
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// second way to call the printGoals function
printGoals(...game.scored);

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
console.log('---#7---');
team1 < team2 && console.log(`Team 1 is more likely to win`);
 */

// 111 Looping arrays : The for-of loop
/* 
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);
for (const item of menu) {
  console.log(item);
}

// using entries()
console.log([...menu.entries()]);
console.log(`---without destructuring---`);
for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

// using destructuring technique
console.log(`---using destructuring---`);
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
*/

// 112 Enhanced object literals

// 113 Optional chaining(?.)
/* 
// 1. We want to know is there any certain property in an object and get the value of it
// console.log(restaurant.openingHours.mon.open);

// Check if method of function is exist and do something
// old ways if the property of an object or funciton is exist
// console.log(restaurant.openingHours.thu.open);
if (restaurant.openingHours && restaurant.openingHours.thu)
  console.log(openingHours.thu.open);
//  or
if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);

// old ways if the property of an object or funciton isn't exist it will throw an error
// console.log(restaurant.openingHours.mon.open);
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(openingHours.mon.open);
//  or
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// with optional chaining (?.)
// if the property of an object or funciton isn't exist it will throw an undefined or null instead of throwing an error
console.log(restaurant.openingHours.mon?.open);

// multiple optional chaining (?.)
console.log(restaurant.openingHours?.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  // console.log(day);

  // console.log(`${day}`, restaurant.openingHours[day]);

  // this is the wrong syntax
  // console.log(`${day}`, restaurant.openingHours.day);

  // it will throw undefined
  // console.log(openingHours.mon);

  // with optional chaining
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, We open at ${open}`);
}

// Object
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisoto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [
  {
    name: 'Jonas',
    email: 'hello@jonas.io',
  },
];

console.log(users[0]?.name ?? 'User array empty');
console.log(users[1]?.name ?? 'User array empty');
 */

// 114 Looping objects : Object keys, values, and entries
/* 
// Object keys - Property names
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

// Object values - Property values
const values = Object.values(openingHours);
console.log(values);

for (const times of Object.values(openingHours)) {
  // console.log(times);
  let openTimes = `We're open at ${times.open} and close at ${times.close}`;
  console.log(openTimes);
}

// Object entries - Property names and Property values
const entries = Object.entries(openingHours);
console.log(entries);

const [entries2] = [Object.entries(game.odds)];
console.log(entries2);
// (3) [Array(2), Array(2), Array(2)]

const [...entries3] = Object.entries(game.odds);
console.log(entries3);
// (3) [Array(2), Array(2), Array(2)]

const entries7 = Object.entries(game.odds);
console.log(entries3);
// (3) [Array(2), Array(2), Array(2)]

const [entries1] = Object.entries(game.odds);
console.log(entries1);
// (2) ['team1', 1.33]

const [entries4] = [...Object.entries(game.odds)];
console.log(entries4);
// (3) [Array(2), Array(2), Array(2)]

const [[enTries, x1]] = Object.entries(game.odds);
console.log(enTries, x1);
// team1 1.33

const [[...enTries5], [...x1]] = Object.entries(game.odds);
console.log(enTries5, x1);
// (2) ['team1', 1.33] (2) ['x', 3.25]

const [[...enTries6], [...x2]] = [...Object.entries(game.odds)];
console.log(enTries6, x2);
// (2) ['team1', 1.33] (2) ['x', 3.25]


// Using destructuring
// const [[day, { open, close }]] = entries;
// console.log(day);
// console.log(open);
// console.log(close);

// [property name, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close ${close}`);
}
 */

// 115 Coding Challenge #2
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// old ways
// const goals = game.scored;
// console.log(goals);
// let no = 0;
// for (const players of goals) {
//   no++;
//   console.log(`Goal ${no}: ${players}`);
// }

// using entries
// const [...entr] = game.scored.entries();
// console.log(entr);

// for (const x of game.scored.entries()) {
//   console.log(x);
// }
console.log('---#1---');
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// const [odds1] = [Object.values(game.odds)];
// console.log(odds1);

// const odds2 = Object.values(game.odds);
// console.log(odds2);

console.log('---#2---');
let average = 0;
for (const odds of Object.values(game.odds)) {
  // console.log(odds);
  average += odds;
}
average /= Object.values(game.odds).length;
console.log(average);

// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5

console.log('---#3---');
// const [[enTries, x1]] = Object.entries(game.odds);
// console.log(enTries, x1);
// team1 1.33

for (const [team, odds3] of Object.entries(game.odds)) {
  // console.log(team, odds3);

  // Displaying the Object in a Loop
  // The properties of an object can be collected in a loop:
  // console.log(team);
  // console.log(`${game[team]}`);

  // using tenary operator
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odds3}`);

  // console.log(`Odd of ${team}: ${odds3}`);
}
*/

// 116 Sets
/* 
//Sets is an data type similar to array, but olny have uniq values
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);
// Set(3) {'Pasta', 'Pizza', 'Risoto'}

console.log(new Set('Jonas'));
// Set(5) {'J', 'o', 'n', 'a', 's'}

// Return the number of element in a set
console.log(ordersSet.size);

// Returns true if a value exists in the Set
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('burger'));

// Adds a new element to the set
ordersSet.add('Garlic Bread');
console.log(ordersSet);

// Removes an element from a set
ordersSet.delete('Risotto');
console.log(ordersSet);

// looping the values of the set
// List all Elements
// let text = "";
// letters.forEach (function(value) {
//   text += value + "<br>";
// }) 

// first way
ordersSet.forEach(function (value) {
  console.log(value);
});

// second way
for (const order of ordersSet) {
  console.log(order);
}

// example
// create an array
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// creat a set from array
const stafUnique = new Set(staff);
console.log(stafUnique);
// convert set to array using spreed operator and destructuring technique
const stafArr = [...stafUnique];
console.log(stafArr);
 */

// 117 Maps
/* 
// Maps holds key-value pairs where the key can be any datatype
// create a maps
const fruits = new Map([
  ['apples', 500],
  ['bananas', 300],
  ['oranges', 200],
]);
console.log(fruits);

// Adds an element to a Maps
const rest = new Map();
// first way
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');
console.log(rest);
// second way
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open 😂')
  .set(false, 'We are closed 😢');
console.log(rest);

// Gets the value for a key in a maps
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(false));
console.log(rest.get(1));

const time = 21;
// time between 11 and 23, then the rest is open
console.log(time > rest.get('open'));
console.log(time < rest.get('close'));
// time before 11 and after 23, then the rest is close
console.log(time < rest.get('open'));
console.log(time > rest.get('close'));
// put it to logical expression (and operator))
const isItOpen = time > rest.get('open') && time < rest.get('close');
console.log(rest.get(isItOpen));
const isItClose = time < rest.get('open') && time > rest.get('close');
console.log(rest.get(isItClose));

// set a key of maps using array
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr));

// set a key of maps using DOM
const h1 = document.querySelector('h1');
rest.set(h1, 'Heading');
console.log(rest);
 */

// 118 Maps: Iteration
/* 
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// convert map to array
const [...arry] = question;
console.log(arry);

const arryCon = [...question];
console.log(arryCon);

// Looping through a key-value pairs of maps
// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answewr ${key}: ${value}`);
  }
}
// const answer = Number(prompt('What is your answer, 1, 2, 3?'));
// console.log(typeof answer);

// answer using tenarry operator
// console.log(
//   Number(`${question.get('correct')}`) === answer
//     ? `${question.get(true)}`
//     : `${question.get(false)}`
// );

// another answer
// console.log(question.get(question.get('correct') === answer));
 */

// 120 Coding Challenge #3
/* 
// Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

// GOOD LUCK 😀

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1. Create an array 'events' of the different game events that happened (no duplicates)
console.log(`---#1---`);
console.log(gameEvents);

// create a set of gameEvents.values
const gameEventsSet = new Set(gameEvents.values());
console.log(gameEventsSet);

// create a set of gameEvents.values and convert it to array
const events = [...new Set(gameEvents.values())];
console.log(events);

const [...eventArr] = new Set(gameEvents.values());
console.log(eventArr);

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
console.log(`---#2---`);
gameEvents.delete(64);
console.log(gameEvents);

// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL
console.log(`---#4---`);
const halfMinutes = 45;
for (const [minutes, event] of gameEvents) {
  // console.log(minutes, event);

  // console.log(
  //   minutes < halfMinutes
  //     ? `[FIRST HALF]  ${minutes}: ${event}`
  //     : `[SECOND HALF] ${minutes}: ${event}`
  // );

  const half = minutes < halfMinutes ? `FIRST` : `SECOND`;
  console.log(`[${half} HALF] ${minutes}: ${event}`);
}
 */

// 121 Working with string #!
/* 
const airLine = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]);
// A
console.log(plane[1]);
// 3
console.log(plane[2]);
// 2
console.log('B737'[0]);
// B
console.log(airLine.length);
// 16
console.log(plane.length);
// 4
console.log(airLine.indexOf('r'));
// 6
console.log(airLine.lastIndexOf('r'));
// 10
console.log(airLine.indexOf('Portugal'));
// 8

// slice() extracts up to but not including indexEnd.
console.log(airLine.slice(4));
// Air Portugal
console.log(airLine.slice(4, 7));
// Air
console.log(airLine.slice(0, airLine.indexOf(' ')));
// TAP
console.log(airLine.slice(airLine.lastIndexOf(' ') + 1));
// Portugal
console.log(airLine.slice(-2));
// al

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const seats = seat.slice(seat.lastIndexOf());
  console.log(
    seats === 'B' || seats === 'E'
      ? `You got the midlle seat 😬`
      : `You got LUCKY!! 🎉`
  );
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// when we run some metodh to the sting, JS will convert it to object
console.log(new String('Jonas'));
console.log(typeof new String('Jonas'));
console.log(typeof new String('jonas').slice(1));
 */

// 122 Working with string #2
/* 
const airLine = 'TAP Air Portugal';
console.log(airLine.toLowerCase());
console.log(airLine.toUpperCase());

// fix the name
const passenger = 'jOnAS';
const passengerLow = passenger.toLowerCase();
// jonas
const j = passengerLow[0].toUpperCase();
// J
const onas = passengerLow.slice(1);
// onas
const theName = j + onas;
console.log(theName);

// comparing emails
const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.io \n';
//  Hello@Jonas.io
// const lowerEmail = loginEmail.toLowerCase();
// //   hello@jonas.io
// const trimEmail = lowerEmail.trim();
// // hello@jonas.io
const normalizedEmail = loginEmail.toLowerCase().trim();
// hello@jonas.io
console.log(normalizedEmail === email);

// replacing
const priceGB = '288,97£';
// 288,97£
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);
// 288.97$
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

// replace() only change the very first word
console.log(announcement.replace('door', 'gate'));
// All passengers come to boarding gate 23. Boarding door 23!

// replace all using expression
console.log(announcement.replace(/door/g, 'gate'));
// All passengers come to boarding gate 23. Boarding gate 23!

// replaceAll()
console.log(announcement.replaceAll('door', 'gate'));
// All passengers come to boarding gate 23. Boarding gate 23!

// booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
// true
console.log(plane.includes('Boeing'));
// false
console.log(plane.includes('Air'));
// true
console.log(plane.includes('Airus'));
// false
if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW Airbus Family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some food and a pocket knife');
checkBaggage('Sock and camera');
checkBaggage('Got some snacks and a gun for protection');
 */

// 123 Working with string #3
/* 
// .split()
const str = 'a+very+nice+string';
console.log(str.split('+'));
// (4) ['a', 'very', 'nice', 'string']

const str1 = 'a very nice string';
console.log(str1.split(' '));
// (4) ['a', 'very', 'nice', 'string']

const name = 'Jonas Schmedtmann';
const [firstName, lastName] = name.split(' ');
console.log(firstName);
console.log(lastName);

// .join()
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);
// Mr. Jonas SCHMEDTMANN

// capitalize
const capitalizeName = function (name) {
  const names = name.split(' ');
  // console.log(names);
  const namesUpper = [];

  for (const n of names) {
    // console.log(n);
    // // jessica, ann, smith, davis
    // console.log(n[0].toUpperCase());
    // // J, A, S, D
    // console.log(n.slice(1));
    // // essica, nn, mith, avis

    // first way
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));

    // second way
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  // console.log(namesUpper);
  // (4) ['Jessica', 'Ann', 'Smith', 'Davis']
  // (2)[('Jonas', 'Schedtmann')]
  console.log(namesUpper.join(' '));
  // Jessica Ann Smith Davis
  // Jonas Schedtmann
};
capitalizeName('jessica ann smith davis');
capitalizeName('jonas schedtmann');
capitalizeName('alraka satria ramadhan');

// padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
// ++++++Go to gate 23!++++++++++
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));
// +++++++++++++++Jonas++++++++++

// masking
const maskCreditCard = function (number) {
  // convert number to string
  // first way
  // const str = new String(number);
  // console.log(str);
  // // String {'1234567890'}
  // second way
  const str1 = number + '';
  // console.log(str1);
  // // 1234567890

  const lastNum = str1.slice(-4);
  // console.log(lastNum);
  // // 7890, 2740, 7123

  const maskNumber = lastNum.padStart(str1.length, '*');
  console.log(maskNumber);
};

maskCreditCard(1234567890);
// // ******7890
maskCreditCard(12371982739182739);
// // *************2740
maskCreditCard('1237983719587123');
// // ************7123

// repeat
const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));
// // Bad weather... All Departures Delayed... Bad weather... All Departures Delayed... Bad weather... All Departures Delayed... Bad weather... All Departures Delayed... Bad weather... All Departures Delayed...

const planesInline = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};
planesInline(5);
// // There are 5 planes in line ✈✈✈✈✈
planesInline(3);
// // There are 3 planes in line ✈✈✈
planesInline(8);
// // There are 8 planes in line ✈✈✈✈✈✈✈✈
 */

// 124 Coding Challenge #4
/* 
// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

// The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

// THIS TEST DATA (pasted to textarea)
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// HINT 1: Remember which character defines a new line in the textarea 😉
// HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
// HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
// HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!
// Afterwards, test with your own test data!

// GOOD LUCK 😀


document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const text = document.querySelector('textarea').value;

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  const rowsEntries = [...rows.entries()];
  console.log(rows);
  console.log(rowsEntries);
  // console.log(entries);
  // (5) ['underscore_case', ' first_name', 'Some_Variable', '  calculate_AGE', 'delayed_departure']

  for (const [i, row] of rowsEntries) {
    const rowSplit = row.toLowerCase().trim().split('_');
    // console.log(rowSplit);
    // (2) ['underscore', 'case']

    const [first, second] = rowSplit;
    // console.log(first, second);
    // underscore case

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    // console.log(i);
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
 */
