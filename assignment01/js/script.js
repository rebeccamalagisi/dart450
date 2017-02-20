/*

Assignment 01 - Interactive Personality
Rebecca Malagisi

An interactive click based website with random elements in order to waste your time.
Every minute you will get an update starting how much time you've wasted.

*/



var counter = 0;
// Time interval for the timer
var timeInterval = 1000;

// A global variable to store whether speech is ready to be used
var speechReady = false;
var voice = 'UK English Male';
var voiceParameters = {
  pitch: 0.9,
  rate: 1,
  volume: 1
}

// Answers for function sayTwo
var answers = [
  "Shouldn't you be doing something more productive with your time?",
  "Don't you have something more important to do?",
  "You're wasting time.",
  "Get back to work.",
  "Stop being lazy.",
  "Shouldn't you be doing something more productive with your time?",
  "Shouldn't you be doing something more productive with your time?",
  "Shouldn't you be doing something more productive with your time?",

];

const NUM_RANDOM_CIRCLES = 10;
const INTERVAL = 5000;



///////////////////////////////////////////////////////////////////////////
// DOCUMENT.READY

$(document).ready(function() {

  responsiveVoice.OnVoiceReady = speechIsReady;


  // TIME INTERVAL
  setInterval(function () {


    // Set the text on the page to be the value of the counter
    $("#timer").text(counter);
      // Adds 1 to counter/timer every second
      counter++;

      // Speech element to let you know when a minute has passed
      if (counter == 10) {
        sayOne("Congratulations, you just wasted a minute of your life.");
        console.log("speech is okay");

      }

      else if (counter > 10) {
        console.log("right on, pal");


      }
  },timeInterval);

  // CIRCLE INTERVAL
  setInterval(function () {
    for (var i = 0; i < NUM_RANDOM_CIRCLES; i++) {

      // Math.random() returns a random floating point number between 0 and 1
      // $(document).width() and $(document).height() return the width and
      // height of the current document respectively
      //
      // So if we multiply the width by a random number between 0 and 1 we
      // get a random position from the left to the right of the page
      var x = Math.random() * $(document).width();

      // And if we multiply the height by a random number between 0 and 1
      // we get a random position from the top to the bottom of the page
      var y = Math.random() * $(document).height();

      // And we can generate a rectangle at that position
      var c = generateCircle(x,y);

      // And then add it to the page
      $('body').append(c);

    }

  },INTERVAL);


  $("div").click(function(){
    $(this).animate({
      'height': '0px',
      'width': '0px'
    }, 100);



  });



});

///////////////////////////////////////////////////////////////////////////
// FUNCTIONS








// SPEECH FUNCTIONS

function speechIsReady () {
  speechReady = true;
}


// Function for the initial speech
function sayOne (text) {
  if (speechReady) {
    responsiveVoice.speak(text,voice,voiceParameters);
  }
}

// Function for other speech array
function sayTwo () {
  if (speechReady) {
    responsiveVoice.speak(getRandomString(answers),voice,voiceParameters);
  }
}


function getRandomString(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}





// SHAPE FUNCTIONS

function generateCircle(x, y) {

  var circleDiv = $('<div></div>');
  var randomRedValue = randomIntegerInRange(0,255);
  var randomBlueValue = randomIntegerInRange(0,255);
  var randomGreenValue = randomIntegerInRange(0,255);

  circleDiv.css({
    position: 'absolute',
    zIndex: '0',
    width: '120px',
    height: '120px', 
    top: y + 'px',
    left: x + 'px', 
    backgroundColor: 'rgba(' + randomRedValue + ',' + randomGreenValue + ',' + randomBlueValue + ',0.5)',
    borderRadius: '50%'

  });

  return circleDiv;

}

function randomIntegerInRange(min,max) {

  // This is just an equation essentially.
  //
  // Math.random() returns a number between 0 and 1
  // Math.floor() removes anything after the decimal point
  // (max - min) gives us the size of the possible range of values
  //
  // So a random amount of that range + min will give us a
  // random number between min and max (not including max)

  return Math.floor(Math.random() * (max - min)) + min;
}
