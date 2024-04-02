'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const errorHtml = document.querySelector('.error');
const curLocation = document.querySelector('.location');

///////////////////////////////////////

// 📍 ---  249. Our first AJAX Call: XMLHttpRequest --- 📍
/* 
// 2. put into a function
const getCountryData = function (country) {
  // 1. make a http request
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // convert JSON strings into JS Object [{object}]
    // const data = JSON.parse(request.responseText);
    // destructuring data : {object}
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    // console.log(data.flags.svg);
    // // 💻 https://flagcdn.com/id.svg
    // console.log(data.altSpellings[2]);
    // // 💻 Republik Indonesia
    // console.log(data.name.common);
    // // 💻 Indonesia
    // console.log(Object.values(data.languages)[0]);
    // // 💻 Indonesian
    // console.log(Object.values(data.currencies)[0].name);
    // // 💻 Indonesian rupiah

    const html = ` <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

    // insert html
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('indonesia');
getCountryData('portugal');
getCountryData('usa');
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  251. Welcome to Callback Hell --- 📍
/* 
const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

  // insert html
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // Ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // convert JSON strings into JS Object [{object}]
    // const data = JSON.parse(request.responseText);
    // destructuring data : {object}
    const [data] = JSON.parse(request.responseText);
    console.log('data 1 :', data);

    // render country 1
    renderCountry(data);

    // Use optional chaining to account for countries with no borders property:
    // const neighbour = data.borders?.[0];
    // instead of :
    // const [neighbour] = data.borders;

    console.log(data.borders);
    // 💻 (3) ['TLS', 'MYS', 'PNG']

    // // Get  neighbour country (2)
    // const neighbour = data.borders?.[0];

    // // Ajax call country 2 (by code name of country: (e.g 'IND', 'TLS', 'MYS', 'PNG'))
    // const request2 = new XMLHttpRequest();
    // request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    // request2.send();

    // request2.addEventListener('load', function () {
    //   const [data2] = JSON.parse(request2.responseText);
    //   console.log('data 2 :', data2);

    //   renderCountry(data2, 'neighbour');
    // });

    // try using loop
    // Get  neighbour country (2)
    const neighbour = data.borders;

    neighbour.forEach(dataValue => {
      // Ajax call country 2 (by code name of country: (e.g 'IND', 'TLS', 'MYS', 'PNG'))
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${dataValue}`);
      request2.send();

      request2.addEventListener('load', function () {
        const [data2] = JSON.parse(request2.responseText);
        // console.log('data 2 :', data2);

        renderCountry(data2, 'neighbour');
      });
    });
  });
};

getCountryAndNeighbour('germany');

// Callback hell function eg.
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//         setTimeout(() => {
//           console.log('5 seconds passed');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  252-253. Promises and Fetch API --- 📍
/* 
const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

  // insert html
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
// const request = fetch(`https://restcountries.com/v3.1/name/name`);
// console.log('request :', request);
// // 💻 Promise {<pending>}
// // 💻 [[PromiseResult]]: Response

// consuming promises
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log('respon: ', response);

      // console.log('response.json() :', response.json());
      // 💻 Promise {<pending>}
      // 💻 [[PromiseResult]]: Array(1)

      return response.json();
    })
    .then(function ([data]) {
      console.log('data :', data);
      // 💻 {name: {…}, tld: Array(1), cca2: 'ID', ccn3: '360', cca3: 'IDN', …}

      // render country 1
      renderCountry(data);

      // render neighbour country 2
      const neighbour = data.borders[0];
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);

      // use callback hell to get all neighbour country
      // neighbour?.forEach(dataValue => {
      //   fetch(`https://restcountries.com/v3.1/alpha/${dataValue}`)
      //     .then(response2 => response2.json())
      //     .then(([data2]) => renderCountry(data2, 'neighbour'));
      // });
    })
    .then(response2 => response2.json())
    .then(([data2]) => renderCountry(data2, 'neighbour'));
};

getCountryData('germany');
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  255. Handling rejected promises --- 📍
/* 
const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

  // insert html

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

// catching error function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// consuming promises
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log('respon: ', response);

      // console.log('response.json() :', response.json());
      // 💻 Promise {<pending>}
      // 💻 [[PromiseResult]]: Array(1)

      return response.json();
    })
    .then(function ([data]) {
      console.log('data :', data);
      // 💻 {name: {…}, tld: Array(1), cca2: 'ID', ccn3: '360', cca3: 'IDN', …}

      // render country 1
      renderCountry(data);

      // render neighbour country 2
      const neighbour = data.borders[0];
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);

      // use callback hell to get all neighbour country
      // neighbour?.forEach(dataValue => {
      //   fetch(`https://restcountries.com/v3.1/alpha/${dataValue}`)
      //     .then(response2 => response2.json())
      //     .then(([data2]) => renderCountry(data2, 'neighbour'));
      // });
    })
    .then(response2 => response2.json())
    .then(([data2]) => renderCountry(data2, 'neighbour'))
    // error handling (catching error)
    .catch(function (err) {
      console.error(`${err}💥💥💥`);
      return renderError(
        `Something went wrong 💥💥💥 ${err.message}. Try again!`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('germany');
});
// getCountryData('germay');
// getCountryData('asd');
// getCountryData('asdasd');
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  256. Throwing Errors manually --- 📍
/* 
const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

  // insert html

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

// catching error function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(function (response) {
    console.log('respon: ', response);
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }
    return response.json();
  });
};

// consuming promises
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(function ([data]) {
      console.log('data :', data);
      // 💻 {name: {…}, tld: Array(1), cca2: 'ID', ccn3: '360', cca3: 'IDN', …}

      // render country 1
      renderCountry(data);

      // render neighbour country 2
      const neighbour = data.borders?.[0];
      console.log(neighbour);

      if (!neighbour) throw new Error('No neighbour found!');

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(([data2]) => renderCountry(data2, 'neighbour'))
    // error handling (catching error)
    .catch(function (err) {
      console.error(`${err}💥💥💥`);
      return renderError(
        `Something went wrong 💥💥💥 ${err.message}. Try again!`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  // getCountryData('germany');
  getCountryData('australia');
});
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 --- 257. Coding Challenge #1 --- 📍
/* 
// In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

// Here are your tasks:

// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
// The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

// GOOD LUCK 😀

const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

  // insert html

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// catching error function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// #1 Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng)
const whereAmI = function (lat, long) {
  // #2 Use the fetch API and promises to get the data.
  fetch(`https://geocode.xyz/${lat},${long}?json=1`)
    .then(response => {
      console.log(response);
      // #4 error handling
      if (!response.ok) {
        throw new Error(`Problem with geocoding ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // console.log('data', data);
      // #3 Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
      const dataJSON = JSON.stringify(data);
      console.log(dataJSON);
      console.log(`You are in ${data.city}, ${data.country}`);

      // #7 Render the country and catch any errors
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response2 => {
      if (!response2.ok) {
        throw new Error(`Country not found (${response2.status})`);
      }
      return response2.json();
    })
    .then(([data2]) => {
      const dataJSON = JSON.stringify(data2);
      console.log(dataJSON);

      return renderCountry(data2);
    })
    // #4 Chain a .catch method to the end of the promise chain and log errors to the console

    .catch(err => console.error(`${err.message} 💥💥💥`));
};

whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  259. The event loop in practice --- 📍
/* 
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  260. Building a simple promise --- 📍
/* 
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('foo');
//   }, 300);
// });

// promise1.then(value => {
//   console.log(value);
//   // Expected output: "foo"
// });

// console.log(promise1);
// Expected output: [object Promise]

const lottteryPromise = new Promise((resolve, reject) => {
  console.log('Lotter draw is happening 🎰');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});
// console.log(lottteryPromise);

lottteryPromise
  .then(response => console.log(response))
  // .catch(err => console.log(`${err.message}`));
  // 💻 You lost your money 💩
  // .catch(err => console.log(`${err}`));
  // 💻 Error: You lost your money 💩
  // .catch(err => console.error(`${err}`));
  // 💻 ❌ Error: You lost your money 💩
  .catch(err => console.error(`${err.message}`));
// 💻 ❌ You lost your money 💩

// Promisifying setTimeout
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(2);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(3);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(4);
  })
  .then(() => {
    console.log('4 second passed');
    return wait(5);
  })
  .then(() => {
    console.log('5 second passed');
  });

// Callback hell function eg.
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//         setTimeout(() => {
//           console.log('5 seconds passed');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  261. Promisifying the Geolocation API --- 📍
/* 
const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

  // insert html

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// catching error function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// handle resolve
getPosition().then(pos => {
  console.log(pos);
});

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: long } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${long}?json=1`);
    })
    .then(response => {
      console.log(response);
      // #4 error handling
      if (!response.ok) {
        throw new Error(`Problem with geocoding ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // console.log('data', data);
      // #3 Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
      const dataJSON = JSON.stringify(data);
      console.log(dataJSON);
      console.log(`You are in ${data.city}, ${data.country}`);

      // #7 Render the country and catch any errors
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response2 => {
      if (!response2.ok) {
        throw new Error(`Country not found (${response2.status})`);
      }
      return response2.json();
    })
    .then(([data2]) => {
      const dataObj = JSON.stringify(data2);
      console.log(dataObj);

      return renderCountry(data2);
    })
    // #4 Chain a .catch method to the end of the promise chain and log errors to the console

    .catch(err => console.error(`${err.message} 💥💥💥`));
};

btn.addEventListener('click', whereAmI);
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 --- 262. Coding Challenge #2 --- 📍
/* 
//
// Build the image loading functionality that I just showed you on the screen.

// Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

// If this part is too tricky for you, just watch the first part of the solution.

// PART 2
// 2. Comsume the promise using .then and also add an error handler;
// 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
// 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
// 5. After the second image has loaded, pause execution for 2 seconds again;
// 6. After the 2 seconds have passed, hide the current image.

// TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

// GOOD LUCK 😀
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  263. Consuming Promise with Async/Await --- 📍
/* 
const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

  // insert html

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: long } = pos.coords;

  // Reverse geocoding
  const resGeo = await fetch(`https://geocode.xyz/${lat},${long}?json=1`);
  console.log(resGeo);
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  // Country data
  // old way: fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.country}`
  );
  console.log(res);
  // 💻 Response {type: 'cors', url: 'https://restcountries.com/v3.1/name/indonesia', redirected: false, status: 200, ok: true, …}

  const [data] = await res.json();
  console.log(data);
  // [{…}] /json/indonesia.json

  renderCountry(data);
};

whereAmI();
console.log('FIRST');
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  264. Error Handling with try...catch --- 📍
/* 
const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

  // insert html

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// catching error function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: long } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${long}?json=1`);

    if (!resGeo.ok) {
      throw new Error(
        `Problem getting location data ${resGeo.status} (${resGeo.statusText})`
      );
    }

    console.log(resGeo);
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    // old way: fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    console.log(res);
    // 💻 Response {type: 'cors', url: 'https://restcountries.com/v3.1/name/indonesia', redirected: false, status: 200, ok: true, …}

    if (!res.ok) {
      throw new Error(
        `Problem getting country data ${res.status} (${res.statusText})`
      );
    }

    const [data] = await res.json();
    console.log(data);
    // [{…}] /json/indonesia.json

    renderCountry(data);
  } catch (err) {
    console.error(`${err}`);
    renderError(`💥 ${err.message}`);
  }
};

whereAmI();
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  265. Returning Values from Async Fucntions --- 📍
/* 
const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

  // insert html

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// catching error function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: long } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${long}?json=1`);

    if (!resGeo.ok) {
      throw new Error(
        `Problem getting location data ${resGeo.status} (${resGeo.statusText})`
      );
    }

    console.log(resGeo);
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    // old way: fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    console.log(res);
    // 💻 Response {type: 'cors', url: 'https://restcountries.com/v3.1/name/indonesia', redirected: false, status: 200, ok: true, …}

    if (!res.ok) {
      throw new Error(
        `Problem getting country data ${res.status} (${res.statusText})`
      );
    }

    const [data] = await res.json();
    console.log(data);
    // [{…}] /json/indonesia.json

    renderCountry(data);

    // this function will return a promise
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}`);
    renderError(`💥 ${err.message}`);

    // throw error for promise (line 977)
    // Reject promise returned from async fucntion
    throw err;
  }
};

// ❌ returning the wrong way
// const city = whereAmI();
// console.log(city);

// ✅
// whereAmI()
//   .then(city => console.log(city))
//   // 💻 You are in Kabupaten Karawang, Indonesia
//   .catch(err => console.error(`${err.message}`))
//   // 💻 Problem getting country data 404 (Not Found)
//   .finally(() => console.log('Finished getting location'));
// // 💻 Finished getting location

// ✅✅ using IIFE (Immediately Invoked Function Expression)
(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.error(`${err.message}`);
  }
  // finnaly() method
  console.log('Finished getting location');
})();
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  266. Running Promises in Parallel --- 📍
/* 
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log(data1);
    // console.log([data1.capital, data2.capital, data3.capital].flat());

    // using Promise.all() to takes an iterable of promises as input and returns a single Promise.
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    const allData = data.map(d => {
      return d[0].capital;
    });
    return console.log(allData.flat(2));
  } catch (error) {
    console.error(error);
  }
};

get3Countries('indonesia', 'russia', 'palestine');
 */
// ♨_♨ --- END SECTION --- ♨_♨

// 📍 ---  Where am I? function and getting all neihgbour country --- 📍
/* 
const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}.M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
        </div>
      </article>`;

  // insert html

  errorHtml.innerHTML = '';
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// catching error function
const renderError = function (msg) {
  const html = `<h2>${msg}</h2>`;
  errorHtml.innerHTML = '';
  errorHtml.insertAdjacentHTML('beforeend', html);
  errorHtml.style.opacity = 1;
};

const renderLocation = function (msgLoc) {
  const html = `<h2>${msgLoc}</h2>`;
  curLocation.insertAdjacentHTML('beforeend', html);
  curLocation.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// 📌 Where am I ()
const whereAmI = async function () {
  try {
    // 📌 Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: long } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${long}?json=1`);

    if (!resGeo.ok) {
      throw new Error(
        `Problem getting location data ${resGeo.status} (${resGeo.statusText})`
      );
    }

    console.log(resGeo);
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // 📌 Country data
    // old way: fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    console.log(res);
    // 💻 Response {type: 'cors', url: 'https://restcountries.com/v3.1/name/indonesia', redirected: false, status: 200, ok: true, …}

    if (!res.ok) {
      throw new Error(
        `Problem getting country data ${res.status} (${res.statusText})`
      );
    }

    const [data] = await res.json();
    console.log(data);
    // [{…}] /json/indonesia.json

    renderCountry(data);

    // 📌 neighbour country
    const neighbour = data.borders;
    console.log(neighbour);
    for (const codeNeighbour of neighbour) {
      const dataNeighbour = await fetch(
        `https://restcountries.com/v3.1/alpha/${codeNeighbour}`
      );
      if (!dataNeighbour.ok) {
        throw new Error(
          `Problem getting neighbour country ${dataNeighbour.status} (${dataNeighbour.statusText})`
        );
      }
      const [allData] = await dataNeighbour.json();
      console.log(allData);
      renderCountry(allData, 'neighbour');
    }

    // this function will return a promise
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}`);
    renderError(`💥 ${err.message}`);

    // throw error for promise (line 977)
    // Reject promise returned from async fucntion
    throw err;
  }
};

btn.addEventListener('click', function () {
  // ✅✅ using IIFE (Immediately Invoked Function Expression)
  (async function () {
    try {
      const city = await whereAmI();
      console.log(city);
      renderLocation(city);
    } catch (err) {
      console.error(`${err.message}`);
    }
    // finnaly() method
    console.log('Finished getting location');
  })();
});
 */
// ♨_♨ --- END SECTION --- ♨_♨

// ⛔ ---  267. Other Promise Combinatiors: race, allSettled and any --- ⛔
/* 
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// 📍 1) Promise.race()
// The Promise.race() static method takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles.

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);

  console.log(res[0].name.common);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/indonesia`),
  // timeout(0.05),
  // 💻 Error: Request took too long!

  timeout(0.1),
  // reslove
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// 📍 2) Promise.allSettles()
// The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise.
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// 📍 3) Promise.all()
// The Promise.all() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERRORrr'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// 📍 4) Promise.any()
//The Promise.any() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when any of the input's promises fulfills, with this first fulfillment value. It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.
Promise.any([
  Promise.reject('ERRORrr'),
  Promise.resolve('Another success'),
  Promise.resolve('Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
 */
// ♨_♨ --- END SECTION --- ♨_♨
