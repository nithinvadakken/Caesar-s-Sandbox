let player;
let start = false;
let btn;

function setup() {
    // put setup code here
    createCanvas(window.innerWidth, window.innerHeight);
    player = new Player(1, color(255, 0, 0));
    player2 = new Player(2, color(0, 255, 0));
    player.init(player2.army);
    player2.init(player.army);

    textFont('Georgia');
    textSize(40);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);
    if (keyIsDown(82)) {
        window.location.reload();
    }
    
    if (player.numTroops <= 0 || player2.numTroops <= 0) {
        window.location.reload();
    }

    translate(window.innerWidth/2-player.position.x, window.innerHeight/2-player.position.y);
    player.show();
    player2.show();
    player.update();
    player2.update();
    player.moveArmy();
    player2.moveArmy();
}