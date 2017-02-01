

// Image range displayed in webpage
const TOTAL_IMAGES = randomIntegerInRange(0,40);

const AVAILABLE_IMAGES = 21;

const NUM_RANDOM_CIRCLES = 8;


$(document).ready(function() {

  setTimeout(function () {
        window.location.reload();
  }, 3000);


  messUpPage();


  $('#title').each(function () {
    titleChange($(this));
  });


  // We're going to generate some randomly positioned rectangles, and
  // this is how many we'll generate

  for (var i = 0; i < NUM_RANDOM_CIRCLES; i++) {

    // Math.random() returns a random floating point number between 0 and 1
    // $(document).width() and $(document).height() return the width and
    // height of the current document respectively
    //
    // So if we multiply the width by a random number between 0 and 1 we
    // get a random position from the left to the right of the page
    var x = Math.random() * $(document).width();

    // And if we multiply the height by a random number between 0 and 1
    // we get a random position from the top to the bottom of the page
    var y = Math.random() * $(document).height();

    // And we can generate a rectangle at that position
    var c = generateCircle(x,y);

    // And then add it to the page
    $('body').append(c);

  }

});




// Title

function titleChange(element) {
  var sizeChange = randomIntegerInRange(0,800);
  var randomRedValue = randomIntegerInRange(0,255);
  var randomBlueValue = randomIntegerInRange(0,255);
  var randomGreenValue = randomIntegerInRange(0,255);

  element.css({
    fontSize: sizeChange + 'px',
    color: 'rgba(' + randomRedValue + ',' + randomGreenValue + ',' + randomBlueValue + ',0.5)'
  });

}


// Circles

function generateCircle(x, y) {

  var circleDiv = $('<div></div>');
  var randomRedValue = randomIntegerInRange(0,255);
  var randomBlueValue = randomIntegerInRange(0,255);
  var randomGreenValue = randomIntegerInRange(0,255);
  // var w = randomIntegerInRange(0,500);
  // var h = randomIntegerInRange(0,500);

  circleDiv.css({
    position: 'absolute',
    zIndex: '0',
    width: '120px',
    height: '120px', 
    top: y + 'px',
    left: x + 'px', 
    backgroundColor: 'rgba(' + randomRedValue + ',' + randomGreenValue + ',' + randomBlueValue + ',0.5)',
    borderRadius: '50%'

  });

  return circleDiv;

}

// messUpPage()

function messUpPage() {


  // We'll use a for loop to count up to the total number of images
  // we want to add to the page and run the code for adding them
  for (var i = 0; i < TOTAL_IMAGES; i++) {
    var img = generateRandomImage();
    $('body').append(img);
  }
}



// Images

function generateRandomImage() {

  // First we choose a random number for the image to use
  // (This only works because we numbered the image filenames)
  var imageNumber = randomIntegerInRange(1,AVAILABLE_IMAGES);

  // Now we create the string that points to the location of the image
  var imageSource = "images/image" + imageNumber + ".jpg";

  // Now we generate a random x and y location for the image to display
  var imageX = randomIntegerInRange(0,$(document).width());
  var imageY = randomIntegerInRange(0,$(document).height());


  // Now we generate the actual image element with jQuery, building in
  // the location of the image for the src property
  var img = $('<img class="image" src="' + imageSource + '">');
  // Note that we're relying on giving it class "image" for things like
  // position: absolute

  // Then use CSS to set its location with top and left
  img.css({
    top: imageY + 'px',
    left: imageX + 'px',
  });

  // Randomly rotate the image using our function
  randomRotate(img,-180,180);

  // Return the image we created
  return img;
}

// randomRotate(element,maximum)
//
// This function takes a jQuery element and changes its CSS to rotate
// it by a random positive number up to the specified maximum, in degrees.




function randomRotate(element,min,max) {

  // First generate a random integer between 0 and the maximum
  rotation = randomIntegerInRange(min,max);

  // Now set the supplied element's transform property to rotate it
  // around the Z axis by the random amount
  element.css({
    "transform": "rotateZ(" + rotation + "deg)"
  });

  // Notice how we DON'T need to return the element in this case.
  // This is a special case when working with OBJECTS.
  // When they get passed to a function, you can do stuff to them
  // in the function that actually affects them.
  // (It's not necessarily great programming practice to do this
  // all the time!)
}


// randomIntegerInRange(min, max)
//
// Returns a random integer between min and max (not including max)

function randomIntegerInRange(min,max) {

  // This is just an equation essentially.
  //
  // Math.random() returns a number between 0 and 1
  // Math.floor() removes anything after the decimal point
  // (max - min) gives us the size of the possible range of values
  //
  // So a random amount of that range + min will give us a
  // random number between min and max (not including max)

  return Math.floor(Math.random() * (max - min)) + min;
}
