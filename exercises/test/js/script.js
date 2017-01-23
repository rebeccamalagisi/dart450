/*

Counter
Pippin Barr

The code here sets an interval to run code repeatedly
which updates the text in a div on the page with the
value of a counter variable;

*/

$(document).ready(function() {
  var counter = 0; // The counter itself, to be displayed
  var interval = 1000; // How often to update the counter (millis)

  // We want to update the counter each interval, so we use the
  // built in setInterval function, which calls a function
  // over and over again at a set interval
  //
  // Documentation here:
  // http://www.w3schools.com/jsref/met_win_setinterval.asp

  setInterval(function () {
    // Set the text on the page to be the value of the counter
    $("#counter").text(counter);
    // Increment the counter
    counter++;
    // There are multiple ways of doing this:
    // counter = counter + 1;
    // counter += 1;
    // counter++
  },interval);

  if (counter > 10) {
    var interval = 100;
    
    setInterval(function () {
      // Set the text on the page to be the value of the counter
      $("#counter").text(counter);
      // Increment the counter
      counter++;
      // There are multiple ways of doing this:
      // counter = counter + 1;
      // counter += 1;
      // counter++
    },interval);

  }

});
