//Zombulator by michael Winberry

function setup() {
    createCanvas(800,800);
};

function draw() {
    fill(random(255),random(255),random(255));
    if (mouseIsPressed) {
        ellipse(mouseX,mouseY,50,50);
    };
};
