

$(document).ready(function() {
  // Set the starting opacity for the overlay, default is 1
  // The range is 0 to 1
  var opacity = 0;

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

    if (event.which == 103) {

      opacity = opacity + opacityIncrease;

      if (opacity > 1) {

        opacity = 1;

      }




    }


    if (event.which == 113) {


      opacity = opacity + opacityIncrease;
      // Could also write this as:
      // opacity -= opacityDecrease;

      // Make sure opacity doesn't become a negative number
      if (opacity > 1) {
        // If opacity had become negative, set it back to 0
        opacity = 1;

      }



    }

    if (event.which == 100) {


      opacity = opacity + opacityIncrease;
      // Could also write this as:
      // opacity -= opacityDecrease;

      // Make sure opacity doesn't become a negative number
      if (opacity > 1) {
        // If opacity had become negative, set it back to 0
        opacity = 1;

      }



    }

    if (event.which == 99) {


      opacity = opacity + opacityIncrease;
      // Could also write this as:
      // opacity -= opacityDecrease;

      // Make sure opacity doesn't become a negative number
      if (opacity > 1) {
        // If opacity had become negative, set it back to 0
        opacity = 1;

      }



    }

    if (event.which == 110) {


      opacity = opacity + opacityIncrease;
      // Could also write this as:
      // opacity -= opacityDecrease;

      // Make sure opacity doesn't become a negative number
      if (opacity > 1) {
        // If opacity had become negative, set it back to 0
        opacity = 1;

      }



    }

    if (event.which == 108) {


      opacity = opacity + opacityIncrease;
      // Could also write this as:
      // opacity -= opacityDecrease;

      // Make sure opacity doesn't become a negative number
      if (opacity > 1) {
        // If opacity had become negative, set it back to 0
        opacity = 1;

      }



    }


  });






  // In order to animate the opacity changing, we will use
  // setInterval to run code at a set interval!
  setInterval(function () {



    // The first thing we do is increase the opacity because
    // its default behaviour is to become opaque
    opacity = opacity - opacityDecrease;
    // Could write:
    // opacity += opacityIncrease;

    // Make sure the opacity doesn't go above 1 in the same
    // way we made sure it didn't go below 0
    if (opacity < 0) {
      opacity = 0;
    }

    // Now we need to create a string to set the background color
    // of our overlay with the appropriate alpha value
    //
    // You can do "addition" with strings of text, where the + means
    // that you turn the two strings into one string joined together.
    // We can use that to create the "rgba(red,green,blue,alpha)"
    // format that CSS expects for a color.
    //
    // Importantly, we can use our VARIABLE opacity as part of the
    // string we're making up to allow it to set the alpha as follows:
    var textColor = "rgba(0,0,0," + opacity + ")"
    // If opacity is, say 0.8, backgroundColor will be set to
    // "rgba(255,255,255,0.8)"

    // Finally we need to set the actual CSS property of the overlay
    // div with our new background colour...
    $('#one').css({
      "color": textColor
    });

    $('#two').css({
      "color": textColor
    });

    $('#three').css({
      "color": textColor
    });

    $('#four').css({
      "color": textColor
    });

    $('#five').css({
      "color": textColor
    });

    $('#six').css({
      "color": textColor
    });


  },interval);






});
