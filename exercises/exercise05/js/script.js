/*

Whenever you click the button, a 'random' speech selection is said in response

*/




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
  "Sounds lame.",
  "Boring.",
  "I don't care.",
  "Get a better hobby.",
  "What a waste of time.",
  "Loser.",
  "That's stupid.",
  "Trash.",
  "You think that's fun?",
  "How pathetic."
];




$(document).ready(function() {
  // We can set .OnVoiceReady on the responsiveVoice library object
  // with a function to call when the speech functionality for the
  // page is ready...
  responsiveVoice.OnVoiceReady = speechIsReady;


  $("button").click(function () {
    // say() is a function defined below
    // when the button is clicked, a random string in the array is spoken
    say(getRandomString(answers));
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
