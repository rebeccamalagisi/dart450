$(document).ready(function() {

  // We use the jQuery .click() function to "listen" for clicks on our
  // div with id "text"

  $('.newcolor').hover(function () {
    // This is what we do when this class if hovered

    // Inside the function "this" refers to the thing that got clicked
    // And we use .toggleClass() to animate by applying a CSS class with
    // animation properties
    $(this).addClass('colorme');
  },function () {

    // Note that .hover() takes TWO functions!
    // The first one is for what to do when the hover STARTS
    // This second one is for what to do when the hover ENDS
    // (We don't want to do anything in our case)

  });

});
