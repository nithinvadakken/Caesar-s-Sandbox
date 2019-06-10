function setup() {
  // put setup code here
    createCanvas(window.innerWidth, window.innerHeight);
}

// Troop class
class Troop {
    constructor(health, dmg, range, speed, size) {
        this.position = createVector(random(width),random(height));
        this.health = health;
        this.range = range;
        this.dmg = dmg;
        this.size = size;
        this.speed = speed;
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
            if (this.getDistanceToTarget(troopArray[i].x, troopArray[i].y) <= this.range) {
                //Move towards that target
                //Look at old code from first game to get enemy movement
            }
        }
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
class MeleeSoldier extends Troop {
    constructor() {
        super(300, 10, 10, 60, 20);
    }
}

// Archer (ranger) Class
class Archer extends Troop {
    constructor() {
        super(200, 15, 40, 70, 20);
    }
}

//Player Class (should come in handy later for online play)
class Player {
    constructor(id) {
        this.id = id;
        this.armyArray = this.addArmy();
        this.rows = 3;
        this.columns = 21;
    }

    addArmy() {
        //default number of rows and columns of troops

        let armyArray = [];

        for (var i=0;i<this.rows;i++) {
            armyArray[i] = [];
        }

        for (let i=0; i<this.rows; i++) {
            let tr = new Troop(300, 10, 10, 60, 20);
            armyArray[i].push(tr);
        }

        return armyArray;
    }

    drawArmy() {
        for (let i=0; i<this.rows; i++) {
            for (let j=0; j<this.columns; j++) {
                if (this.rows%2===0) {
                    fill(250, 118, 222);
                    ellipse(window.innerWidth/2 + i, window.innerHeight/2 + j, this.armyArray[i][j].size, this.armyArray[i][j].size);
                } else {
                    fill(250, 118, 222);
                    rect(window.innerWidth/2 - i, window.innerHeight/2 - j, this.armyArray[i][j].size, this.armyArray[i][j].size);
                }
            }
        }
    }
}

//-----------------------------------------------------------------------------------------------------------------------------

function draw() {
    // put drawing code here
    background(0);

    let player = new Player(1);
    player.addArmy();
    player.drawArmy();
}
