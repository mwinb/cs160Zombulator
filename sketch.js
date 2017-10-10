//Zombulator by michael Winberry

var zombieY = 100;
var zombieX = 0;
var humanY = 100;
var humanX = 500;
var zombieColor;
var backgroundColor;
var zombieV = 10;
var zombieV2 = 8;
var humanV = -13;
var humanV2 = -11;


function setup() {
    createCanvas(windowWidth,windowHeight);
    backgroundColor = color(114, 168, 255);
    zombieColor = color(242,255,0);
    humanColor = color(random(255), random(255), random(255));
}

function draw() {
    background(backgroundColor);
    noStroke();
    fill(zombieColor);
    ellipse(zombieX, zombieY, 80, 80);
    noStroke();
    fill(humanColor);
    ellipse(humanX, humanY, 80, 80);
    
    zombieY += (zombieV);
    zombieX += (zombieV2);

    humanX += (humanV2);
    humanY += (humanV);
 
    if ( zombieY > windowHeight || zombieY < 0 ) {
        zombieV = -zombieV
    }
    
    if ( humanY > windowHeight || humanY < 0 ) {
        humanV = -(humanV );
    }

    if ( zombieX > windowWidth || zombieX < 0 ) {
        zombieV2 = -(zombieV2);
    }
    
    if ( humanX > windowWidth || humanX < 0 ) {
        humanV2 = -(humanV2);
    }
 
    if ( dist(humanX,humanY,zombieX,zombieY) <= 45 ) {
        zombieV = -zombieV;
        zombieV2 = -zombieV2;
        humanV = -humanV;
        humanV2 = -humanV2;
    }
    
}
