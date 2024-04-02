'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

// create a random number from 1 to 20
let randNumber = Math.trunc(Math.random() * 20) + 1;

// store score value
let score = 20;

// store highscore value
let highScore = 0;

// display message
const dMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Adds event when the check button is clicked
document.querySelector('.check').addEventListener(
  'click',

  function () {
    //  mengambil number inputan
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess);
    console.log(guess, typeof guess);

    //   when there is no input
    if (!guess) {
      dMessage('⛔ No Number!');

      // when player wins
    } else if (guess === randNumber) {
      dMessage('🎉 Correct Number!');
      document.querySelector('.number').textContent = randNumber;

      // change style.css
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
      }

      // when the input's wrong
    } else if (guess !== randNumber) {
      dMessage(guess > randNumber ? '📈 Too High!' : '📉 Too Low!');
      if (score > 1) {
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        dMessage('💥 You lost the game!');
        document.querySelector('.score').textContent = Number(0);
      }
    }

    // else if (guess > randNumber) {
    //   document.querySelector('.message').textContent = '📈 Too High!';
    //   if (score > 1) {
    //     score--;
    //     document.querySelector('.score').textContent = score;
    //   } else {
    //     document.querySelector('.message').textContent =
    //       '💥 You lost the game!';
    //     document.querySelector('.score').textContent = Number(0);
    //   }

    //   // when the input's wrong
    // } else if (guess < randNumber) {
    //   document.querySelector('.message').textContent = '📉 Too Low!';
    //   if (score > 1) {
    //     score--;
    //     document.querySelector('.score').textContent = score;
    //   } else {
    //     document.querySelector('.message').textContent =
    //       '💥 You lost the game!';
    //     document.querySelector('.score').textContent = Number(0);
    //   }
    // }
  }
);

// Event for again button (reset game)
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  randNumber = Math.trunc(Math.random() * 20) + 1;

  dMessage('Start guessing...');
  document.querySelector('.score').textContent = '20';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  console.clear();
});
