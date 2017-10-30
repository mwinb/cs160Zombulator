// http://tinyurl.com/cs160ex15
// Zombulator by MICHAEL WINBERRY
// CS 160 Exercise 15: Objects

var backgroundColor;

const MIN_SIZE = 5;
const MAX_SIZE = 50;
const NUMBER_OF_ZOMBIES = 100;
const NUMBER_OF_HUMANS = 100;

var zombies = [];

var humans = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(245, 255, 245);
  initializeZombies();
  initializeHumans();
}

function draw() {
  background(backgroundColor);
  noStroke();
  drawZombies();
  drawHumans();
  moveHumans();
  moveZombies();
}


// Zombies. Raaahh!

function initializeZombies() {
  for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
    zombies[i] = initializeZombie();
  }
}

function initializeZombie(index) {
  return {
    x: random(0, windowWidth),
    y: random(0, 200),
    size: random(MIN_SIZE, MAX_SIZE),
    color: color(random(100, 255), random(50, 150), random(50, 150), 150),
    speed: random(.5, 1),
    draw: function () {
    },
    move: function () {
    }
  };
}

function drawZombies() {
  for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
    drawZombie(zombies[i]);
  }
}

function drawZombie(zombie) {
  fill(zombie.color);
  ellipse(zombie.x, zombie.y, zombie.size, zombie.size);
}

function moveZombies() {
    for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
        moveZombie(zombies[i]);
    }
}

function moveZombie(zombie) {
    zombie.y += zombie.speed;
    zombie.y += random(-1, 1);
    zombie.x += random(-2,2);
}


// Humans. Mmmm brains!

function initializeHumans() {
  humans = [];
  for (var i = 0; i < NUMBER_OF_HUMANS; ++i) {
    initializeHuman(i);
  }
}

function initializeHuman(index) {
  humans[index] = {
      x: random(0, windowWidth),
      y: random(windowHeight - 200, windowHeight),
      size: random(MIN_SIZE, MAX_SIZE),
      color: color(random(50, 150), random(50, 150), random(150, 255), 150),
      speed: random(.5,1)
  };
}

function drawHumans() {
  for (var i = 0; i < NUMBER_OF_HUMANS; ++i) {
    drawHuman(humans[i]);
  }
}

function drawHuman(human) {
  fill(human.color);
  ellipse(human.x, human.y, human.size, human.size);
}

function moveHumans() {
    for (var i = 0; i < NUMBER_OF_HUMANS; ++ i) {
        moveHuman(humans[i]);
    }
}

function moveHuman(human) {
    human.y -= human.speed;
    human.x += random(-2,2);
    human.y -= random(-1,1);
}
    
