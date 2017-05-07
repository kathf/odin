var imageLinks = [
  'assets/image1.jpg',
  'assets/image2.jpg',
  'assets/image3.jpg',
  'assets/image4.jpg'
];

function setupSlider(imageLinks) {
  $('#imageCentre').prop('src', imageLinks[0])
  $('#imageRight').prop('src', imageLinks[1])

  var last = imageLinks.length - 1;
  $('#imageLeft').prop('src', imageLinks[last])
}

function next(e) {
  e.preventDefault();
  var srcRight = $('#imageCentre').prop('src');
  var srcCentre = $('#imageLeft').prop('src');
  var srcLeft = increment(srcCentre, -1);

  $('#imageRight').prop('src', srcRight);
  $('#imageCentre').prop('src', srcCentre);
  $('#imageLeft').prop('src', srcLeft);
}

function previous(e) {
  e.preventDefault();
  var srcLeft = $('#imageCentre').prop('src');
  var srcCentre = $('#imageRight').prop('src');
  var srcRight = increment(srcCentre, 1);

  $('#imageRight').prop('src', srcRight);
  $('#imageCentre').prop('src', srcCentre);
  $('#imageLeft').prop('src', srcLeft);
}

function increment(src, int) {
  var strPosition = src.search('assets/*');
  srcToMatch = src.slice(strPosition, 100);
  var i = $.inArray(srcToMatch, imageLinks);
  i += parseInt(int);

  if ( i < 0 || i > imageLinks.length ) {
    i = Math.abs(imageLinks.length - i)
  }

  return imageLinks[i];
}

$(document).ready(function() {

  setupSlider(imageLinks);
  $('#rightArrow').click( next );
  $('#leftArrow').click( previous );
});


