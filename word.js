var inquirer = require("inquirer");

var currentWord;
var blankWord = [];
var wordCount = 0;
var gameWords = ["narcos", "stranger things", "bojack horseman"];
var lettersGuessed = [];
var alreadyGuessed = false;
var gameActive = true;
var status;
var guessesRemaining = 10;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


var guessPrompt = [{
  type: 'input',
  name: 'letter',
  message: "Guess a letter for the word above:"
}];


function populateLettersGuessed(someLetter){
  for(i = 0; i <= lettersGuessed.length; i++){
    if(someLetter === alphabet[i]){
      lettersGuessed[i] = someLetter;
    }
  }
};

function userGuess() {
  inquirer.prompt(guessPrompt).then(function (answers) {
    var letter = new Letter(answers.letter.toLowerCase());
    gameActive = true;
    letter.checkCurrent();
  });
}

function gameFlow(){
  if(wordCount < gameWords.length) {
    var newWord = new GuessWord(gameWords[wordCount]);
    //console.log(blankWord);
    userGuess();
  }
};


function displayWord(){
  for(var index = 0; index < currentWord.length; index++){
    //console.log(blankWord[index]);
  }
}

var GuessWord = function(word) {
  this.word = word;
  currentWord = word.split('');
  //console.log(currentWord);
  for (i = 0; i < currentWord.length; i++){
      blankWord.push('_ ');
  }
  for (i = 0; i < alphabet.length; i++){
    lettersGuessed.push("_");
  }
  console.log(blankWord);
  
};

console.log("Hangman - Guess what letters are contained within the blanks below! Hint: Binge Worthy!!!");
console.log("Spaces are also included!!!")
gameFlow();

var Letter = function(guessLetter) {
  this.guessLetter = guessLetter;
  
  this.checkCurrent = function(){
    if(this.guessLetter.length != 1){
      return status = 0;
    }
    for (i = 0; i < lettersGuessed.length; i++){
      if (this.guessLetter === lettersGuessed[i]){
        
        return status = 1;
      } 
    }
    for (i = 0; i < currentWord.length; i++){
      if (this.guessLetter === blankWord[i]){
        return status = 1;
      }
    }
    
    for (i = 0; i <= currentWord.length; i++){
      if (this.guessLetter === currentWord[i]){ 
        return status = 2;
      }
    }

    for (i = 0; i < alphabet.length; i++){
      if (this.guessLetter === alphabet[i]){
        populateLettersGuessed(this.guessLetter);
        return status = 3;
      };
    }
    
  };
  this.checkCurrent();

  switch (status) {
    case 0:
        console.log("Not a valid answer!!!");
        break;
    case 1:
        console.log("Letter Already Guessed");
        break;
    case 2:
        console.log("Correct");
        for(i = 0; i < currentWord.length; i++){
          if(this.guessLetter === currentWord[i]){
            blankWord[i] = this.guessLetter;
          }
        };
        populateLettersGuessed(this.guessLetter);
        break;
    case 3:
        console.log("Incorrect");
        guessesRemaining--;
        populateLettersGuessed(this.guessLetter);
        break;
}

  var letterStatus = this.checkCurrent();
  console.log("Letters Guessed: " + lettersGuessed.join("  "));
  console.log("Current GuessWord:  " + blankWord.join("  "));

  if (blankWord.join("  ") === currentWord.join("  ")){
    console.log("You've won!!!!!");
    guessesRemaining = 10;
    wordCount++;
    lettersGuessed = [];
    blankWord = [];
    console.log("Next Word:")
    gameFlow();
  };

  if (guessesRemaining === 0){
    console.log("You lose..... go home.")
    console.log ("Jk... give it another shot!!!")
    guessesRemaining = 10;
    lettersGuessed = [];
    blankWord = [];
    wordCount = 0;
    gameFlow();

  }

  //console.log ("Current Word is: " + currentWord);
  //console.log ("Blank Word is: " + blankWord);
  console.log("Remaining Guesses:  " + guessesRemaining);
  
  if(wordCount < gameWords.length) {
    console.log("\n------------------------------------------------------- \n------------------------------------------------------- \n")
    userGuess();

  } 
  else{
    console.log("That's all of the words in this game... at least for now!")
    console.log("As far as I'm concerened... You have become the Hangman World Champion")
    console.log("Congrats!!!!!!")
  }
};




