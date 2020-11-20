const game = document.querySelector(".game");
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

let LEFT = false;
let RIGHT = false;
let UP = false;
let DOWN = false;
let SHOOT = false;

//Key event------------------------------------------------------
document.onkeydown = (e) => {
  if (e.keyCode == 37) LEFT = true;
  if (e.keyCode == 39) RIGHT = true;
  if (e.keyCode == 38) UP = true;
  if (e.keyCode == 40) DOWN = true;
  if (e.keyCode == 32) {
    SHOOT = true;
  }
};
document.onkeyup = (e) => {
  if (e.keyCode == 37) LEFT = false;
  if (e.keyCode == 39) RIGHT = false;
  if (e.keyCode == 38) UP = false;
  if (e.keyCode == 40) DOWN = false;
  if (e.keyCode == 32) {
    SHOOT = false;
  }
};

//Player------------------------------------------------------
const PLAYER_STATE = {
  playerX: 400,
  playerY: 500,
  playerSize: 60,
  playerSpeed: 8,
  // laserVelocity: 10,
};

class Player {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    c.drawImage(playerImg, this.x, this.y, this.size, this.size);
  }

  update() {
    if (LEFT && this.x > 2) {
      this.x -= PLAYER_STATE.playerSpeed;
      PLAYER_STATE.playerX = this.x;
    }
    if (RIGHT && this.x < canvas.width - this.size - 2) {
      this.x += PLAYER_STATE.playerSpeed;
      PLAYER_STATE.playerX = this.x;
    }
    if (UP && this.y > 300) {
      this.y -= PLAYER_STATE.playerSpeed;
      PLAYER_STATE.playerY = this.y;
    }
    if (DOWN && this.y < canvas.height - this.size - 2) {
      this.y += PLAYER_STATE.playerSpeed;
      PLAYER_STATE.playerY = this.y;
    }

    this.draw();
  }
}

const playerImg = new Image();
playerImg.src = "../data/PNG/playerShip1_blue.png";

const player = new Player(
  PLAYER_STATE.playerX - PLAYER_STATE.playerSize / 2,
  PLAYER_STATE.playerY,
  PLAYER_STATE.playerSize
);

//Laser------------------------------------------------------
const playerLaserImg = new Image();
playerLaserImg.src = "../data/PNG/Lasers/laserBlue01.png";

class PlayerLaser {
  // constructor(x, y, size, velocity) {
  //   this.x = x;
  //   this.y = y;
  //   this.size = size;
  //   this.velocity = velocity;
  // }
  // draw() {
  //   c.beginPath();
  // }
}

//Animate------------------------------------------------------
function animate() {
  player.update();
  // if (SHOOT) {
  //   console.log(123);
  // }
  requestAnimationFrame(animate);
}
animate();
