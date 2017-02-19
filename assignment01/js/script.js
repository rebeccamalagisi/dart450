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
var voice = 'UK English Female';

// The parameters for the voice in an object
var voiceParameters = {
  pitch: 0.9,
  rate: 1,
  volume: 1
}


var answers = [
  "Wasting time",

];



///////////////////////////////////////////////////////////////////////////
// DOCUMENT.READY

$(document).ready(function() {


  $("#one").click(function(){
    $(this).animate({
      'height': '0px',
      'width': '0px'
    }, 100);



  });





  setInterval(function () {

    // Set the text on the page to be the value of the counter
    $("#timer").text(counter);

      counter++;

      // Pop up element to let you know when a minute has passed
      if (counter == 10) {
        // say(getRandomString(answers));
        $("#popup1").show();
        


      }


  },interval);

  // responsiveVoice.OnVoiceReady = speechIsReady;

});

///////////////////////////////////////////////////////////////////////////
// FUNCTIONS


function speechIsReady () {
  speechReady = true;
}


// when the
function say () {
  if (speechReady) {
    responsiveVoice.speak(getRandomString(answers),voice,voiceParameters);
  }
}


function getRandomString(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
