var colorThief = new ColorThief()

var Track = {
	_preventDrop: function(e) {
		e.preventDefault()
		return false
	},
	_onDrop: function(e) {
		var file = e.dataTransfer.files[0]
		console.log(file)
		audio.src = URL.createObjectURL(file)
		audio.load()

		Track.renderCover(file, function() {
			Analyser.init(audio)
			audio.play()
		})
	},
	bind: function() {
		document.addEventListener('dragover', Track._preventDrop)
		document.addEventListener('dragenter', Track._preventDrop)
		document.addEventListener('drop', Track._onDrop)
		document.addEventListener('drop', Track._preventDrop)
	}
}

Track.renderCover = function(file, cb) {
	var mm = musicmetadata(file)
	mm.on('metadata', function(metadata) {
		var pic = metadata.picture[0],
			b = new Blob([pic.data], {type: pic.format})

		cover.onload = function () {
			Track.color = colorThief.getColor(cover)
			cb()
    	}
    	cover.src = URL.createObjectURL(b)
    	$('#blur')[0].style.backgroundImage = 'url('+URL.createObjectURL(b)+')'
	})
}