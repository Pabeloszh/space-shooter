const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

let START = false;
let LEVEL = 1;
let SCORE = 0;

//PLAYER
const PLAYER_STATE = {
  playerX: 400,
  playerY: 500,
  playerSize: 60,
  playerSpeed: 8,
  laserVelocity: 5,
  shield: 0,
};
let HEALTH = 3;
let POWERUP_COOLDOWN = false;
let POWERUP_ARR = [];

let LEFT = false,
  RIGHT = false,
  UP = false,
  DOWN = false,
  SHOOT = false;
let keyAllowed = {};

//ENEMY
let ENEMIES_ARR = [];
let COOLDOWN = false;
//METEORS
let METEORS_ARR = [];

//Key event------------------------------------------------------
document.onkeydown = (e) => {
  if (e.keyCode == 37) LEFT = true;
  else if (e.keyCode == 39) RIGHT = true;
  else if (e.keyCode == 38) UP = true;
  else if (e.keyCode == 40) DOWN = true;
  else if (e.keyCode == 32) {
    if (keyAllowed[e.which] === false) return;
    keyAllowed[e.which] = false;
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
  } else if (e.keyCode == 13) {
    START = true;
    console.log(START);
  }
};

document.onfocus = (e) => {
  if (e.keyCode == 32) keyAllowed = {};
};

//Distance between two objects------------------------------------------------------
const distance = (x1, y1, s1, x2, y2, s2) => {
  if (x1 + s1 >= x2 && x1 <= x2 + s2 && y1 + s1 >= y2 && y1 <= y2 + s2) {
    return true;
  }
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
    if (PLAYER_STATE.shield) {
      c.drawImage(
        shield,
        this.x - 25,
        this.y - 30,
        this.size + 50,
        this.size + 50
      );
    }
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
        10,
        PLAYER_STATE.laserVelocity
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
    this.y -= this.velocity;
    ENEMIES_ARR.forEach((enemy, i) => {
      player.bullets.forEach((laser) => {
        if (
          distance(
            laser.x,
            laser.y,
            laser.size,
            enemy.x,
            enemy.y,
            enemy.size
          ) &&
          enemy.dy === enemy.y
        ) {
          ENEMIES_ARR.splice(i, 1);
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
    this.randomizeShooting;
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
    this.randomizeShooting = Math.random() <= 0.8;
    this.draw();
  }
  shoot() {
    if (COOLDOWN && this.randomizeShooting && this.y === this.dy) {
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
    ENEMIES_ARR.forEach((enemy) => {
      enemy.enemyBullets.forEach((bullet) => {
        if (
          distance(
            bullet.x,
            bullet.y,
            bullet.size,
            player.x,
            player.y,
            player.size
          )
        ) {
          enemy.enemyBullets.splice(enemy.enemyBullets.indexOf(bullet), 1);
          if (!PLAYER_STATE.shield) {
            HEALTH--;
          } else {
            PLAYER_STATE.shield--;
          }
        }
      });
    });
    this.draw();
  }
}

//Meteor------------------------------------------------------
class Meteor {
  constructor(x, y, size) {
    this.x = x;
    this.y = -y;
    this.size = size;
    this.img = meteorsImgArr[Math.floor(Math.random() * meteorsImgArr.length)];
  }
  draw() {
    c.beginPath();
    c.drawImage(this.img, this.x, this.y, this.size, this.size);
  }
  update() {
    for (let i = METEORS_ARR.length - 1; i >= 0; i--) {
      let mtr = METEORS_ARR[i];
      if (mtr.y > canvas.height) {
        METEORS_ARR.splice(i, 1);
      }
      if (distance(mtr.x, mtr.y, mtr.size, player.x, player.y, player.size)) {
        if (!PLAYER_STATE.shield) {
          HEALTH--;
        } else {
          PLAYER_STATE.shield--;
        }
        METEORS_ARR.splice(i, 1);
      }
    }

    this.y += 2;
    this.draw();
  }
}

//PowerUps------------------------------------------------------
class PowerUp {
  constructor() {
    this.x = Math.round(Math.random() * (canvas.width - 30 - 40)) + 30 + 40;
    this.y = -Math.round(Math.random() * canvas.height);
    this.type = Math.round(Math.random() * 2);
  }
  draw() {
    c.beginPath();
    c.drawImage(powerImgArr[this.type], this.x, this.y, 40, 40);
  }
  update() {
    this.y += 5;
    for (let i = POWERUP_ARR.length - 1; i >= 0; i--) {
      let pw = POWERUP_ARR[i];
      if (pw.y > canvas.height) {
        POWERUP_ARR.splice(i, 1);
        POWERUP_COOLDOWN = false;
      }
      if (distance(pw.x, pw.y, 40, player.x, player.y, player.size)) {
        POWERUP_ARR.splice(i, 1);
        if (pw.type === 0) {
          SCORE += 500;
        } else if (pw.type === 1) {
          PLAYER_STATE.shield += 3;
        } else if (pw.type === 2) {
          PLAYER_STATE.laserVelocity += 2;
        }
      }

      this.draw();
    }
  }
}

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
        c.drawImage(healthIcon, this.x - 20, this.y, 20, 20);
        c.drawImage(healthIcon, this.x - 20 + 25, this.y, 20, 20);
        c.drawImage(healthIcon, this.x - 20 + 50, this.y, 20, 20);
        if (PLAYER_STATE.shield) {
          c.drawImage(shieldIcon, this.x - 20 + 75, this.y, 20, 20);
        }
        break;
      case 2:
        c.drawImage(healthIcon, this.x - 20, this.y, 20, 20);
        c.drawImage(healthIcon, this.x - 20 + 25, this.y, 20, 20);
        break;
      case 1:
        c.drawImage(healthIcon, this.x - 20, this.y, 20, 20);
        break;
    }
  }
  level() {
    c.font = "20px Roboto";
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

  gameover(text) {
    c.clearRect(0, 0, innerWidth, innerHeight);

    c.font = `100px Roboto`;
    c.textAlign = "center";
    c.fillStyle = "white";
    c.fillText(text, canvas.width / 2, canvas.height / 2);
    c.font = "45px Roboto";
    c.textAlign = "center";
    c.fillStyle = "white";
    c.fillText(`Score: ${SCORE}`, canvas.width / 2, canvas.height / 2 + 75);
    var para = document.createElement("p");
    var node = document.createTextNode("This is new.");
    para.appendChild(node);
    canvas.appendChild(para);
  }
}
const game = new Game();

//LevelChanging------------------------------------------------------
const changeLevel = () => {
  if (ENEMIES_ARR.length === 0 && LEVEL === 1) {
    lvlOne.forEach((lvl) => {
      const enemy = new Enemy(
        lvl.x,
        lvl.y,
        PLAYER_STATE.playerSize,
        2,
        lvl.img
      );
      ENEMIES_ARR.push(enemy);
    });

    LEVEL++;
  } else if (ENEMIES_ARR.length === 0 && LEVEL === 2) {
    for (let i = 0; i < 15; i++) {
      let size = Math.floor(Math.random() * 60) + 20;
      let x = Math.floor(Math.random() * canvas.width - size) + size;
      let y = Math.floor(Math.random() * canvas.height - size) + size;
      METEORS_ARR.push(new Meteor(x, y, size));
    }

    LEVEL++;
  } else if (METEORS_ARR.length === 0 && LEVEL === 3) {
    lvlThree.forEach((lvl) => {
      const enemy = new Enemy(
        lvl.x,
        lvl.y,
        PLAYER_STATE.playerSize,
        2,
        lvl.img
      );
      ENEMIES_ARR.push(enemy);
    });

    LEVEL++;
  } else if (ENEMIES_ARR.length === 0 && LEVEL === 4) {
    for (let i = 0; i < 20; i++) {
      let size = Math.floor(Math.random() * 60) + 20;
      let x = Math.floor(Math.random() * canvas.width - size) + size;
      let y = Math.floor(Math.random() * canvas.height - size) + size;
      METEORS_ARR.push(new Meteor(x, y, size));
    }

    LEVEL++;
  } else if (METEORS_ARR.length === 0 && LEVEL === 5) {
    lvlFive.forEach((lvl) => {
      const enemy = new Enemy(
        lvl.x,
        lvl.y,
        PLAYER_STATE.playerSize,
        2,
        lvl.img
      );
      ENEMIES_ARR.push(enemy);
    });

    LEVEL++;
  } else if (ENEMIES_ARR.length === 0 && LEVEL === 6) {
    for (let i = 0; i < 25; i++) {
      let size = Math.floor(Math.random() * 60) + 20;
      let x = Math.floor(Math.random() * canvas.width - size) + size;
      let y = Math.floor(Math.random() * canvas.height - size) + size;
      METEORS_ARR.push(new Meteor(x, y, size));
    }

    LEVEL++;
  } else if (METEORS_ARR.length === 0 && LEVEL === 7) {
    lvlSeven.forEach((lvl) => {
      const enemy = new Enemy(
        lvl.x,
        lvl.y,
        PLAYER_STATE.playerSize,
        2,
        lvl.img
      );
      ENEMIES_ARR.push(enemy);
    });

    LEVEL++;
  } else if (ENEMIES_ARR.length === 0 && LEVEL === 8) {
    for (let i = 0; i < 30; i++) {
      let size = Math.floor(Math.random() * 60) + 20;
      let x = Math.floor(Math.random() * canvas.width - size) + size;
      let y = Math.floor(Math.random() * canvas.height - size) + size;
      METEORS_ARR.push(new Meteor(x, y, size));
    }

    LEVEL++;
  } else if (METEORS_ARR.length === 0 && LEVEL === 9) {
    lvlNine.forEach((lvl) => {
      const enemy = new Enemy(
        lvl.x,
        lvl.y,
        PLAYER_STATE.playerSize,
        2,
        lvl.img
      );
      ENEMIES_ARR.push(enemy);
    });

    LEVEL++;
  } else if (ENEMIES_ARR.length === 0 && LEVEL === 10) {
    for (let i = 0; i < 30; i++) {
      let size = Math.floor(Math.random() * 60) + 20;
      let x = Math.floor(Math.random() * canvas.width - size) + size;
      let y = Math.floor(Math.random() * canvas.height - size) + size;
      METEORS_ARR.push(new Meteor(x, y, size));
    }
    LEVEL++;
  }
};

//Cooldown
setInterval(() => {
  if (!POWERUP_COOLDOWN) {
    POWERUP_COOLDOWN = Math.random() <= 0.8;
  } else {
    POWERUP_ARR.push(new PowerUp());
  }
}, 2000);

setInterval(() => {
  COOLDOWN = true;
  if (COOLDOWN) {
    setTimeout(() => {
      COOLDOWN = false;
    }, 10);
  }
}, 500);

//Animate------------------------------------------------------
function animateGame() {
  if (HEALTH > 0) {
    requestAnimationFrame(animateGame);
    console.log(START);
    c.clearRect(0, 0, innerWidth, innerHeight);
    game.health();
    game.score();
    game.level();
    player.update();
    player.shoot();
    POWERUP_ARR.forEach((e) => {
      e.update();
    });
    ENEMIES_ARR.forEach((e) => {
      e.update();
      e.shoot();
    });
    METEORS_ARR.forEach((e) => {
      e.update();
    });
    if (LEVEL > 10 && METEORS_ARR.length === 0) {
      game.gameover("You Won");
    }
  } else if (HEALTH === 0) {
    game.gameover("You Died");
  }
  changeLevel();
}

animateGame();
