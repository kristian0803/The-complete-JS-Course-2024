// let js = "amazing";
// // if (js === "amazing") {
// //     alert("Javascripts is FUN!")
// // }

// // let sum = 40 + 8 + 23 - 10;
// // console.log(sum);

// // console.log("jonas");

// function myFunction() {
//   document.getElementById("test").innerHTML = "Paragraph changed.";
// }

// // let x = demoFunction(4, 3);
// // document.getElementById("demo").innerHTML = x;

// // function demoFunction(a, b) {
// //   return a * b;
// // }

// // Create and object:
// const car = {
//   brand: "Hyundai",
//   model: "Ionic 5",
//   color: "White",
//   // object methods
//   description: function () {
//     return (
//       this.brand +
//       " adalah sebuah perusahaan otomotif yang merupakan divisi dari Hyundai Motor Group dan merupakan produsen mobil terbesar di Korea Selatan. " +
//       this.model +
//       " is equipped with Hyundai Bluelink connectivity technology, a platform that makes it easy to check important information about your car. " +
//       this.color
//     );
//   },
// };

// // display data from object:
// document.getElementById("brand").innerHTML = "Brand : " + car.brand;
// document.getElementById("model").innerHTML = "Model : " + car.model;
// document.getElementById("color").innerHTML = "Color : " + car.color;
// document.getElementById("description").innerHTML = car.description();

// // function on/off
// function on_bulb() {
//   document.getElementById("bulb").src = "../bulb-on.png";
// }
// function off_bulb() {
//   document.getElementById("bulb").src = "../bulb-off.png";
// }

// // for loop
// const fruits = ["Banana", "Orange", "Apple", "Mango"];

// let text = "<ul>";
// fruits.forEach(myFunction);
// text += "</ul>";

// document.getElementById("demo").innerHTML = text;

// function myFunction(value) {
//   text += "<li>" + value + "</li>";
// }

const cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];

let text = "";
for (let i = 0; i < cars.length; i++) {
  text += cars[i] + "<br>";
}

document.getElementById("debug").innerHTML = text;
