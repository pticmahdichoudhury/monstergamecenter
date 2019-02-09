let secretNumber = 0,
 numberOfGuesses = 0;

function writeMessage(elementId, message, appendMessage) {
 let elemToUpdate = document.getElementById(elementId);
 if (appendMessage) {
  elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
 }
 else {
  elemToUpdate.innerHTML = message;
 }
};

function newGame() {
 secretNumber = Math.floor(Math.random() * 500) + 1;
 numberOfGuesses = 0;
 writeMessage('historyList', '');
}

function guessInRange(guess) {
 return (guess > 0 && guess < 501);
}

function userGuessed() {
 let userGuessed = document.getElementById('userGuess').value;
 let statusArea = document.getElementById('statusArea');
 let historyList = document.getElementById('historyList');
 if (userGuessed.length == 0 || !guessInRange(userGuessed)) {
  // Nothing entered or our of range.
  writeMessage('statusArea', '<p>Please enter a number 1-500 and press the Guess button.</p>');
 }
 else if (userGuessed.indexOf('.') != -1) {
  writeMessage('statusArea', '<p>Please enter a whole number 1-500 and press the Guess button.</p>');
 }
 else {
  numberOfGuesses++;

  if (userGuessed == secretNumber) {
   // Got it
   writeMessage('statusArea', '<p>You got me in ' + numberOfGuesses + ' guesses, The correct number was ' + secretNumber + '. Let\'s play again! </p>');
   newGame();
  }
  else if (userGuessed < secretNumber) {
   // User needs to guess higher
   writeMessage('statusArea', '<p>You need to guess higher than ' + userGuessed + ', try again...</p>');
   writeMessage('historyList', '<li>' + userGuessed + ' (too low)</li>', true);
  }
  else {
   // User needs to guess lower
   writeMessage('statusArea', '<p>You need to guess lower than ' + userGuessed + ', try again...</p>');
   writeMessage('historyList', '<li>' + userGuessed + ' (too high)</li>', true);
  }
 }

 document.getElementById('userGuess').value = '';
}

window.onload = function() {
 newGame();
 document.getElementById('buttonArea').addEventListener('click', userGuessed);
};
let input = document.getElementById("userGuess");
input.addEventListener("keyup", function(event) {
 event.preventDefault();
 if (event.keyCode === 13) {
  document.getElementById("buttonArea").click();
 }
});
