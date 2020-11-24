var player;
var playerLaser;

const playerImg = new Image();
playerImg.src = "../data/PNG/playerShip1_blue.png";
const playerLaserImg = new Image();
playerLaserImg.src = "../data/PNG/Lasers/laserBlue01.png";

function startGame() {
  player = new component(400, 300, 60);
  playerLaser = new component(400, 300, 10);
}

var myGameArea = {
  canvas: document.querySelector("canvas"),
  start: function () {
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.update = function () {};
}
