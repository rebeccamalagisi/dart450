

$(document).ready(function() {
  // Set the starting opacity for the overlay, default is 1
  // The range is 0 to 1
  var opacity1 = 0;
  var opacity2 = 0;
  var opacity3 = 0;
  var opacity4 = 0;
  var opacity5 = 0;
  var opacity6 = 0;

  // Set an interval at which the opacity changes
  var interval = 150;

  // Set the amount opacity should decrease when a key is pressed
  var opacityDecrease = 0.1;

  // Set the amount opacity should increase each interval
  var opacityIncrease = 0.2;



  // We need to "hear" when the user types on their keyboard
  // so we can tell they are making an effort to see the content
  // so we use jQuery's .keypress().
  // We'll use it on 'body' so it hears all keypresses.
  $('body').keypress(function (event) {

    if (event.which == 104) {

      opacity1 = opacity1 + opacityIncrease;

      if (opacity1 > 1) {

        opacity1 = 1;

      }




    }


    if (event.which == 116) {


      opacity2 = opacity2 + opacityIncrease;
      // Could also write this as:
      // opacity -= opacityDecrease;

      // Make sure opacity doesn't become a negative number
      if (opacity2 > 1) {
        // If opacity had become negative, set it back to 0
        opacity2 = 1;

      }



    }

    if (event.which == 101) {


      opacity3 = opacity3 + opacityIncrease;
      // Could also write this as:
      // opacity -= opacityDecrease;

      // Make sure opacity doesn't become a negative number
      if (opacity3 > 1) {
        // If opacity had become negative, set it back to 0
        opacity3 = 1;

      }



    }

    if (event.which == 99) {


      opacity4 = opacity4 + opacityIncrease;
      // Could also write this as:
      // opacity -= opacityDecrease;

      // Make sure opacity doesn't become a negative number
      if (opacity4 > 1) {
        // If opacity had become negative, set it back to 0
        opacity4 = 1;

      }



    }

    if (event.which == 112) {


      opacity5 = opacity5 + opacityIncrease;
      // Could also write this as:
      // opacity -= opacityDecrease;

      // Make sure opacity doesn't become a negative number
      if (opacity5 > 1) {
        // If opacity had become negative, set it back to 0
        opacity5 = 1;

      }



    }

    if (event.which == 115) {


      opacity6 = opacity6 + opacityIncrease;
      // Could also write this as:
      // opacity -= opacityDecrease;

      // Make sure opacity doesn't become a negative number
      if (opacity6 > 1) {
        // If opacity had become negative, set it back to 0
        opacity6 = 1;

      }



    }


  });






  // In order to animate the opacity changing, we will use
  // setInterval to run code at a set interval!
  setInterval(function () {




    opacity1 = opacity1 - opacityDecrease;

    if (opacity1 < 0) {
      opacity1 = 0;
    }

    opacity2 = opacity2 - opacityDecrease;

    if (opacity2 < 0) {
      opacity2 = 0;
    }

    opacity3 = opacity3 - opacityDecrease;

    if (opacity3 < 0) {
      opacity3 = 0;
    }

    opacity4 = opacity4 - opacityDecrease;

    if (opacity4 < 0) {
      opacity4 = 0;
    }

    opacity5 = opacity5 - opacityDecrease;

    if (opacity5 < 0) {
      opacity5 = 0;
    }

    opacity6 = opacity6 - opacityDecrease;

    if (opacity6 < 0) {
      opacity6 = 0;
    }






    var textColor1 = "rgba(0,0,0," + opacity1 + ")"
    var textColor2 = "rgba(0,0,0," + opacity2 + ")"
    var textColor3 = "rgba(0,0,0," + opacity3 + ")"
    var textColor4 = "rgba(0,0,0," + opacity4 + ")"
    var textColor5 = "rgba(0,0,0," + opacity5 + ")"
    var textColor6 = "rgba(0,0,0," + opacity6 + ")"


    $('#one').css({
      "color": textColor1
    });

    $('#two').css({
      "color": textColor2
    });

    $('#three').css({
      "color": textColor3
    });

    $('#four').css({
      "color": textColor4
    });

    $('#five').css({
      "color": textColor5
    });

    $('#six').css({
      "color": textColor6
    });


  },interval);






});
