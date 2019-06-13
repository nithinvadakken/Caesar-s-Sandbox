let player;
let start = false;

function setup() {
    // put setup code here
    createCanvas(window.innerWidth, window.innerHeight);
    player = new Player(1, color(255, 0, 0));
    player2 = new Player(2, color(0, 255, 0));
    player.init(player2.army);
    player2.init(player.army);

    speedSlider = createSlider(2, 5, 3, 1);
}

// function mouseClicked() {
//     player.update();
//     player2.update();
// }

function keyPressed(){
    if (keyCode === 81) {
        player.addArmyOnClick(mouseX,mouseY,0);
    }
    else if (keyCode === 87) {
        player.addArmyOnClick(mouseX,mouseY,1);
    }
    else if (keyCode === 69) {
        player.addArmyOnClick(mouseX,mouseY,2);
    }

    else if (keyCode === 73) {
        player2.addArmyOnClick(mouseX,mouseY,0);
    }
    else if (keyCode === 79) {
        player2.addArmyOnClick(mouseX,mouseY,1);
    }
    else if (keyCode === 80) {
        player2.addArmyOnClick(mouseX,mouseY,2);
    }
    else if (keyCode === UP_ARROW) {
        start = true;
    }
}

function draw() {
    // put drawing code here
    /*if (player.numTroops <= 0 || player2.numTroops <= 0) {
        window.location.reload();
    }*/
    background(0);
    //translate(window.innerWidth/2-player.position.x, window.innerHeight/2-player.position.y);
    player.show();
    player2.show();
    if (start === true){
        player.update();
        player2.update();
        player.moveArmy();
        player2.moveArmy();
    }

}

function mousePressed(){
    for(let i = 0;i < player.army.length;i++){
        // player.clicked(); //not finished
    }
}