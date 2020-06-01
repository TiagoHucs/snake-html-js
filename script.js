var pedra1;
var snake = [];
var t = 0;

function startGame() {
	pedra1 = new quadrado(19, 19, "white", 60, 20);
	snake.push(pedra1);
	myGameArea.start();
}

function restart() {
	var snake = [];
	pedra1 = new quadrado(19, 19, "white", 60, 20);
	snake.push(pedra1);
}

var myGameArea = {
	canvas: document.getElementById("canvas"),
	start: function () {
		canvas.width = 480;
		canvas.height = 270;
		this.context = canvas.getContext("2d");
		//  document.body.insertBefore(canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 200);
	},
	clear: function () {
		this.context.clearRect(0, 0, canvas.width, canvas.height);
	}
}

function quadrado(width, height, color, x, y) {
	this.id = ++t;
	this.width = width;
	this.height = height;
	this.color = color
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;

	this.move = function () {
		this.x += this.speedX;
		this.y += this.speedY;
	}

	this.paint = function () {
		myGameArea.context.fillStyle = this.color;
		myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
	}

}

function cresce() {
	x = snake[snake.length - 1].x;
	y = snake[snake.length - 1].y;
	snake.push(new quadrado(19, 19, "white", x, y));
}

function saoVizinhos(a,b) {
	return a - b == 1 || b - a == 1;
}

function checkColision(pedraA, pedraB) {
	if (pedraA.x == pedraB.x && pedraA.y == pedraB.y) {
		pedra1.color = 'red';
		console.log('pedra:' + pedraA.id + ' colidiu com a pedra:' + pedraB.id);
		restart()
	}
}


function updateGameArea() {
	console.log(snake.length)
	myGameArea.clear();
	for (var i = snake.length; i > 0; i--) {
		if (snake[i] && snake[i - 1]) {
			snake[i].x = snake[i - 1].x;
			snake[i].y = snake[i - 1].y;
		}
	}
	snake.forEach(pinta);
	function pinta(item, index) {
		item.paint();
	}

	for (var i = 0; i < snake.length; i++) {
		for (var ii = 0; ii < snake.length; ii++) {
			if (ii !== i && !saoVizinhos(i,ii)) {
				checkColision(snake[i], snake[ii]);
			}
		}
	}
	pedra1.move();
	pedra1.paint();
}

window.addEventListener('keydown', this.controla, false);

function controla(e) {
	//alert(e.keyCode);
	if (e.keyCode == 38 && pedra1.speedY == 0) {
		pedra1.speedX = 0;
		pedra1.speedY = -20;
	} else if (e.keyCode == 40 && pedra1.speedY == 0) {
		pedra1.speedX = 0;
		pedra1.speedY = 20;
	} else if (e.keyCode == 37 && pedra1.speedX == 0) {
		pedra1.speedY = 0;
		pedra1.speedX = -20;
	} else if (e.keyCode == 39 && pedra1.speedX == 0) {
		pedra1.speedY = 0;
		pedra1.speedX = 20;
	} else if (e.keyCode == 32) {
		cresce();
	}

}

//pode ser que eu use:

this.crashWith = function (otherobj) {
	var myleft = this.x;
	var myright = this.x + (this.width);
	var mytop = this.y;
	var mybottom = this.y + (this.height);
	var otherleft = otherobj.x;
	var otherright = otherobj.x + (otherobj.width);
	var othertop = otherobj.y;
	var otherbottom = otherobj.y + (otherobj.height);
	var crash = true;
	if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
		crash = false;
	} else {
		console.log('colidiu')
	}

	return crash;
}