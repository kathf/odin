var selectTab = function(event) {
	$('#tabContent div').addClass('hidden');

	var tabName = event.target.className;
	$('#tabContent div')
		.filter('#' + tabName)
		.removeClass('hidden');
}


$(function() {
  var content = $('div#content');

  var img = $("<img id='owl'>");
  img.attr('src', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Athene_noctua_(cropped).jpg');

  var heading = $('<h1>OMG amazing restaurant</h1>');
  var copy = $('<p>Some copy about how wonderful the restaurant is.</p>')

  content.prepend(img, heading, copy);

  $('#tabHeadings').on('click', 'h3', selectTab);
})
