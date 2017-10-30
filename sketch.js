// http://tinyurl.com/cs160ex15
// Zombulator by MICHAEL WINBERRY
// CS 160 Exercise 15: Objects

var backgroundColor;

const MIN_SIZE = 5;
const MAX_SIZE = 50;
const NUMBER_OF_ZOMBIES = 100;
const NUMBER_OF_HUMANS = 100;

var zombies;

var humans;

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
  zombies = [];
  for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
    zombies[i] = initializeZombie();
  }
}

function initializeZombie() {
  return {
    x: random(0, windowWidth),
    y: random(0, 200),
    size: random(MIN_SIZE, MAX_SIZE),
    color: color(random(100, 255), random(50, 150), random(50, 150), 150),
    speed: random(.5, 1),
    draw: function () {
      fill(this.color);
      ellipse(this.x, this.y, this.size, this.size);
    },
    move: function () {
      this.y += this.speed;
      this.y += random(-1, 1);
      this.x += random(-2,2);
    }
  };
}

function drawZombies() {
  for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
    zombies[i].draw();
  }
}


function moveZombies() {
  for (var i = 0; i < NUMBER_OF_ZOMBIES; ++i) {
    zombies[i].move();
  }
}


// Humans. Mmmm brains!

function initializeHumans() {
  humans = [];
  for (var i = 0; i < NUMBER_OF_HUMANS; ++i) {
    humans[i] = initializeHuman();
  }
}

function initializeHuman() {
  return {
    x: random(0, windowWidth),
    y: random(windowHeight - 200, windowHeight),
    size: random(MIN_SIZE, MAX_SIZE),
    color: color(random(50, 150), random(50, 150), random(150, 255), 150),
    speed: random(.5,1),
    draw: function() {
      fill(this.color);
      ellipse(this.x, this.y, this.size, this.size);
      
    },
    move: function() {
      this.y -= this.speed;
      this.x += random(-2,2);
      this.y -= random(-1,1);
    }
  };
}

function drawHumans() {
  for (var i = 0; i < NUMBER_OF_HUMANS; ++i) {
    humans[i].draw();
  }
}


function moveHumans() {
  for (var i = 0; i < NUMBER_OF_HUMANS; ++ i) {
    humans[i].move();
  }
}


