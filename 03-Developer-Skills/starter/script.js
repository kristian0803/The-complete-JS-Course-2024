// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// const measureKelvin = function () {
//   const measurement = {
//     type: "temp",
//     unit: "celcius",
//     value: prompt("Degress celcius:"),
//   };
//   //   console.log(typeof measurement.value);
//   //   console.table(measurement);
//   //   console.log(measurement.value);
//   //   console.warn(measurement.value);
//   //   console.error(measurement.value);

//   const kelvin = Number(measurement.value) + 273;
//   return kelvin;
// };

// // A) IDENTIFY
// console.log(measureKelvin());

const person = { fname: "John", lname: "Doe", age: 25 };

let txt = "";
for (let x in person) {
  txt += person[x] + " ";
}

console.log(txt);
