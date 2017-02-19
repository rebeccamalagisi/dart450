/*

Assignment 01 - Interactive Personality
Rebecca Malagisi

An interactive click based website with random elements in order to waste your time.
Every minute you will get an update starting how much time you've wasted.

*/



var counter = 0;
// Time interval for the timer
var interval = 1000;

// A global variable to store whether speech is ready to be used
var speechReady = false;

// The specific voice we want the computer to use
// See: http://responsivevoice.org/text-to-speech-languages/
var voice = 'UK English Male';

// The parameters for the voice in an object
var voiceParameters = {
  pitch: 0.9,
  rate: 1,
  volume: 1
}

var answers = [
  "Shouldn't you be doing something more productive with your time?",
  "Don't you have something more inportant to do?",
  "",
  "Shouldn't you be doing something more productive with your time?",
  "Shouldn't you be doing something more productive with your time?",
  "Shouldn't you be doing something more productive with your time?",
  "Shouldn't you be doing something more productive with your time?",
  "Shouldn't you be doing something more productive with your time?",

];



///////////////////////////////////////////////////////////////////////////
// DOCUMENT.READY

$(document).ready(function() {
  responsiveVoice.OnVoiceReady = speechIsReady;


  $("#one").click(function(){
    $(this).animate({
      'height': '0px',
      'width': '0px'
    }, 100);



  });





  setInterval(function () {


    // Set the text on the page to be the value of the counter
    $("#timer").text(counter);
      // Adds 1 to counter/timer every second
      counter++;

      // Pop up element to let you know when a minute has passed
      if (counter == 10) {
        sayOne("Congratulations, you just wasted a minute of your life.");
        
        console.log("speech is okay");



      }


  },interval);


});

///////////////////////////////////////////////////////////////////////////
// FUNCTIONS


function speechIsReady () {
  speechReady = true;
}


// when the
function sayOne (text) {
  if (speechReady) {
    responsiveVoice.speak(text,voice,voiceParameters);
  }
}

function sayTwo () {
  if (speechReady) {
    responsiveVoice.speak(getRandomString(answers),voice,voiceParameters);
  }
}


function getRandomString(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
