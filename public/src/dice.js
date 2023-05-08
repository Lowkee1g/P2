// Define the dice images
const diceImages = [
  "/../images/1eye.png", // dice face 1
  "/../images/2eye.png", // dice face 2
  "/../images/3eye.png", // dice face 3
  "/../images/4eye.png", // dice face 4
  "/../images/5eye.png", // dice face 5
  "/../images/6eye.png", // dice face 6
];

const dice1Img = document.querySelector("#dice1");
const dice2Img = document.querySelector("#dice2");
const rollButton = document.querySelector("#roll-button");


function updateDiceimages(roll1,roll2) {
  // Update the dice images
  dice1Img.src = diceImages[roll1 - 1];
  dice2Img.src = diceImages[roll2 - 1];
  console.log(roll1, roll2);
}

function diceRoll() {
  return Math.floor(Math.random() * 6 + 1);
 }

function throwDice() {
  const roll1 = diceRoll();
  const roll2 = diceRoll();
  updateDiceimages(roll1,roll2)
  a += roll1 + roll2;

  if (roll1 === roll2 && p1check < 3) {
      p1check += 1;
      return;
  } else if (roll1 === roll2 && p1check === 2) {
      moveToJail();
      a = 10;
      jailp1 = 1;
      p1check = 0;
      return;
  } else if (roll1 != roll2) {
      p1check = 0;
      return;
  }
}

rollButton.addEventListener('click', () => {
  if (jailp1 === 1) {
      prisonEscape();
      return;
  }
  if (jailp1 === 0) {
      throwDice();
      if (a % 40 === 30) {
          moveToJail();
          jailp1 = 1;
          return;
      } else {
          movePlayerSocket(playerId,a);
          if (a % 40 == 7 || a % 40 == 22 || a % 40 == 36) {
              document.querySelector('.chance-card').style.display = 'block';
              getQuote();
          }
          return;
      }
  }

});