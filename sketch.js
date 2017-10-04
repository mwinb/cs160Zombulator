//Zombulator by michael Winberry

var x,y;
function setup() {
    createCanvas(800,800);
    x = width;
    y = height;
};

function draw() {
    fill(random(255),random(255),random(255));
    ellipse(x,y,50,50);
        
    if (y < 0) {
        y = height;
        x = x - 50;
    } else {
        y = y - 2;
    };
    if (x < 0) {
        x = width;
    };

};
