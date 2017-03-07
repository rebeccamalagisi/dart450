/*



A basic example of using ScrollMagic with TweenMax.

Uses:

ScrollMagic
http://scrollmagic.io/

TweenMax
https://greensock.com/tweenmax

*/
//

$(document).ready(function() {

  circleDown();

  colorChange();



});





// Create a ScrollMagic Controller so we can use the library
var controller = new ScrollMagic.Controller();


function circleDown () {

  var sunset = new ScrollMagic.Scene({
    triggerElement: "#trigger1",
    duration: 100000
  });

  sunset.setTween("#trigger2", 0.5, {
    y: "372px",
    // border: "100px solid",
    // transform: "rotateY(180deg)",
    // opacity: "0.25",
    // "-webkit-text-stroke": "20px"
  });


  sunset.triggerHook(0.4);

  // Add the debugging indicators so we can see what's happening
  sunset.addIndicators();

  // Add our scene to the controller so it actually does something
  sunset.addTo(controller);




};



function colorChange () {



  var sky = new ScrollMagic.Scene({
    triggerElement: "#trigger1",
    duration: 100000
  });

  var horizon = new ScrollMagic.Scene({
    triggerElement: "#trigger1",
    duration: 100000
  });



  sky.setTween("body", 0.5, {
    "backgroundColor": "pink"
    // y: "-1000px",
    // border: "100px solid",
    // transform: "rotateY(180deg)",
    // opacity: "0.25",
    // "-webkit-text-stroke": "20px"
  });

  sky.triggerHook(0.4);

  sky.addTo(controller);




  horizon.setTween("#horizon", 0.5, {
    "backgroundColor": "pink"
    // y: "-1000px",
    // border: "100px solid",
    // transform: "rotateY(180deg)",
    // opacity: "0.25",
    // "-webkit-text-stroke": "20px"
  });

  horizon.triggerHook(0.4);

  horizon.addTo(controller);


};
