gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];

let level = 0;

let started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("level" + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass();
        }, 200);

        $("#level-title").text("Game Over, Press Any key to Restart");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];

    level++;

    $("#level-title").text("level" + level);

    randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);

    let randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);

    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}