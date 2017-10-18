// Zombulator by Michael Winberry
// CS 160 Exercise 12: Function practice. Preamble to arrays.

var backgroundColor;

const MIN_SIZE = 25; // old browser? change to var.
const MAX_SIZE = 150;
const NUM_ZOMBIES = 300;
const NUM_HUMANS = 500;


var zombieX;
var zombieY;
var zombieSize;
var zombieColor;

var humanX;
var humanY;
var humanSize;
var humanColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(245, 255, 245);
  initializeZombie();
  initializeHuman();
}
 
function draw() {
  background(backgroundColor);
  noStroke();
 
  drawZombie();
  drawHuman();
}

function initializeZombie() {
  zombieX = random(0, windowWidth);
  zombieY = random(0, 200);
  zombieSize = random(MIN_SIZE, MAX_SIZE);
  zombieColor = color(random(50, 255), random(50, 255), random(50, 255), 150);
}

function initializeHuman() {
  // raaaawwwwwrrr!
  humanX = random(0, windowWidth);
  humanY = random(windowHeight - 200, windowHeight);
  humanSize = random(MIN_SIZE, MAX_SIZE);
  humanColor = color(random(0,155), random(155,255), 0, 200);
}

function drawZombie() {
  fill(zombieColor);
  ellipse(zombieX, zombieY, zombieSize, zombieSize);
}

function drawHuman() {
  // mmmm braaaiiiiinss!
  fill(humanColor);
  ellipse(humanX, humanY, humanSize, humanSize);
}
