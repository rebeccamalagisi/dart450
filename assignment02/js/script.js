/*

Assignment 02 - Personification of the web/Interactive personality
Rebecca Malagisi

Description of this script in the context of the project

*/




///////////////////////////////////////////////////////////////////////////

// DATE VARIABLES

// retrieve date and time data from computer and store in date variable
var date = new Date();
// getHours will retrieve the hour from the computer (0-23 hours)
// date.getHours --> date is the variable above
// call the var theHour to callback easier later
var theHour = date.getHours();
var theDay = date.getDate(); // maybe unnecessary???





///////////////////////////////////////////////////////////////////////////

// AUDIO VARIABLES

// How often to check the current volume
const CHECK_INTERVAL = 100;

// An audiocontext is used to work with audio
var audioContext;
// We will create an audio meter and put it in here
var meter;
// A place to store the output stream of the microphone
var microphone;



// const INTERVAL = 100;
// // How fast the emoticon faces should fade in and out
// const ANIMATION_DURATION = 1500;
//
// const MAX_TIME_SINCE_FACE = 100;
// // Track how long it has been since the page has seen a face,
// // start on a high value so it assumes it hasn't seen one for a long time
// var timeSinceFace = 1000;
//
// var noStrings = [
//   "Where are you?",
//   "Where did you go?",
//   "I miss you.",
//   "I can't see you.",
//   "Come back.",
//   "I'm so lonely.",
//   "Why do you keep leaving me?",
//   "Don't be shy.",
//   "I wish you'd show me your face.",
//   "Please don't hide from me."
// ];
// var yesStrings = [
//   "There you are.",
//   "Welcome back.",
//   "Hey there, friend.",
//   "I'm glad you're back.",
//   "I missed you, pal.",
//   "Stay with me for a while.",
//   "You look so serious.",
//   "You have nice eyes.",
//   "You're so intriguing to watch.",
//   "I wish I knew more about you."
// ];



///////////////////////////////////////////////////////////////////////////

// DOCUMENT.READY = SHIT THAT IS READY WHEN THE PAGE LOADS

$(document).ready(function() {

  // Make functions work by calling it when the document loads
  careInstructions();

  awakeAsleep();

  saveLocal();


  // Calling the clearLocal storage function with keypress = reseting memory
  $("body").keypress(clearLocal);





  // Audio stuff
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {     
      // Note that this time we use {audio: true} to get the microphone,
      // otherwise it's the same as getting video.
      navigator.getUserMedia({audio: true}, handleAudio, audioError);

      console.log("AUDIO WORKING");
    }

    // We're going to repeatedly check the current audio volume
    // in order to update the visibilty of the page content,
    // so we need an interval
    setInterval(update,CHECK_INTERVAL);


    // // video implementation
    // if (navigator.getUserMedia) {      
    //   navigator.getUserMedia({video: true}, handleVideo, videoError);
    //
    //
    // }




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
  if (theHour >= 9 && theHour <= 23){

    // displays text in console to make sure if statement works
    console.log("2 - Awake");

    // white background
    $("body").css({
      backgroundColor : "cornsilk" // change to white after
    });

  }




  // ELSE, if the time is not 10am-8pm, the site is ASLEEP (black background)
  else {

    // displays text in console to make sure if statement works
    console.log("2 - Asleep");

    // black background
    $("body").css({
      backgroundColor : "black"
    });

    // how to make non responsive??



  }


};


///////////////////////////////////////////////////////////////////////////

// SQUARE THINGS

// function happySquare() {
//
//
//   const TOTAL_CLASSES = 1;
//
//
//   // We want to add divs over time this time...
//   // So we'll use setInterval, which is like a kind of loop in time
//   // It happens over and over again, just with a delay between
//   // executions of its code.
//
//
//   // setInterval(function () {
//     // And then we'll have our for loop from previously
//     for (var i = 0; i < TOTAL_CLASSES; i++) {
//
//       console.log("happy");
//       // Create the div
//       var happy = $('<div class="happy' + i + '"></div>')
//       // Add the div to the page
//       return happy;
//     }
//   // },INTERVAL);
//
//
//
//
// };
//
//
//
// function sadSquare() {
//
//
//
//
//
// };









// function happySquare (x) {
//
//   console.log("happy square test");
//
//   var squareOne = $('<div></div>'); 
//
//   squareOne.css({
//     position: 'absolute',
//     width: '20px',
//     height: '20px', 
//     bottom: '65px',
//     left: x + 'px', 
//     backgroundColor: 'lime'
//   });
//
//   return squareOne;
//
//
//
//
// };
//
//
//
// function sadSquare (x) {
//
//   console.log("sad square test");
//
//   var squareTwo = $('<div></div>'); 
//
//   squareTwo.css({
//     position: 'absolute',
//     width: '20px',
//     height: '20px', 
//     bottom: '25px',
//     left: x + 'px', 
//     backgroundColor: 'blue'
//   });
//
//   return squareTwo;
//
//
//
// };



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

// TIME OF LAST VISIT SAVED TO LOCAL STORAGE

function saveLocal() {

    var memory;

    // localStorage.clear();

    // retrieve date and time data from computer and store in now variable
    var now = new Date();

    // Memory var set to get the localStorage
    memory = localStorage.getItem('memory');

    // If user has not visited before, new time NOW will be LASTVISIT
    if (memory == undefined) {
      memory = {
        lastVisit: now.getTime()
      }
    }
    // Else, get find the data in memory
    else {
      memory = JSON.parse(memory);
    }



    // getTime() retrieves time in milliseconds
    var nowMillis = now.getTime();
    // Calculate time since last visit as timeAway var
    var timeAway = nowMillis - memory.lastVisit;
    // Print this in the console
    console.log("Time away: ",timeAway);

    // Calculate days as milliseconds divided by 1000 (milliseconds/second) divided by 60 (seconds/minute) divided by 60 (minutes/hour) divided by 24 (hours/day)
    var daysAway = timeAway/1000/60/60/24;

    // IF there hasn't been a visit (no previous memory/timeAway)
    if (daysAway == 0) {
      console.log("Ooooohhhh a new person!");
    }
    // ELSE IF not much time has passed
    else if (daysAway > 0) {
      console.log("I love you so damn much.");
      // $("body").append(happySquare());
    }
    // ELSE IF user has been gone for less than 1.5 days
    else if (daysAway < 1.5) {
      console.log("I'm so happy you're back!");
    }
    // ELSE user has been gone for over 1.5 days
    else {
      console.log("Where WERE you?!");
    }


    // each visit, replace the memory (lastVisit) as current time
    memory.lastVisit = now.getTime();
    localStorage.setItem('memory',JSON.stringify(memory));



};


///////////////////////////////////////////////////////////////////////////

// CLEAR LOCAL STORAGE

function clearLocal(event) {

  // If the event number 32 aka space bar is keypress
  if (event.which == 32) {

    // Tell the console that it is reseting
    console.log("RESET");

    // And erase the memory
    localStorage.clear();

  }


};



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
  // $("body").append(sadSquare(100,100));
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
    var newOpacity = meter.volume*50 - 1;
    if (newOpacity < 0) {
      newOpacity = 0;
    }
    // Could also use: var newOpacity = Math.max(0, 1 - meter.volume*10000)
    // if we don't want the if statement

    // Now set the opacity
    $('#audio').css({
      opacity: Math.max(0, newOpacity)
    });

    // TRY THIS: just set newOpacity to be meter.volume instead,
    // what does this do? How does it change your experience of the page?
  }

}


///////////////////////////////////////////////////////////////////////////


// // handleVideo (stream)
// //
// // When getUserMedia gets hold of the user's webcam, it calls this function
// // with the argument "stream" which is the stream of the webcam data
// function handleVideo(stream) {
//   // First get the URL of the stream
//   var streamURL = window.URL.createObjectURL(stream);
//   // Now hold of the element on the page that can contain the video
//   // (the video element with id 'webcam') and set its src attribute
//   // to the URL we created for the stream...
//   $('#webcam').attr({
//     src: streamURL
//   });
//   // And now that the webcam is available, we can start actually tracking
//   // colors with our tracking.js code...
//   startTracking();
//
//
// }
//
// // videoError (e)
// //
// // If there's a problem with getting the webcam, this will get called.
// // For now it just sets the background color to red to show something
// // went wrong. Not very sophisticated.
// function videoError(e) {
//   $('body').css({
//     'background-color': 'red'
//   })
// }
//
// // startTracking()
// //
// // Called when webcam is available. Sets up the face tracking.
// function startTracking() {
//
//   // Make a face tracker...
//   var faceTracker = new tracking.ObjectTracker(['face']);
//
//   // Set up the function to call each frame while tracking
//   faceTracker.on('track', handleTrackingEvent);
//
//   // Start tracking
//   tracking.track('#webcam', faceTracker);
//
//   // Also start an interval function that will check if the page
//   // should become sad
//   setInterval(checkSad,INTERVAL);
//
//
// }
//
// // updateFeelings ()
// //
// // Called every INTERVAL - updates how the page is feeling based on
// // when it last saw our face...
// function checkSad () {
//   // Update our variable tracking how long it's been since we saw a face...
//   timeSinceFace += 100;
//   // Note this is set back to 0 every frame that the tracker detects a face.
//
//   // Check whether it's been too long since we saw a face
//   // AND the happy face is still full opacity (i.e. not animating away)
//   if (timeSinceFace > MAX_TIME_SINCE_FACE && $('#yes').css('opacity') == 1) {
//     // If so, animate in the sad face and animate out the happy face
//     $('#no').animate({
//       opacity: 1
//     },ANIMATION_DURATION);
//     $('#yes').animate({
//       opacity: 0
//     },ANIMATION_DURATION);
//     // Say a random string from our sad lines
//     $('#no').text(getRandomString(noStrings));
//   }
//
//
// }
//
// // handleTrackingEvent
// //
// // Called every frame of video that detection is running
// function handleTrackingEvent (event) {
//   // Check if anything was tracked (a face)
//   if (event.data.length === 0) {
//     // No faces were detected in this frame.
//   }
//   else {
//     // We found a face!
//     // Reset the time since we saw a face to 0
//     timeSinceFace = 0;
//     // If the happy face has opacity 0, we need to animate it in
//     // and animate out the sad face
//     if ($('#yes').css('opacity') == 0) {
//       $('#no').animate({
//         opacity: 0
//       },ANIMATION_DURATION);
//       $('#yes').animate({
//         opacity: 1,
//       },ANIMATION_DURATION);
//       // Speak a happy line
//       $('#yes').text(getRandomString(yesStrings));
//     }
//   }
//
//
// }
//
//
//
//
//
//
//
// // getRandomString (array)
// //
// // A helper function that just returns a random string from the provided
// // array. This is a classic way to select a random element from an array.
// function getRandomString(array) {
//   var randomIndex = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// }
