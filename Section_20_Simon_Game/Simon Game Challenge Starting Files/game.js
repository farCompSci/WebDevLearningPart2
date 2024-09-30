let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

/**
 * Computes a random number between 0 and 3
 *
 * @return {number} Randomly generated number between 0 and 3.
 */
function nextSequence() {
    userClickedPattern = [];  // Reset user input for the new level
    level++;
    $('#level-title').text('Level: ' + level);

    let randomNumber = Math.floor(Math.random() * 4); // Random number between 0 and 3
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flash the chosen button and play sound
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    return randomChosenColour;
}

/**
 * Plays one of the sounds depending on the name of the file
 *
 * @param {string} name - name of the file, excluding the extension
 */
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

/**
 * Toggles the style class that temporarily flashes grey on the selected button
 *
 * @param {string} currentColor - id for button pressed
 */
function animatePress(currentColor) {
    $("#" + currentColor).addClass('pressed');
    setTimeout(() => {
        $("#" + currentColor).removeClass('pressed');
    }, 100);
}

/**
 * Checks whether the user correctly remembers the game pattern
 *
 * @param {number} currentLevel - The current game level
 */
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        return true;
    } else {
        // Flash red on game over
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        // Play the wrong sound
        playSound("wrong");

        // Update the title
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Reset the game
        startOver();
        return false;
    }
}

/**
 * Starts or restarts the game
 */
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
    $("#level-title").text("Press A Key to Start");
}

/**
 * Starts the game when a key is pressed
 */
$(document).keypress(function () {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

/**
 * Logs button clicks and appends to the list of buttons clicked by the user
 */
$(".btn").on("click", function (event) {
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});
