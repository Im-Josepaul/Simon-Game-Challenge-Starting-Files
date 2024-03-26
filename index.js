$(document).ready(function() {
    var buttonColors = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var started = false;
    var isGameOver = false
    var level = 0;

    // Start the game

    $(document).on('click', function(event) {
        if (isGameOver) {
            if ($(event.target).closest('.btn').length) {
                return;
            }
        }
        if (!started) {
            started = true;
            nextSequence();
            isGameOver = false
        }
    });


    $(document).keypress(function() {
        nextSequence();
        started = true;
    });

    // Check the user's input
    $(".btn").click(function() {
        if (!started) return;
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });


    // Play the sequence
    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);

        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        var sound = new Audio("sounds/" + randomChosenColor + ".mp3");
        sound.play();
    }

    // Play the sound for the given color
    function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    // Animate the button press
    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    // Check the user's answer
    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(nextSequence, 1000);
            }
        }
        else {
            gameOver();
        }
    }

    // Game over
    function gameOver() {
        level = 0
        gamePattern = []
        started = false;
        $("#level-title").text("Game Over, Press Anywhere to Restart");
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        isGameOver = true; 
    }
});
