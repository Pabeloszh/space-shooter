const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//PLAYER
const playerImg = new Image();
playerImg.src = "../data/PNG/playerShip1_blue.png";
const playerLaserImg = new Image();
playerLaserImg.src = "../data/PNG/Lasers/laserBlue01.png";
const PLAYER_STATE = {
  playerX: 400,
  playerY: 500,
  playerSize: 60,
  playerSpeed: 8,
  // laserVelocity: 10,
};
let LEFT = false,
  RIGHT = false,
  UP = false,
  DOWN = false,
  SHOOT = false;
var keyAllowed = {};

//ENEMY
const enemyImg = new Image();
enemyImg.src = "../data/PNG/Enemies/enemyBlack1.png";
let enemies = [];

//Key event------------------------------------------------------
document.onkeydown = (e) => {
  if (e.keyCode == 37) LEFT = true;
  else if (e.keyCode == 39) RIGHT = true;
  else if (e.keyCode == 38) UP = true;
  else if (e.keyCode == 40) DOWN = true;
  else if (e.keyCode == 32) {
    if (keyAllowed[e.which] === false) return;
    keyAllowed[e.which] = false;
    // code to be executed goes here
    SHOOT = true;
  }
};
document.onkeyup = (e) => {
  if (e.keyCode == 37) LEFT = false;
  if (e.keyCode == 39) RIGHT = false;
  if (e.keyCode == 38) UP = false;
  if (e.keyCode == 40) DOWN = false;
  if (e.keyCode == 32) {
    keyAllowed[e.which] = true;
  }
};

document.onfocus = (e) => {
  if (e.keyCode == 32) keyAllowed = {};
};

//Player------------------------------------------------------

class Player {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.bullets = [];
  }

  draw() {
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
  shoot() {
    if (SHOOT) {
      const playerLaser = new PlayerLaser(
        this.x - 5 + this.size / 2,
        this.y,
        10
      );
      this.bullets.push(playerLaser);
      setTimeout(() => {
        SHOOT = false;
      }, 5);
    }

    for (var i = this.bullets.length - 1; i >= 0; i--) {
      var bullet = this.bullets[i];
      if (bullet.y < 0) {
        this.bullets.splice(i, 1);
      }

      bullet.update();
    }
  }
}

const player = new Player(
  PLAYER_STATE.playerX - PLAYER_STATE.playerSize / 2,
  PLAYER_STATE.playerY,
  PLAYER_STATE.playerSize
);

//Laser------------------------------------------------------
class PlayerLaser {
  constructor(x, y, size, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.drawImage(playerLaserImg, this.x, this.y, this.size, 40);
  }
  update() {
    this.y -= 5;
    enemies.forEach((enemy, i) => {
      player.bullets.forEach((laser) => {
        if (
          laser.x > enemy.x &&
          laser.x < enemy.x + enemy.size &&
          laser.y === enemy.y + enemy.size
        ) {
          console.log(enemies[i]);
          enemies.splice(i, 1);
        }
      });
    });

    this.draw();
  }
}

//Enemies------------------------------------------------------

class Enemy {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.enemyBullets = [];
    this.speed = speed;
  }
  draw() {
    c.beginPath();
    c.drawImage(enemyImg, this.x, this.y, this.size, 40);
  }
  update() {
    if (this.x < 30 || this.x > canvas.width - this.size - 30) {
      this.speed = -this.speed;
    }
    this.x -= this.speed;

    this.draw();
  }
  shoot() {
    const enemyLaser = new EnemyLaser(300, 300, 10, 20);
    this.enemyBullets.push(enemyLaser);
    for (var i = this.enemyBullets.length - 1; i >= 0; i--) {
      enemyLaser.draw();
    }
  }
}

//EnemyLaser
class EnemyLaser {
  constructor(x, y, size, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.fillRect(this.x, this.y, this.size, this.size);
    console.log(c.fillRect(this.x, this.y, this.size, this.size));
  }
  update() {
    this.y += 5;
    this.draw();
  }
}

const firstLvlEnemies = [
  {
    x: 400 - 30,
    y: 10,
  },
  {
    x: 400 - 30 - 100,
    y: 10,
  },
  {
    x: 400 - 30 + 100,
    y: 10,
  },
];

firstLvlEnemies.forEach((first) => {
  const enemy = new Enemy(first.x, first.y, PLAYER_STATE.playerSize, 2);
  enemies.push(enemy);
});

//Animate------------------------------------------------------
function animateGame() {
  requestAnimationFrame(animateGame);
  c.clearRect(0, 0, innerWidth, innerHeight);
  player.update();
  player.shoot();

  enemies.forEach((e) => {
    e.update();
  });
}

function enemiesShots() {
  setInterval(() => {
    enemies.forEach((e) => {
      e.shoot();
    });
  }, 3000);
}

animateGame();
enemiesShots();
