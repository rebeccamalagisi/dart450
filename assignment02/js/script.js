/*

Assignment 02 - Personification of the web/Interactive personality
Rebecca Malagisi

A shy, yet needy website that likes to interact with the user through a variety of js libraries.

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



// Universal variable for memory, will be used in saveLocal function and document.ready
var memory;

///////////////////////////////////////////////////////////////////////////



// Updates every 100 milliseconds
const INTERVAL = 100;
// Fade rate between texts
const ANIMATION_DURATION = 500;

const MAX_TIME_SINCE_FACE = 100;
var timeSinceFace = 1000;

var noStrings = [
  "Where are you?",
  "Where did you go?",
  "I can't see you.",
  "Come back.",
  "Why do you keep leaving me?",
  "I wish you'd show me your face.",
  "Please don't hide from me."
];
var yesStrings = [
  "There you are.",
  "Welcome back.",
  "Hey there, friend.",
  "I'm glad you're back.",
  "I missed you, pal.",
  "Stay with me for a while.",
  "Seeing your face brightens my day."
];

var faceDetected = false;





///////////////////////////////////////////////////////////////////////////


const NUMBER_OF_CIRCLES = 22;





///////////////////////////////////////////////////////////////////////////

// DOCUMENT.READY = SHIT THAT IS READY WHEN THE PAGE LOADS


$(document).ready(function() {

  // Make functions work by calling it when the document loads
  careInstructions();

  // Calling the clearLocal storage function with keypress = reseting memory
  $("body").keypress(clearLocal);


  // Creating a variable for the isAwake() function
  var awake = isAwake();
  // IF use that variable/function
  if (awake) {

    console.log("I'm awake.");

    // Set the background to white
    $('body').css('background-color','white');
    // Video and audio functions work
    setupVideo();
    setupAudio();
    // Time saving to localStorage works
    saveLocal();


    // Reiterate the date variables from the saveLocal function so that they can be used in another code
    var now = new Date();
    var nowMillis = now.getTime();
    var timeAway = nowMillis - memory.lastVisit;
    var daysAway = timeAway/1000/60/60/24;

    // IF the visit number is over 30 && it has been less than 24 hours since the last visit
    if (memory.numVisits >= 30 && daysAway < 1) {
      // add the fun background class to change the color
      $('body').addClass('visit');

      // Call the happy circle function
      soSoHappy();
      console.log("Play with me!");


    }
  }



  // ELSE the function is not called (if it's not between the specific times)
  else {
    // Set background to black
    $('body').css('background-color','black');

    console.log("Goodnight.");
  }





});




///////////////////////////////////////////////////////////////////////////

// CARE INSTRUCTIONS ENABLING
// (pretty self explanatory menu thingy)

function careInstructions() {

  // displays text in console to make sure function works
  console.log("Care instructions available.");

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

// IS AWAKE FUNCTION


function isAwake () {
  // theHour is var at the beginning and includes date.getHours()
  // getHours will retrieve the hour from the computer (0-23 hours)
  // date.getHours --> date is the variable at the beginning of the doc to retrieve Date() data from the computer

  // if the hour is between 10am and 6pm, the site is AWAKE (white background)
  // >= means greater than or equal to --- && means and --- <= means less than or equal to
  if (theHour >= 10 && theHour <= 18){
    return true;
  }

  // ELSE, if the time is not 10am-8pm, the site is ASLEEP (black background)
  else {
    return false;
  }
}





///////////////////////////////////////////////////////////////////////////

// AUDIO STUFF

// The MIT License (MIT)
//
// Copyright (c) 2014 Chris Wilson
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

var audioContext = null;
var meter = null;
var rafID = null;

function setupAudio () {

  // grab an audio context
  audioContext = new AudioContext();

  // Attempt to get audio input

  // monkeypatch getUserMedia
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  // ask for an audio input
  navigator.getUserMedia({"audio":{
              "mandatory": {
                  "googEchoCancellation": "false",
                  "googAutoGainControl": "false",
                  "googNoiseSuppression": "false",
                  "googHighpassFilter": "false"
              },
              "optional": []
          },
      }, gotStream, didntGetStream);


}



function didntGetStream() {
    console.log('I wanted to hear your voice.');
}



var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // kick off the visual updating
    drawLoop();
}



function drawLoop( time ) {


    // check if we're currently clipping
    if (meter.checkClipping()) {

      // if the audio is clipping, make the audio square red
			$("#audioDiv").css({
				backgroundColor: "red"

			});

      console.log("You're being too loud...");

		}

    else {

      // else the audio is good, make the audio square green
			$("#audioDiv").css({
				backgroundColor: "limegreen"

			});

		}


    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
}




///////////////////////////////////////////////////////////////////////////

// WEBCAM STUFF

function setupVideo () {

  webcamFeed();

  // Video implementation
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, handleVideo, videoError);
  }
}


// WEBCAM FEED
// from tracking.js
// https://github.com/eduardolundgren/tracking.js/blob/master/examples/face_camera.html


function webcamFeed (){

  // video variables
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var tracker = new tracking.ObjectTracker(['face']);
  tracker.setInitialScale(1);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      context.strokeStyle = 'cyan';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);

    });
  });





}



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
  startTracking();


}

// videoError (e)
//
// If there's a problem with getting the webcam, this will get called.
// For now it just sets the background color to red to show something
// went wrong. Not very sophisticated.
function videoError(e) {
  console.log("I can't see you...");

  // $('body').css({
  //   'background-color': 'red'
  // })
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
  tracking.track('#video', faceTracker);



  // Also start an interval function that will check if the page
  // should become sad
  setInterval(checkCam,INTERVAL);


}




//
// Called every INTERVAL - updates the page content based on
// when it last saw our face...
function checkCam () {
  // Update our variable tracking how long it's been since we saw a face...
  timeSinceFace += 100;
  // Note this is set back to 0 every frame that the tracker detects a face.
}

// handleTrackingEvent
//
// Called every frame of video that detection is running
function handleTrackingEvent (event) {
  // Check if anything was tracked (a face)
  if (event.data.length === 0 && faceDetected == true) {
    // No faces were detected in this frame.

    // Therefore, make the video square gold since the site CANNOT see a face
    $("#videoDiv").css({
      backgroundColor: "gold"

    });

    // show a sad string in the console
    console.log(getRandomString(noStrings))
    faceDetected = false;
    // console.log(":(");


  }
  else if (event.data.length > 0 && faceDetected == false) {
    // Face is detected

    // Therefore, make the video square blue since the site CAN see a face
    $("#videoDiv").css({
      backgroundColor: "dodgerblue"

    });

    // show a happy string in the console
    console.log(getRandomString(yesStrings))
    faceDetected = true;
    // console.log(":)");

    // Reset the time since we saw a face to 0
    timeSinceFace = 0;

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




///////////////////////////////////////////////////////////////////////////

// TIME OF LAST VISIT SAVED TO LOCAL STORAGE



function saveLocal() {

    memory;

    // localStorage.clear();

    // retrieve date and time data from computer and store in now variable
    var now = new Date();

    // Memory var set to get the localStorage
    memory = localStorage.getItem('memory');

    // If user has not visited before, new time NOW will be LASTVISIT
    if (memory == undefined) {
      memory = {
        lastVisit: now.getTime(),
        numVisits: 0
      }
    }
    // Else, get find the data in memory
    else {
      memory = JSON.parse(memory);
    }

    memory.numVisits = memory.numVisits + 1;

    console.log("Visit #" + memory.numVisits);


    // getTime() retrieves time in milliseconds
    var nowMillis = now.getTime();
    // Calculate time since last visit as timeAway var
    var timeAway = nowMillis - memory.lastVisit;
    // Print this in the console
    console.log("Time since last visit: ",timeAway);

    // Calculate days as milliseconds divided by 1000 (milliseconds/second) divided by 60 (seconds/minute) divided by 60 (minutes/hour) divided by 24 (hours/day)
    var daysAway = timeAway/1000/60/60/24;
    // Print the amount of days in the console
    console.log("Days since last visit: ",daysAway);

    // IF there hasn't been a visit (no previous memory/timeAway)
    if (daysAway == 0) {
      console.log("-");
    }
    // ELSE IF not much time has passed
    else if (daysAway > 0) {
      console.log("Thank you for visiting me again, friend.");
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

// SOSOHAPPY FUNCTION !!!
// draws and appends happy circles once the user reaches 30+ visits



function soSoHappy() {

  // Generating the circles from the generateCircles function below

  // Create a FOR loop to create a bunch of circles up to the number listed is the constant
  for (var i = 0; i < NUMBER_OF_CIRCLES; i++) {

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

    // And then add it to the page
    $('body').append(generateCircles(x,y));

  }

  // When the cursor touches a circle
  $('.circle').mouseover(function(){
    // Toggle the class .growUp to the circles, which animates them to grow in scale
    $(this).toggleClass('growUp');

    // Also animate the circles to move position in the webpage
    $(this).animate({
        // screen height
        top: Math.floor(Math.random() * 760) + 'px',
        // screen width
        left: Math.floor(Math.random() * 1200) + 'px'

    // this animation will take 1.5 seconds
    },1500);



  });


}






function generateCircles(x, y) {

  // Making the actual divs
  var circleDiv = $('<div class="circle"></div>');

  // Variables that will create the colors for the circles

  var bgColor = ['cyan', 'turquoise', 'greenyellow', 'chartreuse', 'yellow', 'rebeccapurple', 'purple', 'pink', 'magenta']
  var randomColor = bgColor[Math.floor(Math.random() * bgColor.length)];

  // Styling the circle divs using css
  circleDiv.css({
    position: 'absolute',
    zIndex: '0',
    width: '80px',
    height: '80px',
    top: y + 'px',
    left: x + 'px',
    borderRadius: '50%',
    opacity: '0.8',
    backgroundColor: randomColor
    // background: 'linear-gradient(45deg,' + randomColor + ',' + randomColor ')'

  });

  // Give me a div but don't show it on the webpage until I append it
  return circleDiv;

}



//
// // Calculate random numbers
// function randomIntegerInRange(min,max) {
//
//   return Math.floor(Math.random() * (max - min)) + min;
// }
//












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
