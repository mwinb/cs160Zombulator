// Zombulator by Michael Winberry
// CS 160 Exercise 12: Function practice. Preamble to arrays.

var backgroundColor;

const MIN_SIZE = 10; // old browser? change to var.
const MAX_SIZE = 30;
const NUM_ZOMBIES = 300;
const NUM_HUMANS = 500;

var humanXs = [];
var humanColors = [];
var humanSizes = [];
var humanYs = [];

var zombieColors = [];
var zombieSizes = [];
var zombieXs = [];
var zombieYs = [];

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
}

function initializeZombies() {
  for (var i = 0; i < NUM_ZOMBIES; ++i) {
    initializeZombie(i);
  }
}

function initializeHumans() {
  // raaaawwwwwrrr!
  for (var i = 0; i < NUM_HUMANS; ++i) {
    initializeHuman(i);
  }
}

function drawZombies() {
  for ( var i = 0; i < NUM_ZOMBIES; ++i ) { 
    fill(zombieColors[i]);
    ellipse(zombieXs[i], zombieYs[i], zombieSizes[i], zombieSizes[i]);
  }
}

function drawHumans() {
  for ( var i = 0; i < NUM_HUMANS; ++i ) {
    fill(humanColors[i]);
    ellipse(humanXs[i], humanYs[i], humanSizes[i], humanSizes[i]);
  }
}

function initializeZombie(index) {
    zombieXs[index] = (random( 0, windowWidth));
    zombieYs[index] = (random(0,200));
    zombieSizes[index] = (random(MIN_SIZE, MAX_SIZE));
    zombieColors[index] = (color(random(50,255), random(50,255), random(50, 255), 150));
}

function initializeHuman(index) {
    humanXs[index] = (random(0, windowWidth));
    humanYs[index] = (random(windowHeight - 200, windowHeight));
    humanSizes[index] = (random(MIN_SIZE, MAX_SIZE));
    humanColors[index] = (color(random(0,155), random(155,255), 0, 200));
}
