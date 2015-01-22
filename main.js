var canvas;
var w;
var h;
var context;
var snowFlakes = [];
var angle = 0;

window.addEventListener('load', function() {
	canvas = document.getElementById("snow");
	w = window.innerWidth;
	h = window.innerHeight;
	canvas.width = w;
	canvas.height = h;
	context = canvas.getContext('2d');
	snowFlakes.length = 400;

	for(var i = 0; i < snowFlakes.length; i++) {
		var x = Math.floor(Math.random() * canvas.width);
		var y = Math.floor(Math.random() * canvas.height);
		snowFlakes[i] = new Snow(x, y);
	}
});

function Snow(x, y) {
	this.x = x;
	this.y = y;
	this.rad = .1 + (2.9 * Math.random());
	this.density = Math.random() * 200;
}

Snow.prototype = {
	draw: 				function() {
							context.beginPath();
							context.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false);
							context.fillStyle = 'white';
							context.fill();
						},
	increment: 			function() {
							this.y += Math.cos(angle + this.density) + 1 + this.rad / 2;
							this.x += Math.sin(angle) * 2;
							if(this.x > w + 5 || this.x < -5 || this.y > h) {
								if(Math.random() > .33) {
									this.x = Math.random() * w;
									this.y = -10;
								} 
								else {
									if(Math.sin(angle) > 0) {
										this.x = -5;
										this.y = Math.random() * h;
									}
									else {
										this.x = w + 5;
										this.y = Math.random() * h;
									}
								}
							}
						}
}

function drawSnow() {
	context.clearRect(0, 0, w, h);
	for(var i = 0; i < snowFlakes.length; i++) {
		snowFlakes[i].draw();
	}
	angle += .01;
	for(var i = 0; i < snowFlakes.length; i++) {
		snowFlakes[i].increment();
	}
}

setInterval(drawSnow, 33);



