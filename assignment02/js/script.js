/*

Assignment 02 - Personification of the web/Interactive personality
Rebecca Malagisi

Description of this script in the context of the project

*/




///////////////////////////////////////////////////////////////////////////

// VARIABLES

// retrieve date and time data from computer and store in date variable
var date = new Date();
// getHours will retrieve the hour from the computer (0-23 hours)
// date.getHours --> date is the variable above
// call the var theHour to callback easier later
var theHour = date.getHours();
var theDay = date.getDate(); // maybe unnecessary???





// How often to check the current volume
const CHECK_INTERVAL = 100;

// An audiocontext is used to work with audio
var audioContext;
// We will create an audio meter and put it in here
var meter;
// A place to store the output stream of the microphone
var microphone;





///////////////////////////////////////////////////////////////////////////

// DOCUMENT.READY = SHIT THAT IS READY WHEN THE PAGE LOADS

$(document).ready(function() {

  // Make care instructions functional by calling it when the document loads
  careInstructions();

  awakeAsleep();









  // Audio stuff
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {     
      // Note that this time we use {audio: true} to get the microphone,
      // otherwise it's the same as getting video.
      navigator.getUserMedia({audio: true}, handleAudio, audioError);
    }

    // We're going to repeatedly check the current audio volume
    // in order to update the visibilty of the page content,
    // so we need an interval
    setInterval(update,CHECK_INTERVAL);






});










///////////////////////////////////////////////////////////////////////////

// CARE INSTRUCTIONS ENABLING
// (pretty self explanatory menu thingy)

function careInstructions() {

  // displays text in console to make sure function works
  console.log("1 - Care instructions available");

  // when the icon is clicked, show the info box of information
  $("#menu").click(function(){
    $("#info").fadeIn(500);
  });


  // click the x to close the info box
  $(".close").click(function(){
    $("#info").fadeOut(500);

  });

};

///////////////////////////////////////////////////////////////////////////

// AWAKE/ASLEEP FUNCTION

function awakeAsleep() {

  // theHour is var at the beginning and includes date.getHours()
  // getHours will retrieve the hour from the computer (0-23 hours)
  // date.getHours --> date is the variable at the beginning of the doc to retrieve Date() data from the computer

  // if the hour is between 10am and 8pm, the site is AWAKE (white background)
  // >= means greater than or equal to --- && means and --- <= means less than or equal to
  if (theHour >= 9 && theHour <= 19){

    // displays text in console to make sure if statement works
    console.log("2 - Good morning");

    // white background
    $("body").css({
      backgroundColor : "cornsilk" // change to white after
    });

  }




  // ELSE, if the time is not 10am-8pm, the site is ASLEEP (black background)
  else {

    // displays text in console to make sure if statement works
    console.log("2 - Good night");

    // black background
    $("body").css({
      backgroundColor : "black"
    });

    // how to make non responsive??

  }


};


///////////////////////////////////////////////////////////////////////////

// SQUARE THINGS

function happySquare (x, y) {

  console.log("happy square test");

  var squareOne = $('<div></div>'); 

  squareOne.css({
    position: 'absolute',
    width: '20px',
    height: '20px', 
    bottom: y + 'px',
    left: x + 'px', 
    backgroundColor: 'lime'
  });

  return squareOne;




};



function sadSquare (x, y) {

  console.log("sad square test");

  var squareTwo = $('<div></div>'); 

  squareTwo.css({
    position: 'absolute',
    width: '20px',
    height: '20px', 
    bottom: y + 'px',
    left: x + 'px', 
    backgroundColor: 'blue'
  });

  return squareTwo;



};



///////////////////////////////////////////////////////////////////////////

// HAPPY/SAD FUNCTION

  // if () {
  //
  //
  //
  //
  //
  // }






///////////////////////////////////////////////////////////////////////////

// # OF VISITS SAVED TO LOCAL STORAGE






///////////////////////////////////////////////////////////////////////////

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
  $("body").append(sadSquare(100,100));
}

// update ()
//
// Called every CHECK_INTERVAL milliseconds.
// Checks to make sure the meter exists, and then sets the opacity
// of our content div to be relative to the current volume.
function update () {
  if (meter) {
    // meter.volume gives us a number between 0 (silence) and 1 (loudest possible)
    // If you look at the value of meter.volume, it's often very, very small
    // for ambient noise, so we multiple by 10000 to make our webpage more
    // sensitive to noise
    //
    // We subtract that value from 1 because we want the opacity to get LOWER
    // when the volume gets HIGHER.
    var newOpacity = 1 - meter.volume*10000;
    if (newOpacity < 0) {
      newOpacity = 0;
    }
    // Could also use: var newOpacity = Math.max(0, 1 - meter.volume*10000)
    // if we don't want the if statement

    // Now set the opacity
    $('#quiet').css({
      opacity: Math.max(0, newOpacity)
    });

    // TRY THIS: just set newOpacity to be meter.volume instead,
    // what does this do? How does it change your experience of the page?
  }

}
