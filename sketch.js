function setup() {
  // put setup code here
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    // put drawing code here
    background(0);

    // Troop class
    class Troop {
        constructor(health, dmg, range, speed) {
            this.position = createVector(random(width),random(height));
            this.health = health;
            this.range = range;
            this.dmg = dmg;
            this.size = size;
            this.speed = speed;
        };


        getDistanceToTarget = function (tx, ty) {
            return Math.sqrt(Math.pow(this.x - tx, 2) + Math.pow(this.y - ty, 2));
        };

        attack = function (troopArray) {
            for (let i = 0; i < troopArray.length; i++) {
                if (this.getDistanceToTarget(troopArray[i].x, troopArray[i].y) <= this.range) {
                    Troop.health -= dmg;
                }
            }
        };

        drawTroop = function (color) {
            strokeWeight(8);
            stroke(color);
            point(this.position.x, this.position.y);
        };

        move = function (troopArray) {
            for (let i = 0; i < troopArray.length; i++) {
                if (this.getDistanceToTarget(troopArray[i].x, troopArray[i].y) <= this.range) {
                    //Move towards that target
                    //Look at old code from first game to get enemy movement
                }
            }
        };

        checkBounds = function () {
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
            super(300, 10, 10, 60);
        }
    }

    // Archer (ranger) Class
    class Archer extends Troop {
        constructor() {
            super(200, 15, 40, 70);
        }
    }

    //Player Class (should come in handy later for online play)
    class Player {
        constructor(id) {
            this.id = id;
            this.armyArray = this.addArmy();
        }

        addArmy = function () {
            //default number of rows and columns of troops
            let rows = 3;
            let columns = 21;

            let numOfDivisions = 2;    //divisions being archers, melee, cavalry, etc..
            let armyArray = [rows][columns];

            for(let i = 0;i < numOfDivisions;i++){
                for(let j = 0;j < rows;j++){
                    for(let k = 0;k < columns;k++){
                         if(i === 0)
                            armyArray[j][k].push(new MeleeSoldier());

                         else if(i === 1)
                            armyArray[j][k].push(new Archer());

                        armyArray[j][k].drawTroop(random(256));
                    }
                }
            }

            return armyArray;
        };

    }

    //-----------------------------------------------------------------------------------------------------------------------------

    let player = new Player(1);

    player.addArmy();
}
