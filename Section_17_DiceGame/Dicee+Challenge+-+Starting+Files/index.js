// Helper Function
function setImage(imgClass, imgFileName){
    /**
     * Sets the dice images onto the screen
     * Args: 
     *  imgClass:string 
     *      The class on the HTML element class
     *  imgFileName:string
     *      The relative path of the image to be displayed
     * 
     * Returns:
     *  Nothing, but applies modification via DOM Manipulation
     */
    document.querySelector(`${imgClass}`).setAttribute('src',`${imgFileName}`)
}

// Select the dice numbers
let player1 = Math.round(Math.random()*5+1);
let player2 = Math.round(Math.random()*5+1);

// Setting the images
setImage(imgClass=".img1",imgFileName=`images/dice${player1}.png`);
setImage(imgClass=".img2",imgFileName=`images/dice${player2}.png`);

// Display the Result
if (player1 > player2){
    document.querySelector('.container h1').textContent="Player 1 Wins";
}
else if (player2 > player1){
    document.querySelector('.container h1').textContent="Player 2 Wins";
}
else{
    document.querySelector('.container h1').textContent="It is a Draw";
}
