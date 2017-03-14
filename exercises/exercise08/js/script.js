/*

Sound Blasting 01

Animating the letters of some text according to the microphone volume.

*/


// How often to check the current volume
const CHECK_INTERVAL = 1;

// An audiocontext is used to work with audio
var audioContext;

// We will create an audio meter and put it in here
var meter;

// A place to store the output stream of the microphone
var microphone;

var colors = [
  "red","blue","green","yellow","pink","purple"
  // "#0061ff","#ff0083","#ffc700","#8300ff"
];



$(document).ready(function() {

  // Spit the content up into individual characters with blast.js
  $('#title').blast({
    delimiter: 'character'
  });

  // AUDIO SETUP

  // Do the getUserMedia stuff
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

  if (navigator.getUserMedia) {     
    // Note that this time we use {audio: true} to get the microphone,
    // otherwise it's the same as getting video.
    navigator.getUserMedia({audio: true}, handleAudio, audioError);
  }

  // We're going to repeatedly check the current audio volume
  // in order to update the animation of our letters
  setInterval(update,CHECK_INTERVAL);


});








// handleAudio (stream)
//
// Called when we have access to the microphone's audio stream
function handleAudio (stream) {
  // Create our AudioContext for working with audio...
  audioContext = new AudioContext();

  // Store the audio stream from the microphone in our microphone variable
  microphone = audioContext.createMediaStreamSource(stream);

  // Create an audio meter for checking the volume
  meter = createAudioMeter(audioContext);

  // Connect the meter and the microphone so the meter has access
  // the microphone stream
  microphone.connect(meter);
}









// audioError ()
//
// If something goes wrong, panic!
function audioError(e) {
  $('#volume').css({
    'background-color': 'red'
  })
}







// update ()
//
// Called every CHECK_INTERVAL milliseconds.
// Checks to make sure the meter exists, and then calls a function
// to resize characters based on volume on each character
function update () {
  // Check the meter is working...
  if (meter) {
    // If so, then for each element with class "blast" (e.g. each
    // span around each character...)
    $('.blast').each(function (index) {
      // Call the soundWave function with the parameters of:
      // * the element itself
      // * the index of the element (a unique number)
      // * the current volume of the meter
      soundWave($(this), index, meter.volume);
    });
  }
}






// soundWave (element, index, volume)
//
// Sets the font size of 'element' based on the 'volume' after
// a delay based on 'index'
function soundWave (element, index, volume) {
  // Set a timeout based on the index of this element
  setTimeout(function () {
    console.log("I hear you");

    element.css({

      // transform: 'scaleY(' + newVolume + ')',
      color: getRandomElement(colors),
      opacity: volume
      // fontSize: volume + 'em'
    });
  },index*10);
  // We delay by index * 10, e.g. 10 ms between each character changing size
  // from the start of the text to the end...
}



function getRandomElement(array) {
  return (array[Math.floor(Math.random() * array.length)]);
}
