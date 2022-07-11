const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColour);
  animatePress(userChosenColour);

});

$(document).keydown(function() {
  if (!gameStarted) {
    $("#level-title").text("Level 0");
    nextSequence();
    gameStarted = true;
  }
});


function nextSequence() {

  userClickedPattern = [];
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  for (let i in gamePattern) {

    setTimeout(function() {
      $("#" + gamePattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
    }, i * 400);


  }


  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
  }


}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
