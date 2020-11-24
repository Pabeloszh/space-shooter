const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const playerImg = new Image();
playerImg.src = "../data/PNG/playerShip1_blue.png";
const playerLaserImg = new Image();
playerLaserImg.src = "../data/PNG/Lasers/laserBlue01.png";
const healthIcon = new Image();
healthIcon.src = "../data/PNG/UI/playerLife1_blue.png";
const enemyLaserImg = new Image();
enemyLaserImg.src = "../data/PNG/Lasers/laserPurple01.png";
const numeral0 = new Image();
numeral0.src = "../data/PNG/UI/numeral0.png";
const numeral1 = new Image();
numeral1.src = "../data/PNG/UI/numeral1.png";
const numeral2 = new Image();
numeral2.src = "../data/PNG/UI/numeral2.png";
const numeral3 = new Image();
numeral3.src = "../data/PNG/UI/numeral3.png";
const numeral4 = new Image();
numeral4.src = "../data/PNG/UI/numeral4.png";
const numeral5 = new Image();
numeral5.src = "../data/PNG/UI/numeral5.png";
const numeral6 = new Image();
numeral6.src = "../data/PNG/UI/numeral6.png";
const numeral7 = new Image();
numeral7.src = "../data/PNG/UI/numeral7.png";
const numeral8 = new Image();
numeral8.src = "../data/PNG/UI/numeral8.png";
const numeral9 = new Image();
numeral9.src = "../data/PNG/UI/numeral9.png";

let LEVEL = 1;

//PLAYER
const PLAYER_STATE = {
  playerX: 400,
  playerY: 500,
  playerSize: 60,
  playerSpeed: 8,
  // laserVelocity: 10,
};
let HEALTH = 3;

let SCORE = 0;
let LEFT = false,
  RIGHT = false,
  UP = false,
  DOWN = false,
  SHOOT = false;
var keyAllowed = {};

//ENEMY

let enemies = [];
let COOLDOWN = false;

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

//PlayerLaser------------------------------------------------------
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
          laser.y <= enemy.dy + enemy.size &&
          laser.y > enemy.size &&
          enemy.dy === enemy.y
        ) {
          enemies.splice(i, 1);
          player.bullets.splice(player.bullets.indexOf(laser), 1);
          SCORE += 100;
        }
      });
    });

    this.draw();
  }
}

//Enemies------------------------------------------------------
class Enemy {
  constructor(x, y, size, speed, img) {
    this.x = x;
    this.y = y;
    this.dy = this.y - 200;
    this.size = size;
    this.speed = speed;
    this.img = img;
    this.enemyBullets = [];
    this.randomizeShooting = [];
  }
  draw() {
    c.beginPath();
    c.drawImage(this.img, this.x, this.dy, this.size, 40);
  }
  update() {
    if (this.x < 30 || this.x > canvas.width - this.size - 30) {
      this.speed = -this.speed;
    }
    if (this.y > this.dy) {
      this.dy += 5;
    }
    if (this.y === this.dy) {
      this.x -= this.speed;
    }

    let RANDOM_BOOL = Math.random() <= 0.5;
    this.randomizeShooting.push(RANDOM_BOOL);

    this.draw();
  }
  shoot() {
    if (
      COOLDOWN &&
      this.randomizeShooting[this.randomizeShooting.length - 1] &&
      this.y === this.dy
    ) {
      const enemyLaser = new EnemyLaser(
        this.x - 5 + this.size / 2,
        this.y,
        10,
        20
      );
      this.enemyBullets.push(enemyLaser);
    }

    for (var i = this.enemyBullets.length - 1; i >= 0; i--) {
      let enemyBullet = this.enemyBullets[i];
      if (enemyBullet.y > canvas.height) {
        this.enemyBullets.splice(i, 1);
      }
      enemyBullet.update();
    }
  }
}

//EnemyLaser------------------------------------------------------
class EnemyLaser {
  constructor(x, y, size, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.drawImage(enemyLaserImg, this.x, this.y, this.size, 40);
  }
  update() {
    this.y = this.y + 5;
    enemies.forEach((enemy) => {
      enemy.enemyBullets.forEach((bullet) => {
        if (
          // bullet.y === player.y &&
          bullet.y >= player.y &&
          bullet.y <= player.y + player.size &&
          bullet.x > player.x &&
          bullet.x < player.x + player.size
        ) {
          enemy.enemyBullets.splice(enemy.enemyBullets.indexOf(bullet), 1);
          HEALTH--;
        }
      });
    });
    this.draw();
  }
}



//Meteors------------------------------------------------------
class Meteors {
  constructor(x, y, size, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = velocity;
    draw(){

    }
    update(){
      this.draw()
    }
  }
}



//LevelChanging------------------------------------------------------
setInterval(() => {
  if (enemies.length === 0 && LEVEL === 1) {
    lvlOne.forEach((lvl) => {
      const enemy = new Enemy(
        lvl.x,
        lvl.y,
        PLAYER_STATE.playerSize,
        2,
        lvl.img
      );
      enemies.push(enemy);
    });
    LEVEL = 2;
  } else if (enemies.length === 0 && LEVEL === 2) {
    lvlTwo.forEach((lvl) => {
      const enemy = new Enemy(
        lvl.x,
        lvl.y,
        PLAYER_STATE.playerSize,
        2,
        lvl.img
      );
      enemies.push(enemy);
    });
    LEVEL = 3;
  }
}, 2000);

//Gui------------------------------------------------------
class Game {
  constructor() {
    this.x = 60;
    this.y = 20;
  }
  health() {
    c.beginPath();
    switch (HEALTH) {
      case 3:
        c.drawImage(healthIcon, this.x, this.y, 20, 20);
        c.drawImage(healthIcon, this.x + 25, this.y, 20, 20);
        c.drawImage(healthIcon, this.x + 50, this.y, 20, 20);
        break;
      case 2:
        c.drawImage(healthIcon, this.x, this.y, 20, 20);
        c.drawImage(healthIcon, this.x + 25, this.y, 20, 20);
        break;
      case 1:
        c.drawImage(healthIcon, this.x, this.y, 20, 20);
        break;
    }
  }
  level() {
    c.font = "20px Arial";
    c.textAlign = "center";
    c.fillStyle = "white";
    c.fillText(`Level: ${LEVEL - 1}`, canvas.width / 2, this.y + 15);
  }
  score() {
    c.beginPath();
    c.drawImage(numeral0, canvas.width - this.x, this.y, 20, 20);
    if (SCORE) {
      c.drawImage(numeral0, canvas.width - this.x - 20, this.y, 20, 20);
      let arr = [],
        sNumber = SCORE.toString();

      for (var i = 0, len = sNumber.length; i < len; i += 1) {
        arr.push(+sNumber.charAt(i));
      }
      arr.reverse();
      switch (arr[2]) {
        case 0:
          c.drawImage(numeral0, canvas.width - this.x - 40, this.y, 20, 20);
          break;
        case 1:
          c.drawImage(numeral1, canvas.width - this.x - 40, this.y, 20, 20);
          break;
        case 2:
          c.drawImage(numeral2, canvas.width - this.x - 40, this.y, 20, 20);
          break;
        case 3:
          c.drawImage(numeral3, canvas.width - this.x - 40, this.y, 20, 20);
          break;
        case 4:
          c.drawImage(numeral4, canvas.width - this.x - 40, this.y, 20, 20);
          break;
        case 5:
          c.drawImage(numeral5, canvas.width - this.x - 40, this.y, 20, 20);
          break;
        case 6:
          c.drawImage(numeral6, canvas.width - this.x - 40, this.y, 20, 20);
          break;
        case 7:
          c.drawImage(numeral7, canvas.width - this.x - 40, this.y, 20, 20);
          break;
        case 8:
          c.drawImage(numeral8, canvas.width - this.x - 40, this.y, 20, 20);
          break;
        case 9:
          c.drawImage(numeral9, canvas.width - this.x - 40, this.y, 20, 20);
          break;
      }
      switch (arr[3]) {
        case 1:
          c.drawImage(numeral1, canvas.width - this.x - 60, this.y, 20, 20);
          break;
        case 2:
          c.drawImage(numeral2, canvas.width - this.x - 60, this.y, 20, 20);
          break;
        case 3:
          c.drawImage(numeral3, canvas.width - this.x - 60, this.y, 20, 20);
          break;
        case 4:
          c.drawImage(numeral4, canvas.width - this.x - 60, this.y, 20, 20);
          break;
        case 5:
          c.drawImage(numeral5, canvas.width - this.x - 60, this.y, 20, 20);
          break;
        case 6:
          c.drawImage(numeral6, canvas.width - this.x - 60, this.y, 20, 20);
          break;
        case 7:
          c.drawImage(numeral7, canvas.width - this.x - 60, this.y, 20, 20);
          break;
        case 8:
          c.drawImage(numeral8, canvas.width - this.x - 60, this.y, 20, 20);
          break;
        case 9:
          c.drawImage(numeral9, canvas.width - this.x - 60, this.y, 20, 20);
          break;
      }
    }
  }

  gameover() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.font = "100px Arial";
    c.textAlign = "center";
    c.fillStyle = "white";
    c.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    c.font = "45px Arial";
    c.textAlign = "center";
    c.fillStyle = "white";
    c.fillText(`Score: ${SCORE}`, canvas.width / 2, canvas.height / 2 + 75);
  }
}
const game = new Game();

//Animate------------------------------------------------------
function animateGame() {
  if (HEALTH > 0) {
    requestAnimationFrame(animateGame);
    c.clearRect(0, 0, innerWidth, innerHeight);
    game.health();
    game.score();
    game.level();
    player.update();
    player.shoot();
    enemies.forEach((e) => {
      e.update();
      e.shoot();
    });
  } else {
    game.gameover();
  }
}

setInterval(() => {
  COOLDOWN = true;
  if (COOLDOWN) {
    setTimeout(() => {
      COOLDOWN = false;
    }, 10);
  }
}, 500);

//KIEDY ZA SZYBKO SIĘ RUSZYSZ TO BUG
animateGame();
