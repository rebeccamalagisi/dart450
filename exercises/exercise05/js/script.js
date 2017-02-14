/*

Whenever you click the button, a 'random' speech selection is said in response



*/







// A global variable to store whether speech is ready to be used
var speechReady = false;

// The specific voice we want the computer to use
// See: http://responsivevoice.org/text-to-speech-languages/
var voice = 'US English Female';

// The parameters for the voice in an object
var voiceParameters = {
  pitch: 0.9,
  rate: 1,
  volume: 1
}

var speechOne = "Sounds lame.";

var speechTwo = "Boring.";

var speechThree = "I don't care.";

var speechFour = "You need a better hobby.";

var speechFive = "What a waste of time.";


$(document).ready(function() {
  // We can set .OnVoiceReady on the responsiveVoice library object
  // with a function to call when the speech functionality for the
  // page is ready...
  responsiveVoice.OnVoiceReady = speechIsReady;

  // We can have speech happen in reaction to different page
  // events like clicks and keypresses, to make things more dynamic...
  $("button").click(function () {
    // say() is a function defined below
    say("Sounds lame.");
  });

});

// speechIsReady()
//
// Rather than DO anything when speech is ready, we set a variable
// to REMEMBER that speech is ready. Then we can check that variable
// before trying to use speech functions...
function speechIsReady () {
  speechReady = true;
}

// say(text)
//
// Checks if speech is available and if it is, speaks the text given
// with the parameters determined at the top of the script.
function say (text) {
  if (speechReady) {
    responsiveVoice.speak(text,voice,voiceParameters);
  }
}


function randomIntegerInRange(min,max) {

  return Math.floor(Math.random() * (max - min)) + min;

}
