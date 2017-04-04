/*

Assignment 02 -
Rebecca Malagisi

Description of this script in the context of the project

*/

$(document).ready(function() {

  // Make care instructions functional by calling it when the document loads
  careInstructions();



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
