//Player------------------------------------------------------
const playerImg = new Image();
playerImg.src = "./img/PNG/playerShip1_blue.png";

//Enemies------------------------------------------------------
const enemy1 = new Image();
enemy1.src = "./img/PNG/Enemies/enemyBlack1.png";
const enemy2 = new Image();
enemy2.src = "./img/PNG/Enemies/enemyBlack2.png";
const enemy3 = new Image();
enemy3.src = "./img/PNG/Enemies/enemyBlack3.png";
const enemy4 = new Image();
enemy4.src = "./img/PNG/Enemies/enemyBlack4.png";
const enemy5 = new Image();
enemy5.src = "./img/PNG/Enemies/enemyBlack5.png";

//Lasers------------------------------------------------------
const playerLaserImg = new Image();
playerLaserImg.src = "./img/PNG/Lasers/laserBlue01.png";
const enemyLaserImg = new Image();
enemyLaserImg.src = "./img/PNG/Lasers/laserPurple01.png";

//PowerUps------------------------------------------------------
const pow1 = new Image();
pow1.src = "./img/PNG/Power-ups/powerupBlue_star.png";
const pow2 = new Image();
pow2.src = "./img/PNG/Power-ups/powerupBlue_shield.png";
const pow3 = new Image();
pow3.src = "./img/PNG/Power-ups/powerupBlue_bolt.png";
const powerImgArr = [pow1, pow2, pow3];

//Shield------------------------------------------------------
const shield = new Image();
shield.src = "../img/PNG/Effects/shield3.png";

//Meteors------------------------------------------------------
const meteor1 = new Image();
meteor1.src = "./img/PNG/Meteors/meteorBrown_big1.png";
const meteor2 = new Image();
meteor2.src = "./img/PNG/Meteors/meteorBrown_big2.png";
const meteor3 = new Image();
meteor3.src = "./img/PNG/Meteors/meteorBrown_big3.png";
const meteorsImgArr = [meteor1, meteor2, meteor3];

//Icons------------------------------------------------------
const shieldIcon = new Image();
shieldIcon.src = "./img/PNG/Power-ups/shield_silver.png";
const healthIcon = new Image();
healthIcon.src = "./img/PNG/UI/playerLife1_blue.png";

//Numeral------------------------------------------------------
const numeral0 = new Image();
numeral0.src = "./img/PNG/UI/numeral0.png";
const numeral1 = new Image();
numeral1.src = "./img/PNG/UI/numeral1.png";
const numeral2 = new Image();
numeral2.src = "./img/PNG/UI/numeral2.png";
const numeral3 = new Image();
numeral3.src = "./img/PNG/UI/numeral3.png";
const numeral4 = new Image();
numeral4.src = "./img/PNG/UI/numeral4.png";
const numeral5 = new Image();
numeral5.src = "./img/PNG/UI/numeral5.png";
const numeral6 = new Image();
numeral6.src = "./img/PNG/UI/numeral6.png";
const numeral7 = new Image();
numeral7.src = "./img/PNG/UI/numeral7.png";
const numeral8 = new Image();
numeral8.src = "./img/PNG/UI/numeral8.png";
const numeral9 = new Image();
numeral9.src = "./img/PNG/UI/numeral9.png";

//Levels------------------------------------------------------
const lvlOne = [
  {
    x: 270,
    y: 80,
    img: enemy1,
  },
  {
    x: 470,
    y: 80,
    img: enemy1,
  },
];

const lvlThree = [
  {
    x: 370,
    y: 140,
    img: enemy4,
  },
  {
    x: 370,
    y: 80,
    img: enemy5,
  },
  {
    x: 270,
    y: 80,
    img: enemy3,
  },
  {
    x: 470,
    y: 80,
    img: enemy3,
  },
];

const lvlFive = [
  {
    x: 270,
    y: 140,
    img: enemy5,
  },
  {
    x: 470,
    y: 140,
    img: enemy5,
  },
  {
    x: 270,
    y: 80,
    img: enemy3,
  },
  {
    x: 470,
    y: 80,
    img: enemy3,
  },
  {
    x: 170,
    y: 80,
    img: enemy2,
  },
  {
    x: 570,
    y: 80,
    img: enemy2,
  },
];
const lvlSeven = [
  {
    x: 370,
    y: 140,
    img: enemy4,
  },
  {
    x: 270,
    y: 140,
    img: enemy5,
  },
  {
    x: 470,
    y: 140,
    img: enemy5,
  },
  {
    x: 370,
    y: 80,
    img: enemy4,
  },
  {
    x: 270,
    y: 80,
    img: enemy3,
  },
  {
    x: 470,
    y: 80,
    img: enemy3,
  },
  {
    x: 170,
    y: 80,
    img: enemy2,
  },
  {
    x: 570,
    y: 80,
    img: enemy2,
  },
];
const lvlNine = [
  {
    x: 370,
    y: 140,
    img: enemy4,
  },
  {
    x: 270,
    y: 140,
    img: enemy5,
  },
  {
    x: 470,
    y: 140,
    img: enemy5,
  },
  {
    x: 570,
    y: 140,
    img: enemy1,
  },
  {
    x: 170,
    y: 140,
    img: enemy1,
  },
  {
    x: 370,
    y: 80,
    img: enemy4,
  },
  {
    x: 270,
    y: 80,
    img: enemy2,
  },
  {
    x: 470,
    y: 80,
    img: enemy2,
  },
  {
    x: 170,
    y: 80,
    img: enemy1,
  },
  {
    x: 570,
    y: 80,
    img: enemy1,
  },
];
