// http://tinyurl.com/cs160ex20
// Zombulator by Michael Winberry
// CS 160 Exercise 20: Collisions

var backgroundColor;
var biteSound;

const MIN_SIZE = 25;
const MAX_SIZE = 50;
const POPULATION_SIZE = 500;

var population = [];
var deadPop = [];

var zombieCount = 0;
var humanCount = 0;


function preload() {
	biteSound = loadSound('biteSound.mp3');
}
function setup() 
{
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(0, 0, 0);
	initializePopulation();
}

function draw() 
{
	background(backgroundColor);
	noStroke();
	drawPopulation();
	movePopulation();
	checkCollision();
	drawPopulationCounts();
}

function initializePopulation() 
{
	for (var i = 0; i < POPULATION_SIZE; ++i) 
	{
		var humanoid_type = random(0, 100);
		if (humanoid_type <= 50) 
		{
			population[i] = initializeZombie();
			++zombieCount;
		} 
		else 
		{
			population[i] = initializeHuman();
			++humanCount;
		}
	}
}

function drawPopulationCounts() 
{
	stroke(0);
	textSize(50);
	textAlign(CENTER);
	fill(66, 241, 244,150);
	text("Zombies: " + zombieCount, width / 2, 200);
	text("Humans: " + humanCount, width / 2, height - 150);
	textSize(30);
	text("You have until " + "\n" +
		"Zombies reach the Center", width / 2, height - 100);
	text("Click a Zombie (green) to " + "\n" +
		"Administer Prototype Andidote", width / 2, 100);
}

function drawPopulation() 
{
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		if(population[i].alive) 
		{
			population[i].draw();
		}
	}
	if (deadPop.length > 0) 
	{
		for (var i = 0; i < deadPop.length; ++i) 
		{
			deadPop[i].draw();
		}
	}
}

function movePopulation() 
{
	for (var i = 0; i < POPULATION_SIZE; ++i) 
	{
		if(population[i].alive) 
		{
			population[i].move();
		}
	}
	if (deadPop.length > 0) 
	{
		for (var i = 0; i < deadPop.length; ++i)
		{
			deadPop[i].move();
		}
	}
}


function initializeHuman() 
{
	var humanType = "Human";
	var humanX = random(50, windowWidth-50);
	var humanY = random(windowHeight-200, windowHeight-50);
	var humanColor = color(random(50, 150), random(50, 150), random(150, 255), 150);
	return initializeHumanoid(humanType,humanX, humanY, humanColor);
}


function initializeZombie() 
{
	var zombieType = "Zombie";
	var zombieX = random(50, windowWidth-50);
	var zombieY = random(50,200);
	var zombieColor = color(random(66, 226), 244, random(66, 146), 150);
	return initializeHumanoid(zombieType, zombieX,  zombieY, zombieColor);
}

function initializeHumanoid(humaniodType, humanoidX, humanoidY, humanoidColor) 
{
	return {
		type: humaniodType,
		alive: true,
		x : humanoidX,
		y : humanoidY,
		color: humanoidColor,
		size: random(MIN_SIZE, MAX_SIZE),
		
		speed: function () 
		{
			return random(.25,3);
		},
		move: function () 
		{
			if (this.type == "Human") 
			{
				this.y -= this.speed();
				this.x += random(-2,2);
				this.y += random(-2,2);
			} else {
				this.y += this.speed();
				this.x += random(-2,2);
				this.y += random(-2,2);
			}
		},

		draw: function()
		{
			if (this.x + this.size > windowWidth) 
			{
				this.x = this.x - this.size;
			}

			if (this.x + this.size < 0 ) 
			{
				this.x = this.x + this.size;
			}

			fill(this.color);
			ellipse(this.x, this.y, this.size, this.size);
		},

		isTouching: function(victim) 
		{
			var distance = dist(this.x, this.y, victim.x, victim.y);
			if (distance <= this.size/2 + victim.size/2) {
				return true;
			}
		},

		turnType: function () 
		{
			if(this.type == "Human") 
			{
				this.type = "Zombie";
				this.color = color(random(66, 226), 244, random(66, 146), 150);
			} else {
				this.type = "Human";
				this.color = color(random(50, 150), random(50, 150), random(150, 255), 150);
			}
		},

		turnDead: function () 
		{
			if(this.isHuman()) {
				biteSound.play();
			}
			this.alive = false;
			for (var i = 0; i < 5; ++i) {
				var tempDead = initializeDeath(this.type, this.x, this.y, this.color);
				deadPop.push(tempDead);
			}
		},

		isHuman: function () 
		{
			if (this.type == "Human") 
			{
				return true;
			} 
			else
			{
				return false;
			}
		},

		clicked: function () 
		{
			if (!this.isHuman() && this.alive && (this.y < windowHeight / 2)) 
			{
				var distance = dist(this.x, this.y, mouseX, mouseY);
				var radius = this.size/2;
				var roll = random(0, 100);
				if(distance < radius) 
				{
					this.turnType();
					--zombieCount;
					++humanCount;
				}
			}
		},

		bounce: function () 
		{
			if (this.isHuman()) 
			{
				this.y += random(15,30);
				this.x += random(-30,30);
			}
			else 
			{
				this.y -= random(15,30);
				this.x -= random(-30, 30);
			}
		},

		grow: function () 
		{
			if (!this.isHuman())
			{
				this.size += random(.5,1);
			}
			else
			{
				this.size += random(.5,1);
			}
		}

	}
}

function initializeDeath(deceasedType, deceasedX, deceasedY, deceasedColor)
{
	return {
		type: deceasedType,
		x: deceasedX,
		y: deceasedY,
		speed: random(2,5),
		size: random(3,5),
		color: deceasedColor,
		move: function()
		{
			if(this.type == "Human") 
			{
				this.y += this.speed;
				this.x += random(-2,2);
				this.y += random(-2,2)
			} 
			else 
			{
				this.y -= this.speed;
				this.x += random(-2,2);
				this.y += random(-2,2);
			}
		},
		draw: function () 
		{
			if (this.x + this.size/2 > windowWidth) 
			{
				this.x = this.x - this.size;
			}

			if (this.x + this.size/2 < 0 ) 
			{
				this.x = this.x + this.size;
			}

			fill(this.color);
			ellipse(this.x, this.y, this.size, this.size);
		}
	}
}

function checkCollision () 
{
	for (var attackerIndex = 0; attackerIndex < POPULATION_SIZE; ++attackerIndex)
	{
		var attacker = population[attackerIndex];

		for (var victimIndex = attackerIndex+1; victimIndex < POPULATION_SIZE; ++victimIndex) 
		{
			var victim = population[victimIndex];

			if ( attacker.type != victim.type && attacker.alive && 
				victim.alive && attacker.isTouching(victim)) 
			{
				print("Fight!");
				sizeRatio = attacker.size / victim.size;

				if (sizeRatio >= 1.1) 
				{
					if(testTurned()) 
					{
						decrementType(victim);
						victim.turnType();
						incrementType(victim);
					} 
					else 
					{
						decrementType(victim);
						victim.turnDead();
						attacker.grow()
					}
				}
				else if (sizeRatio < .9) 
				{
					if (testTurned())
					{
						decrementType(attacker);
						attacker.turnType();
						incrementType(attacker);
					}
					else 
					{
						decrementType(attacker);
						attacker.turnDead();
						victim.grow();
					}
				} 
				else 
				{
					var roll = random(0,40);

					if(roll < 10) 
					{

						attacker.bounce();
						victim.bounce();
						roll = random();
						if (roll > .5) 
						{
							attacker.grow();
						} 
						else 
						{
							victim.grow();
						}
					} 
					else if (roll < 20) 
					{
						decrementType(victim);
						victim.turnDead();
						attacker.grow();
					}
					else if (roll < 30) 
					{
						if ((attacker.isHuman() && roll < 25) || !attacker.isHuman()) 
						{
							decrementType(attacker);
							attacker.turnDead();
							decrementType(victim);
							victim.turnDead();
						}
						else 
						{
							roll = random();
							attacker.bounce();
							victim.bounce();
							if (roll < .5) 
							{
								attacker.grow();
							}
							else 
							{
								victim.grow();
							}
						}
					}
					else 
					{
						decrementType(victim);
						victim.turnType();
						incrementType(attacker);
					} 
				}
			}
		}
	}
}


function testTurned() 
{
	var roll = random();
	if (roll >= .7 ) {
		return true;
	} else {
		return false;
	}
}

function decrementType(humanoid) 
{
	if (humanoid.type == "Human") 
	{
		--humanCount;
	} else {
		--zombieCount
	}
}

function incrementType(humanoid) 
{
	if(humanoid.type == "Human") 
	{
		++humanCount;
	} else {
		++zombieCount;
	}
}

function mousePressed() 
{
	for(var i = 0; i < POPULATION_SIZE; ++i)
	{
		population[i].clicked();
	}
}




