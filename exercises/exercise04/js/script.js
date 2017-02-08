



$(document).keypress(function(){


  $('body').append(playJack);

  $('body').each(function () {
    generateColor($(this));
  });


});






function playJack () {

  var myText = ["all ", "work ", "and ", "no ", "play ", "makes ", "jack ", "a ", "dull ", "boy "];


  return myText;

}



function generateColor (element) {

  var bgColor = ['cyan', 'green', 'yellow', 'orange', 'gray', 'blue', 'purple']
  var randomColor = bgColor[Math.floor(Math.random() * bgColor.length)];


  element.css({
    'background-color': randomColor
  });

}



function randomIntegerInRange(min,max) {

  return Math.floor(Math.random() * (max - min)) + min;

}
