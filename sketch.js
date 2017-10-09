//Zombulator by michael Winberry

var zombieX,zombieY;
var r,b,g;
var sr,sb,sg;

 
function setup() {
    createCanvas(800,800);
    zombieX = width;
    r = 135
   b = 232;
   g = 175;
   sr = random(255);
   sb = random(255);
   sg = random(255);
   sw = random(15,25);
};

function draw() {
    background(255,255,255);
    stroke(sr,sb,sg);
    strokeWeight(sw);
    fill(r,b,g);
    ellipse(zombieX,height/2,80,80);
    if (zombieX > width) {
        zombieX = 0;
        r = random(255);
        g = random(255);
        b = random(255);
        sr = random(255);
        sb = random(255);
        sg = random(255);
        sw = random(15,25);
    } else {
        zombieX = zombieX + 4;
    };
};
