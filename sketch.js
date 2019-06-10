// Troop class
class GameTroop {
    constructor(health, dmg, range, speed, size) {
        this.position = createVector(random(width),random(height));
        this.health = health;
        this.range = range;
        this.dmg = dmg;
        this.size = size;
        this.speed = speed;
        this.x = Math.random() * (window.innerWidth);
        this.y = Math.random() * (window.innerHeight);
    }

    getDistanceToTarget (tx, ty) {
        return Math.sqrt(Math.pow(this.x - tx, 2) + Math.pow(this.y - ty, 2));
    }

    attack (troopArray) {
        for (let i = 0; i < troopArray.length; i++) {
            if (this.getDistanceToTarget(troopArray[i].x, troopArray[i].y) <= this.range) {
                troopArray[i].health -= dmg;
            }
        }
    }

    drawTroop (color) {
        strokeWeight(8);
        stroke(color);
        point(this.position.x, this.position.y);
    }

    move (troopArray) {
        for (let i = 0; i < troopArray.length; i++) {
            let tx = 100000000, ty=100000000;
            if (this.getDistanceToTarget(troopArray[i].x, troopArray[i].y) < this.getDistanceToTarget(tx, ty)) {
                tx = troopArray[i].x; 
                ty = troopArray[i].y;

                let xspeed = (tx - x)/2;
                let yspeed = (ty - y)/2;  
              
                this.x += xspeed;
                this.y += yspeed;
            }
        }
    }

    targetMove(tx, ty) {
        let xspeed = (mouseX - x)/2;
        let yspeed = (mouseY - y)/2;  
      
        this.x += xspeed;
        this.y += yspeed;
    }

    checkBounds () {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }
}

//Melee Class
class MeleeSoldier extends GameTroop {
    constructor() {
        super(300, 10, 10, 60, 20);
    }
}

// Archer (ranger) Class
class Archer extends GameTroop {
    constructor() {
        super(200, 15, 40, 70, 20);
    }
}

//Player Class (should come in handy later for online play)
class Player {

    constructor(id) {
        this.id = id;
        this.numTroops = 20;
        this.army = [];
    }

    addArmy() {
        //default number of rows and columns of troops

        let armyArray = [];

        for (let i=0; i<this.numTroops; i++) {
            if (i%2==0) {
                armyArray.push(new MeleeSoldier());
            } else {
                armyArray.push(new Archer());
            }
        }

        return armyArray;
    }

    setArmy() {
        this.army = this.addArmy();
    }

    drawArmy() {
        let armyArray = this.addArmy();
        for (let i=0; i<armyArray.length; i++) {
            armyArray[i].drawTroop(256);
        }
    }

    init() {
        this.army = this.setArmy();
        this.drawArmy();
    }
}

//-----------------------------------------------------------------------------------------------------------------------------
function setup() {
    // put setup code here
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
}

function draw() {
    // put drawing code here
    let player = new Player(1);
    player.init();
    
    for (let i=0; i<player.army.length; i++) {
        player.army[i].targetMove();
    }
    
}
