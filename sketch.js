let player;

function setup() {
    // put setup code here
    createCanvas(window.innerWidth, window.innerHeight);
    player = new Player(1);
    player.init();
}

function draw() {
    // put drawing code here
    background(0);
    console.log(player.position.x);
    translate(width/2-player.position.x, height/2-player.position.y);
    player.show();
    player.update();
}
