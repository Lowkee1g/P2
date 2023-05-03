// Define the dice images
const diceImages = [
    "/../images/1eye.png", // dice face 1
    "/../images/2eye.png", // dice face 2
    "/../images/3eye.png", // dice face 3
    "/../images/4eye.png", // dice face 4
    "/../images/5eye.png", // dice face 5
    "/../images/6eye.png", // dice face 6
  ];
  
  // Get references to the dice images and the roll button
  const dice1Img = document.querySelector("#dice1");
  const dice2Img = document.querySelector("#dice2");
  const rollButton = document.querySelector("#roll-button");
  // Function to roll the dice and update the images
  function rollDice() {
    // Generate two random numbers between 1 and 6
    const roll1 = Math.floor(Math.random() * 6 + 1);
    const roll2 = Math.floor(Math.random() * 6 + 1);
  }

  function diceRoll() {
   return Math.floor(Math.random() * 6 + 1);
  }

  function updateDiceimages() {
    // Update the dice images
    const roll1 = diceRoll();
    const roll2 = diceRoll();
    dice1Img.src = diceImages[roll1 - 1];
    dice2Img.src = diceImages[roll2 - 1];
    console.log(roll1, roll2);
  }
  
  rollButton.addEventListener('click', () => {
    updateDiceimages();
    
});
  