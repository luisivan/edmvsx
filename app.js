var $ = document.querySelectorAll.bind(document)

var audio = $('audio')[0],
	cover = $('img')[0],
	canvas = $('canvas')[0]

window.onload = function() {
	Track.bind()
}