/*
DART450
Week 01
Colour Change
Just change the colour of the text to red if it is clicked using jQuery's
.css() function
*/

// We use "document ready" so that our code only runs once the whole
// webpage is loaded and ready.

$(document).ready(function() {

  // We use the jQuery .click() function to "listen" for clicks on our
  // div with id "text"

  $('#text').click(function () {

    // This is what we do when it is clicked

    // Inside the function "this" refers to the thing that got clicked
    // And we use .css() to set its CSS color property to ""
    $(this).css('color','red');

    // What would happen if we didn't use "this" and used "#text" instead?

    // What if there was more than one "#text" id in the HTML?

  });






});
