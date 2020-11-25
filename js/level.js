//Enemies
const enemy1 = new Image();
enemy1.src = "../data/PNG/Enemies/enemyBlack1.png";
const enemy2 = new Image();
enemy2.src = "../data/PNG/Enemies/enemyBlack2.png";
const enemy3 = new Image();
enemy3.src = "../data/PNG/Enemies/enemyBlack3.png";
const enemy4 = new Image();
enemy4.src = "../data/PNG/Enemies/enemyBlack4.png";
const enemy5 = new Image();
enemy5.src = "../data/PNG/Enemies/enemyBlack5.png";

//Meteors
const meteor1 = new Image();
meteor1.src = "../data/PNG/Meteors/meteorBrown_big1.png";
const meteor2 = new Image();
meteor2.src = "../data/PNG/Meteors/meteorBrown_big2.png";
const meteor3 = new Image();
meteor3.src = "../data/PNG/Meteors/meteorBrown_big3.png";
const meteorsArr = [meteor1, meteor2, meteor3];

const lvlOne = [
  {
    x: 400 - 30 - 100,
    y: 80,
    img: enemy1,
  },
  {
    x: 400 - 30 + 100,
    y: 80,
    img: enemy1,
  },
];

const lvlThree = [
  {
    x: 400 - 30,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 - 100,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 + 100,
    y: 80,
    img: enemy2,
  },
];

const lvlFive = [
  {
    x: 400 - 30 - 100,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30 + 100,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30 - 100,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 + 100,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 - 200,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 + 200,
    y: 80,
    img: enemy2,
  },
];
const lvlSeven = [
  {
    x: 400 - 30,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30 - 100,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30 + 100,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 - 100,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 + 100,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 - 200,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 + 200,
    y: 80,
    img: enemy2,
  },
];
const lvlNine = [
  {
    x: 400 - 30,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30 - 100,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30 + 100,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30 - 200,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30 + 200,
    y: 140,
    img: enemy2,
  },
  {
    x: 400 - 30,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 - 100,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 + 100,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 - 200,
    y: 80,
    img: enemy2,
  },
  {
    x: 400 - 30 + 200,
    y: 80,
    img: enemy2,
  },
];
