/*

Attention Seeker
Pippin Barr

The code to make the webpage look for a face in the webcam and
be happy or sad based on whether it can see someone or not.

*/

const INTERVAL = 100;
// How fast the emoticon faces should fade in and out
const ANIMATION_DURATION = 1000;

const MAX_TIME_SINCE_FACE = 1000;
// Track how long it has been since the page has seen a face,
// start on a high value so it assumes it hasn't seen one for a long time
var timeSinceFace = 1000000;

var noStrings = [
  "Where are you?",
  "Where did you go?",
  "I miss you.",
  "I can't see you.",
  "Come back.",
  "I'm so lonely.",
  "Why do you keep leaving me?"
];
var yesStrings = [
  "There you are.",
  "I like your shirt.",
  "Hey there.",
  "I'm glad you're back.",
  "I missed you, pal.",
  "Stay with me for a while.",
  "You look so serious."
];


$(document).ready(function() {

  // Do the getUserMedia stuff
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

  if (navigator.getUserMedia) {      
    navigator.getUserMedia({video: true}, handleVideo, videoError);
  }
});

// handleVideo (stream)
//
// When getUserMedia gets hold of the user's webcam, it calls this function
// with the argument "stream" which is the stream of the webcam data
function handleVideo(stream) {
  // First get the URL of the stream
  var streamURL = window.URL.createObjectURL(stream);
  // Now hold of the element on the page that can contain the video
  // (the video element with id 'webcam') and set its src attribute
  // to the URL we created for the stream...
  $('#webcam').attr({
    src: streamURL
  });
  // And now that the webcam is available, we can start actually tracking
  // colors with our tracking.js code...
  startTracking();
}

// videoError (e)
//
// If there's a problem with getting the webcam, this will get called.
// For now it just sets the background color to red to show something
// went wrong. Not very sophisticated.
function videoError(e) {
  $('body').css({
    'background-color': 'red'
  })
}

// startTracking()
//
// Called when webcam is available. Sets up the face tracking.
function startTracking() {

  // Make a face tracker...
  var faceTracker = new tracking.ObjectTracker(['face']);

  // Set up the function to call each frame while tracking
  faceTracker.on('track', handleTrackingEvent);

  // Start tracking
  tracking.track('#webcam', faceTracker);

  // Also start an interval function that will check if the page
  // should become sad
  setInterval(checkSad,INTERVAL);
}

// updateFeelings ()
//
// Called every INTERVAL - updates how the page is feeling based on
// when it last saw our face...
function checkSad () {
  // Update our variable tracking how long it's been since we saw a face...
  timeSinceFace += 100;
  // Note this is set back to 0 every frame that the tracker detects a face.

  // Check whether it's been too long since we saw a face
  // AND the happy face is still full opacity (i.e. not animating away)
  if (timeSinceFace > MAX_TIME_SINCE_FACE && $('#yes').css('opacity') == 1) {
    // If so, animate in the sad face and animate out the happy face
    $('#no').animate({
      opacity: 1
    },ANIMATION_DURATION);
    $('#yes').animate({
      opacity: 0
    },ANIMATION_DURATION);
    // Say a random string from our sad lines
    $('#no').text(getRandomString(noStrings));
  }
}

// handleTrackingEvent
//
// Called every frame of video that detection is running
function handleTrackingEvent (event) {
  // Check if anything was tracked (a face)
  if (event.data.length === 0) {
    // No faces were detected in this frame.
  }
  else {
    // We found a face!
    // Reset the time since we saw a face to 0
    timeSinceFace = 0;
    // If the happy face has opacity 0, we need to animate it in
    // and animate out the sad face
    if ($('#yes').css('opacity') == 0) {
      $('#no').animate({
        opacity: 0
      },ANIMATION_DURATION);
      $('#yes').animate({
        opacity: 1,
      },ANIMATION_DURATION);
      // Speak a happy line
      $('#yes').text(getRandomString(yesStrings));
    }
  }
}







// getRandomString (array)
//
// A helper function that just returns a random string from the provided
// array. This is a classic way to select a random element from an array.
function getRandomString(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
