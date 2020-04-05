var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColour;
var sequenceNumber;
var level = 0;

// Compares player's chosen colour against game's random colour
function gameLogic() {
  if (userClickedPattern[sequenceNumber] ===
    gamePattern[sequenceNumber]) {
    playSound(userClickedPattern[sequenceNumber]);
    animatePress(userClickedPattern[sequenceNumber]);
    sequenceNumber++;
    if (sequenceNumber === gamePattern.length) {
      nextSequence();
    }
  } else {
    gameOver();
  }
}

//Ends the game and resets variables
function gameOver() {
  level = 0;
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  for (i = gamePattern.length; i >= 0; i--) {
    gamePattern.pop(i);
  }
  randomNumber = -1;
  $("h1").text("Gameover. Try again?");
  playSound("wrong");
}

//Animates chosen colour based on player's choice
function sequenceAnimation() {
  setTimeout(function() {
    $("#" + randomChosenColour).animate({
        opacity: 0.0
      }, 100)
      .animate({
        opacity: 1.0
      }, 100);
  }, 1000);
}

//Animates game's random choice of colour
function animatePress(currentColour) {
  $(".btn." + currentColour).addClass("pressed");
  setTimeout(function() {
    $(".btn." + currentColour).removeClass("pressed");
  }, 100);
}

//Removes all user elements from the array and sets variables for the next level
function nextSequence() {
  for (i = userClickedPattern.length; i >= 0; i--) {
    userClickedPattern.pop(i);
  }
  sequenceNumber = 0;
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  sequenceAnimation();
}

//Plays sound according to the chosen colour
function playSound(key) {

  switch (key) {

    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;

    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;

    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;

    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;

    case "wrong":
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
      break;
  }
}

//Button press to trigger the game to start
$(document).keydown(function() {
  if (typeof randomNumber === 'undefined' ||
    randomNumber === -1) {
    $("body").removeClass("game-over");
    sequenceNumber = 0;
    nextSequence();
  }
});

//Listens for a button click & determines whether level is complete
$(".btn").click(function() {
  // debugger;
  userClickedPattern.push(this.id);
  if (sequenceNumber < gamePattern.length) {
    gameLogic();
  } else {
    nextSequence();
  }

});
