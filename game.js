var gamePattern=[];

var userClickedPattern =[];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

function animatePress(currentColor){
    $('#'+ currentColor).addClass('pressed');
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$('.btn').click(function(){
    level++;
    $("#level-title").text("Level " + level);

    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    // Ensure that the play() method is called in response to a user action
    document.addEventListener("click", function enableAudio() {
        audio.play();
        document.removeEventListener("click", enableAudio);
    });
}

// $(document).ready(function() {
//     nextSequence();
// });
//restart
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}