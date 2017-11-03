// http://tinyurl.com/cs160ex20
// Zombulator by Michael Winberry
// CS 160 Exercise 20: Collisions

var backgroundColor;

const MIN_SIZE = 5;
const MAX_SIZE = 50;
const POPULATION_SIZE = 500;

var population = [];

var zombieCount = 0;
var humanCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(245, 255, 245);
  initializePopulation();
}

function draw() {
  background(backgroundColor);
  noStroke();
  drawPopulation();
  movePopulation();
  drawPopulationCounts();
  checkCollision();
}

function initializePopulation() {
  for (var i = 0; i < POPULATION_SIZE; ++i) {
    var humanoid_type = random(0, 100);
    if (humanoid_type <= 50) {
      population[i] = initializeZombie();
      ++zombieCount;
    } else {
      population[i] = initializeHuman();
      ++humanCount;
    }
  }
}

function drawPopulationCounts() {
  stroke(0);
  textSize(72);
  textAlign(CENTER);
  text("Zombies: " + zombieCount, width / 2, 100);
  text("Humans: " + humanCount, width / 2, height - 100);
}

function drawPopulation() {
  for (var i = 0; i < POPULATION_SIZE; ++i) {
    population[i].draw();
  }
}

function movePopulation() {
  for (var i = 0; i < POPULATION_SIZE; ++i) {
    population[i].move();
  }
}

function initializeZombie() {
  return {
    type: "Zombie",
    alive: true,
    x: random(0, windowWidth),
    y: random(0, 200),
    speed: random(0.25, 3),
    size: random(MIN_SIZE, MAX_SIZE),
    color: color(random(66, 226), 244, random(66, 146), 150),
    move: function() {
      var direction = random(0, 100);
      if (direction < 20) {
        this.x += this.speed;
      } else if (direction < 40) {
        this.x -= this.speed;
      } else if (direction < 60) {
        this.y -= this.speed;
      } else {
        this.y += this.speed;
      }
    },
    draw: function() {
      if (this.alive == true) {
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
      }
    },
    isTouching: function(food) {
      var distance = dist(this.x, this.y, food.x, food.y);
      if (distance <= this.size/2 + food.size/2) {
        return true;
      } 
    }
  }
}

function initializeHuman() {
  return {
    type: "Human",
    alive: true,
    x: random(0, windowWidth),
    y: random(windowHeight - 200, windowHeight),
    speed: random(0.25, 3),
    size: random(MIN_SIZE, MAX_SIZE),
    color: color(random(50, 150), random(50, 150), random(150, 255), 150),
    move: function() {
        var direction = random(0, 100);
        if (direction < 20) {
          this.x += this.speed;
        } else if (direction < 40) {
          this.x -= this.speed;
        } else if (direction < 60) {
          this.y += this.speed;
        } else {
          this.y -= this.speed;
        }
      },
    draw: function() {
      if (this.alive == true) {
          fill(this.color);
          ellipse(this.x, this.y, this.size, this.size);
        }
    },
    isTouching: function(zombie) {
      var distance = dist(this.x, this.y, zombie.x, zombie.y);
      if (distance <= this.size/2 + zombie.size/2) {
        return true;
      }
    }
  }
}

function checkCollision () {
  for (var i = 0; i < POPULATION_SIZE; ++i) {
    var attacker = population[i];
    for (var j = i+1; j < POPULATION_SIZE; ++j) {
      var victim = population[j];
      if ( attacker.type != victim.type && attacker.isTouching(victim) == true && 
        attacker.alive == true && victim.alive == true) {
        var roll = random(0,100);
        if (roll < 25) {
          if(attacker.type == "Zombie") {
            attacker.alive = false;
            zombieCount--
          } else if (victim.type == "Zombie") {
            victim.alive = false;
            zombieCount--
          }
        } else if (roll > 25) {
          if(attacker.type == "Human") {
            attacker.alive = false;
            humanCount--
          } else if (victim.type == "Human" ) {
            victim.alive = false;
            humanCount--
          }
        }
        print("FIGHT!");
      }
    }
  }
}
