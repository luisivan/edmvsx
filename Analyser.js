var Analyser = {}

Analyser.init = function(audio) {
	/*var ctx = new AudioContext(),
		audioSrc = ctx.createMediaElementSource(audio),
		analyser = ctx.createAnalyser()
	// we have to connect the MediaElementSource with the analyser 
	audioSrc.connect(analyser)
	// we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
	 
	// frequencyBinCount tells you how many values you'll receive from the analyser
	var freq = analyser.frequencyBinCount
	freq = 1
	var frequencyData = new Uint8Array(freq)
	 
	// we're ready to receive some data!
	// loop
	function renderFrame() {
	    requestAnimationFrame(renderFrame)
	    // update data in frequencyData
	    analyser.getByteFrequencyData(frequencyData)
	    // render frame based on values in frequencyData
	    console.log(frequencyData)
	}
	audio.play()
	renderFrame()
}*/


	var ctx = canvas.getContext('2d')
	ctx.fillStyle =  'rgb('+Track.color.join(',')+')'

	var audioContext = new AudioContext(),
		analyser = audioContext.createAnalyser()

	// We'll need the offset later
	OFFSET = 100
	// Spacing between the individual bars
	SPACING = 10
	// Initialize and start drawing
	// when the audio starts playing
	audio.addEventListener('play', draw)

	function draw() {
	  // See http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	  requestAnimationFrame(draw, canvas);
	  // New typed array for the raw frequency data
	  freqData = new Uint8Array(analyser.frequencyBinCount);
	  // Put the raw frequency into the newly created array
	  analyser.getByteFrequencyData(freqData);
	  // Clear the canvas
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  // This loop draws all the bars
	  for (var i = 0; i < freqData.length - OFFSET; i++) {
	    // Work out the hight of the current bar
	    // by getting the current frequency
	    var magnitude = freqData[i + OFFSET];
	    // Draw a bar from the bottom up (cause for the "-magnitude")
	    ctx.fillRect(i * SPACING, canvas.height, SPACING / 2, -magnitude);
	  };
	}
	window.draw = draw

	// Take input from audioElement
	source = audioContext.createMediaElementSource(audio)
	// Connect the stream to an analyzer
	source.connect(analyser)
	// Connect the analyzer to the speakers
	analyser.connect(audioContext.destination)
	// Start the animation
	draw()
}