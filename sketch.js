// http://tinyurl.com/cs160ex20
// Zombulator by Michael Winberry
// CS 160 Exercise 20: Collisions

var backgroundColor;

const MIN_SIZE = 25;
const MAX_SIZE = 50;
const POPULATION_SIZE = 500;

var population = [];
var deadPop = [];

var zombieCount = 0;
var humanCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(0, 0, 0);
  initializePopulation();
}

function draw() {
  background(backgroundColor);
  noStroke();
  drawPopulation();
  movePopulation();
  checkCollision();
  drawPopulationCounts();
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
  textSize(50);
  textAlign(CENTER);
  text("Zombies: " + zombieCount, width / 2, 100);
  text("Humans: " + humanCount, width / 2, height - 100);
}

function drawPopulation() {
  for (var i = 0; i < POPULATION_SIZE; ++i) {
    if(population[i].alive == true) {
      population[i].draw();
    }
  }
  if (deadPop.length > 0) {
    for (var i = 0; i < deadPop.length; ++i) {
      deadPop[i].draw();
    }
  }
}

function movePopulation() {
  for (var i = 0; i < POPULATION_SIZE; ++i) {
    if(population[i].alive == true) {
      population[i].move();
    }
  }
  if (deadPop.length > 0) {
    for (var i = 0; i < deadPop.length; ++i) {
      deadPop[i].move();
    }
  }
}


function initializeHuman() {
  var humanType = "Human";
  var humanX = random(0, windowWidth);
  var humanY = random(windowHeight-200, windowHeight);
  var humanColor = color(random(50, 150), random(50, 150), random(150, 255), 150);
  return initializeHumanoid(humanType,humanX, humanY, humanColor);
}


function initializeZombie() {
  var zombieType = "Zombie";
  var zombieX = random(0, windowWidth);
  var zombieY = random(0,200);
  var zombieColor = color(random(66, 226), 244, random(66, 146), 150);
  return initializeHumanoid(zombieType, zombieX,  zombieY, zombieColor);
}

function initializeHumanoid(humaniodType, humanoidX, humanoidY, humanoidColor) {
  return {
    type: humaniodType,
    alive: true,
    x : humanoidX,
    y : humanoidY,
    color: humanoidColor,
    size: random(MIN_SIZE, MAX_SIZE),
    speed: random(0.25, 4),
    move: function () {
      if (this.type == "Human") {
        this.y -= this.speed;
        this.x += random(-2,2);
        this.y -= random(-1,1);
      } else {
        this.y += this.speed;
        this.x -= random(-2,2);
        this.y += random(-2,2);
      }
    },
    draw: function() {
      if (this.type == "Human") {
        if (this.y <= 0 || this.y >= windowHeight) {
          this.speed = -this.speed;
        }
        if (this.x + this.size/2 > windowWidth) {
          this.x = this.x - this.size;
        }

        if (this.x + this.size/2 < 0 ) {
          this.x = this.x + this.size;
        }

        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);

      } else {
        if (this.y <= 0 || this.y >= windowHeight) {
          this.speed = -this.speed;
        }
        if (this.x + this.size/2 > windowWidth) {
          this.x = this.x - this.size;
        }

        if (this.x + this.size/2 < 0 ) {
          this.x = this.x + this.size;
        }

        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);

      }
    },
    isTouching: function(victim) {
      var distance = dist(this.x, this.y, victim.x, victim.y);
      if (distance <= this.size/2 + victim.size/2) {
        return true;
      }
    },
    turnType: function () {
      if(this.type == "Human") {
        this.type = "Zombie";
        this.color = color(random(66, 226), 244, random(66, 146), 150);
      } else {
        this.type = "Human";
        this.color = color(random(66, 226), 244, random(66, 146), 150);
      }
    },
    turnDead: function () {
      this.alive = false;
      for (var i = 0; i < 5; ++i) {
        var tempDead = initializeDeath(this.x, this.y, this.color);
        deadPop.push(tempDead);
      }
    }
  }
}

function initializeDeath(deceasedX, deceasedY, deceasedColor) {
  return {
    type: function () {
      return "Dead";
    },
    x: deceasedX,
    y: deceasedY,
    speed: random(2,5),
    size: random(3,5),
    color: deceasedColor,
    move: function() {
      this.y += this.speed;
      this.x -= random(-2,2);
      this.y += random(-2,2)
    },
    draw: function () {
      if (this.x + this.size/2 > windowWidth) {
        this.x = this.x - this.size;
      }

      if (this.x + this.size/2 < 0 ) {
        this.x = this.x + this.size;
      }

      fill(this.color);
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
}

function checkCollision () {
  for (var attackerIndex = 0; attackerIndex < POPULATION_SIZE; ++attackerIndex) {
    var attacker = population[attackerIndex];
    
    for (var victimIndex = attackerIndex+1; victimIndex < POPULATION_SIZE; ++victimIndex) {
      var victim = population[victimIndex];
      
      if ( attacker.type != victim.type && attacker.alive == true && 
        victim.alive == true && attacker.isTouching(victim) == true) {

        print("Fight!");
        
        var roll = random(0,100);
        
        if (roll < 50) {
          
          if(attacker.type == "Zombie") {
            attacker.turnDead(); 
            --zombieCount;
          
          } else {
            victim.turnDead();
            --zombieCount;
          }

        } else {

          if (roll < 60) {
          
            if (attacker.type == "Human") {
              attacker.turnType();
              --humanCount;
              ++zombieCount;

            } else {
              victim.turnType();
              --humanCount;
              ++zombieCount;
              } 
          } else if (attacker.type == "Human") {
            attacker.turnDead();
            --humanCount;
          
          } else {
            victim.turnDead();
            --humanCount;
          }
        }
      }
    }
  }
}




