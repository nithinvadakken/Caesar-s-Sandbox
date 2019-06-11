let player;

function setup() {
    // put setup code here
    createCanvas(window.innerWidth, window.innerHeight);
    player = new Player(1, color(255, 0, 0));
    player2 = new Player(2, color(0, 255, 0));
    player.init(player2.army);
    player2.init(player.army);
}

function draw() {
    // put drawing code here
    background(0);
    console.log(player.position.x);
    translate(window.innerWidth/2-player.position.x, window.innerHeight/2-player.position.y);
    player.show();
    player2.show();
    player.update();
    player2.update();
}
