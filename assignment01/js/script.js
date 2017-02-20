/*

Assignment 01 - Interactive Personality
Rebecca Malagisi

An interactive website meant to waste your time.
Click on the squares to clear them, but it may be harder than it seems.
(don't forget to scroll!!!)
After the first minute you will get an update stating how much time you've wasted.
Afterwards, you will receive a random message from an array of choices every 20 seconds.

~~~ THIS IS WHERE THE MAGIC HAPPENS ~~~

*/


// TIMER VARS
var counter = 0;
// Time interval for the timer
var timeInterval = 1000;

// SPEECH VARS
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
  "You'll regret procrastinating later."
  // "Shouldn't you be doing something more productive with your time?",
  // "Shouldn't you be doing something more productive with your time?",

];




// For the square divs for loop
const NUM_RANDOM_RECTS = 6;
const INTERVAL = 2500;




///////////////////////////////////////////////////////////////////////////
// DOCUMENT.READY

$(document).ready(function() {

  responsiveVoice.OnVoiceReady = speechIsReady;


  // SPEECH TIME INTERVAL
  setInterval(function () {

    // Set the text on the page to be the value of the counter
    $("#timer").text(counter);
      // Adds 1 to counter/timer every second
      counter++;

      // IF speech element to let you know when a minute has passed
      if (counter == 60) {
        sayOne("You just wasted a minute of your life.");
        console.log("speech is okay");

      }

      // ELSE IF speech elements every 15 seconds after first minute with additional phrases
      else if (counter == 75) {
        sayTwo(answers);
        console.log("right on, pal");
      }

      else if (counter == 90) {
        sayTwo(answers);
        console.log("right on, pal");
      }

      else if (counter == 105) {
        sayTwo(answers);
        console.log("right on, pal");
      }

      else if (counter == 120) {
        sayTwo(answers);
        console.log("right on, pal");
      }

      else if (counter == 135) {
        sayTwo(answers);
        console.log("right on, pal");
      }

  },timeInterval);




  // RECT INTERVAL
  setInterval(function () {
    for (var i = 0; i < NUM_RANDOM_RECTS; i++) {

      // Will give a random width position
      var x = Math.random() * $(document).width();

      // Will give a random height position
      var y = Math.random() * $(document).height();


      var rect = generateRect(x,y);

      // Add click to circle

      // When mouse touches the squares, they will start to move down the page or 'run away' from the user
      $('div').mouseover(function(){
        $(this).animate({
          'top': '+=76px'

        }, 100);

        console.log("weeeee");

      });

      // Clicking on the squares will hide them
      $('div').click(function(){
        $(this).hide();

        console.log("clicky");

      });



      // Adding the divs to the page
      $('body').append(rect);



    }

  }, INTERVAL);







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



function generateRect(x, y) {

  // Making divs
  var rectDiv = $('<div></div>');
  // Div variables
  var w = randomIntegerInRange(60,500);
  var h = randomIntegerInRange(60,500);
  var randomRedValue = randomIntegerInRange(0,255);
  var randomBlueValue = randomIntegerInRange(0,255);
  var randomGreenValue = randomIntegerInRange(0,255);

  // Styling the divs
  rectDiv.css({
    position: 'absolute',
    zIndex: '0',
    width: w + 'px',
    height: h + 'px', 
    top: y + 'px',
    left: x + 'px', 
    backgroundColor: 'rgba(' + randomRedValue + ',' + randomGreenValue + ',' + randomBlueValue + ',1)'


  });

  // Give me a div but don't show it on the webpage until I append it in the document.ready
  return rectDiv;

}



// This is just an equation essentially.
//
// Math.random() returns a number between 0 and 1
// Math.floor() removes anything after the decimal point
// (max - min) gives us the size of the possible range of values
//
// So a random amount of that range + min will give us a
// random number between min and max (not including max)

function randomIntegerInRange(min,max) {



  return Math.floor(Math.random() * (max - min)) + min;
}
