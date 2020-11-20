const game = document.querySelector(".game");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

class Player {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  draw() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.drawImage(img, this.x, this.y, this.size, this.size);
  }

  update() {
    // if (PRESSED_KEY === 37 && this.x > 0) {
    //   this.x = this.x - 10;
    //   console.log(this.x);
    // }
    // if (PRESSED_KEY === 39 && this.x < canvas.width - PLAYER_STATE.playerSize) {
    //   this.x = this.x + 10;
    //   console.log(this.x);
    // }
    // if (PRESSED_KEY === 38 && this.y > 300) {
    //   this.y = this.y - 10;
    // }
    // if (
    //   PRESSED_KEY === 40 &&
    //   this.y < canvas.height - PLAYER_STATE.playerSize
    // ) {
    //   this.y = this.y + 10;
    // }
    this.draw();
  }
}

let LEFT = false;
let RIGHT = false;
// const UP = 38;
// const DOWN = 40;
const speed = 3;

const img = new Image();
img.src = "../data/PNG/playerShip1_blue.png";
const PLAYER_STATE = {
  playerX: 400,
  playerY: 500,
  playerSize: 60,
};

document.onkeydown = (e) => {
  if (e.keyCode === 37) LEFT = true;
  if (e.keyCode === 39) RIGHT = true;
};
document.onkeyup = (e) => {
  if (e.keyCode === 37) LEFT = false;
  if (e.keyCode === 39) RIGHT = false;
};

function move() {
  if (LEFT) PLAYER_STATE.playerX -= speed;
  if (RIGHT) PLAYER_STATE.playerX += speed;
  console.log("123");
}

document.addEventListener("keyup", (e) => {});

const player = new Player(
  PLAYER_STATE.playerX - PLAYER_STATE.playerSize / 2,
  PLAYER_STATE.playerY,
  PLAYER_STATE.playerSize,
  "red"
);

function animate() {
  requestAnimationFrame(animate);
  player.update();
}
animate();
