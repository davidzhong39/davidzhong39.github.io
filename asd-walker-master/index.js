/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  var KEY = { // Variable for determining what key is pressed
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
  }

  // Game Item Objects

  var walker = {  // The object's name is "walker" and has position and speed values for the x and y axis
    xPosition: 0,
    yPosition: 0,
    xSpeed: 0,
    ySpeed: 0,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);       // If you press a key, the function handleKeyDown gets run (sets x and y speeds to 5 and -5)
  $(document).on('keyup', handleKeyUp);           // If you "unpress" a key, the function handleKeyUp gets run (sets x and y speeds to 0)

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() { // This core function runs three helper functions
    repositionGameItem()
    wallCollision()
    redrawGameItem()
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {   // Changes the speed of the walker based on what key is being pressed
    if(event.keyCode === 37){
      console.log("You have pressed left")
      walker.xSpeed = -5
    }
    if(event.keyCode === 39){
      console.log("You have pressed right")
      walker.xSpeed = 5
    }
    if(event.keyCode === 38){
      console.log("You have pressed up")
      walker.ySpeed = -5
    }
    if(event.keyCode === 40){
      console.log("You have pressed down")
      walker.ySpeed = 5
    }
  }
  
  function handleKeyUp(event){
    if(event.keyCode === 37){   // Resets the speeds of the walker to 0 once a key is unpressed
      walker.xSpeed = 0
    }
    if(event.keyCode === 39){
      walker.xSpeed = 0
    }
    if(event.keyCode === 38){
      walker.ySpeed = 0
    }
    if(event.keyCode === 40){
      walker.ySpeed = 0
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){    // The x and y positions of the walker are changed by the values of the x and y speed of the walker respectively (not yet drawn)
    walker.xPosition += walker.xSpeed
    walker.yPosition += walker.ySpeed
  }
  function redrawGameItem(){     // Drawing the actual changes made to the walker onto the screen
    $("#walker").css("left", walker.xPosition)
    $("#walker").css("top", walker.yPosition)
  }
  
  function wallCollision(){   // Detects collision of the walker and the four walls. This is done by *subtracting* the position of the walker by it's speed,
                              // which cancels out the effect of *adding* the speed to the walker in the handleKeyDown function 
                              // walker.xPosition + (walker.xSpeed - walker.xSpeed) = no net movement = the walker stays still despite a key being pressed
    if(walker.xPosition < 0){
      walker.xPosition -= walker.xSpeed
    }
    if(walker.xPosition > $("#board").width() - $("#walker").width()){
      walker.xPosition -= walker.xSpeed
    }
    if(walker.yPosition < 0){
      walker.yPosition -= walker.ySpeed
    }
    if(walker.yPosition > $("#board").height() - $("#walker").height()){
      walker.yPosition -= walker.ySpeed
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}