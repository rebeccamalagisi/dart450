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


///////////////////////////////////////////////////////////////////////////

// DOCUMENT.READY = SHIT THAT IS READY WHEN THE PAGE LOADS

$(document).ready(function() {

  // Make care instructions functional by calling it when the document loads
  careInstructions();

  awakeAsleep();



});










///////////////////////////////////////////////////////////////////////////

// CARE INSTRUCTIONS ENABLING
// (pretty self explanatory menu thingy)

function careInstructions() {

  // when the icon is clicked, show the info box of information
  $("#menu").click(function(){
    $("#info").show();
  });


  // click the x to close the info box
  $(".close").click(function(){
    $("#info").hide();

  });

};

///////////////////////////////////////////////////////////////////////////

// AWAKE/ASLEEP function

function awakeAsleep() {

  // theHour is var at the beginning and includes date.getHours()
  // getHours will retrieve the hour from the computer (0-23 hours)
  // date.getHours --> date is the variable at the beginning of the doc to retrieve Date() data from the computer

  // if the hour is between 10am and 8pm, the site is AWAKE (white background)
  // >= means greater than or equal to --- && means and --- <= means less than or equal to
  if (theHour >= 9 && theHour <= 19){

    // white background
    $("body").css({
      backgroundColor : "cornsilk" // change to white after
    });

  }




  // ELSE, if the time is not 10am-8pm, the site is ASLEEP (black background)
  else {

    // black background
    $("body").css({
      backgroundColor : "black"
    });

    // how to make non responsive??



  }



};
