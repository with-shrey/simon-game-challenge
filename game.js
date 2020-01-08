var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

var randomChosenColor;
var userChosenColor;
var currentLevel = [];

//check for key press to start game
$(document).keydown(function (event) {
    //keypress starts game unless already started as shown by variable started
    if (started == false) {
        //Changes h1 from Press "A Key to Start" to showing level number and progress
        $("h1" + "#level-title").text("Level " + level);
        //starts first round
        nextSequence();
        //toggle started variable to true so further key presses are ignored
        started = true;
    }
});

// What happens when button is clicked: 
//adds clicked color to user array, plays button sound, animates button and calls check answer function

$("." + "btn").click(function () {
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    applyPressed(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


///Functions//////////

//Check Answer function
function checkAnswer(currentLevel) {
    //compares user array to game array
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1" + "#level-title").text("Game Over, press any key to restart.");
        restart();
    }

}


// what happens each round of the game
function nextSequence() {
    // advances level count
    level++;
    // clears user array to start fresh
    userClickedPattern = []
    $("h1" + "#level-title").text("Level " + level);

    // generate randomNumber;
    var randomNumber = Math.floor(Math.random() * 4);
    // turn randomNumber into random color add color to game Pattern
    if (randomNumber === 0) {
        randomChosenColor = buttonColors[0];
        gamePattern.push(randomChosenColor);
    } else if (randomNumber === 1) {
        randomChosenColor = buttonColors[1];
        gamePattern.push(randomChosenColor);
    } else if (randomNumber === 2) {
        randomChosenColor = buttonColors[2];
        gamePattern.push(randomChosenColor);
    } else {
        randomChosenColor = buttonColors[3];
        gamePattern.push(randomChosenColor);
    }
    //animate button when chosen randomly
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //Play different sounds depending on color 
    playSound(randomChosenColor);

}


//Play sound when button is clicked or randomly selected
function playSound(name) {

    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
};

//Change button look when clicked on to css pressed
function applyPressed(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function restart() {
    started = false;
    level = 0;
    gamePattern = [];
}