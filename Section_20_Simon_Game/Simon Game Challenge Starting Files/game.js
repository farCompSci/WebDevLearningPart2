
/**
 * Computes a random number bewteen 1 and 3
 *
 * @params - None
 * @return {number} Randomly generated number between 1 and 3.
 */
function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4); // Random number between 0 and 3
    return randomNumber;
}

/**
 * Plays one of the sounds depending on the name of the file
 * 
 * @param {string} name - name of the file, excluding the extenstion
 * @returns {None} - plays a sound
 */
function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

/**
 * Toggles the a style class that temporarily flashes grey on the selected button
 * 
 * @param {string} currentColor - id for button pressed
 * @return {None} - flashes the button, returns nothing
 */
function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(() => {
        $('#'+currentColor).removeClass('pressed');
    }, 100);
}


// Logging the random pattern 
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

// Getting the random number and adding it to the game pattern
let randomChosenColour = buttonColours[nextSequence()];
gamePattern.push(randomChosenColour);

// Making the selected button flash
$(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

// Logging Button Clicks and appending to list of buttons clicked by user
 $('.btn').on('click',(event)=>{
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
 })



