//Get DOM elements
let colorSquares;
let difficultyLevel;
let header = document.querySelector("h1");
let colorClue = document.querySelector("#colorClue");
let headerText = document.getElementById("headerText");
let resetButton = document.getElementById("resetButton");
let messageDisplay = document.querySelector("#messageDisplay");
let squareContainer = document.getElementById("squareContainer");
let difficultyButtons = document.getElementsByName("difficultyButton");

//Initialize new game state

initializeGame();
setEventListeners();

//******************************************************/

//Function declarations
function initializeGame() {
  setDifficulty()
  generateSquares(difficultyLevel);
  setHeaderColors();
  setSquareColors();
  selectWinningColor();
  gameOver = false;
}

function setSquareColors() {
  for (let i = 0; i < colorSquares.length; i++) {
    colorSquares[i].style.backgroundColor = getRandomRGBColor();
    colorSquares[i].addEventListener("click", checkGuess);
  }
}

function selectWinningColor() {
  randomIndex = Math.floor(Math.random() * (colorSquares.length-1));
  winningColor = colorSquares[randomIndex].style.backgroundColor
  colorClue.textContent = winningColor;
}

function setHeaderColors() {
  let themeColor = getRandomRGBColor(); 
  header.style.backgroundColor = themeColor;
  headerText.style.color = themeColor;
  messageDisplay.textContent = "Try to guess which square is the color defined by the RGB value above!"
  resetButton.innerHTML = "New Colors <i class=\"fas fa-sync-alt\"></i>"
}

function checkGuess() {
  if (!gameOver) {
    if (this.style.backgroundColor === winningColor){
      executeGameOver();
    }
    else {
      executeWrongGuess(this);
    }
  }
}

function setSquareColorsToUniform(color) {
  header.style.backgroundColor = winningColor;
  headerText.style.color = header.style.backgroundColor;
  for (let i = 0; i < colorSquares.length; i++) {
    colorSquares[i].style.backgroundColor = color;
  }
}

function getRandomRGBColor() {
  let redValue = Math.floor(Math.random() * 255);
  let greenValue = Math.floor(Math.random() * 255);
  let blueValue = Math.floor(Math.random() * 255);
  let color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
  return color;
}

function executeGameOver() {
  messageDisplay.textContent = "Winner winner chicken dinner!";
  setSquareColorsToUniform(winningColor);
  resetButton.textContent = "Play Again?"
  gameOver = true;
  //todo
  //add in logic you put "Y-O-U W-I-N" in the squares after a game.
}

function executeWrongGuess(obj) {
  messageDisplay.textContent = "Try Again!!"
  obj.style.backgroundColor = document.body.style.backgroundColor;
}

function setDifficulty() {
  for (let i = 0; i < difficultyButtons.length; i++) {
    if (difficultyButtons[i].checked === true) {
      difficultyLevel = difficultyButtons[i].value;
    }
  }
}

function generateSquares(numSquares) {
  squareContainer.textContent = null;
  for (let i = 0; i < numSquares; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("square");
    squareContainer.appendChild(newDiv);
  }
  colorSquares = document.getElementsByClassName("square");
}

function setEventListeners() {
  for (let i = 0; i < colorSquares.length; i++) {
    colorSquares[i].addEventListener("click", checkGuess);
  }
  
  for (let i = 0; i < difficultyButtons.length; i++) {
    difficultyButtons[i].addEventListener("click", function(){
      difficultyLevel = this.value;
      initializeGame();
    });
  }

  resetButton.addEventListener("click", initializeGame);


}

//bugs fixed
//Bug: I noticed a performance issue after several clicks of the difficulty butons. Upon further inspection, I saw that the amount of listeners was being doubled every click. Going to research why that is happening, though I think I have a good guess.
//Problem: as suspected, setting the event listeners inside 'initializegame' was causing the listeners to be doubled everytime the buttons were clicked because they are being attached to each radio.
//Solution: pulled 'setEventListeners' out of 'initializeGame'. I thought this was the simplest trade off vs making another function for 'resetGame' since at this time I do not see alot of other potential coupling that could cause trouble.

//Trade-offs
//Chose to go with dynamic difficulty generation, in case I want to add further difficulty levels later down the road.