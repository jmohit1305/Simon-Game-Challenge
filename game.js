var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$(document).keydown(function(){
  if(!start){
  $("#level-title").text("Level " + level);
  nextSequence();
  start=true;
}
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    animateWrong();
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    start = false;
    gamePattern=[];
    $("h1").text("Game Over, Press Any Key to Restart...");
    level = 0;
  }
}

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var sequenceRandom = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[sequenceRandom];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}

function animateWrong(){
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},200);
}
