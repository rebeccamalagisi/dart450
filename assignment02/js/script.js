/*

Assignment 02 - Personification of the web/Interactive personality
Rebecca Malagisi

Description of this script in the context of the project

*/



var date = new Date();


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

function awakeAsleep() {

  // getHours will retrieve the hour from the computer
  // if the time is between 10am and 8pm, the site is AWAKE (white background)
  if (date.getHours() >= 9 && date.getHours() <= 21){

    $("body").css({
      backgroundColor : "white"
    });

  }

  // ELSE, if the time is not 10am-8pm, the site is ASLEEP (black background)
  else {

    $("body").css({
      backgroundColor : "black"
    });

  }



};
