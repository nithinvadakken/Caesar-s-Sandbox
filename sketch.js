function setup() {
  // put setup code here
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    // put drawing code here
    background(0);

    // Troop class
    class Troop {
        constructor(rows, columns, health, dmg, range, speed) {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;

            this.rows = rows;
            this.columns = columns;
            this.health = health;
            this.range = range;
            this.dmg = dmg;
            this.size = size;
            this.speed = speed;
        };

        teleport = function (tx, ty) {
            this.x = tx;
            this.y = ty;
        };

        getDistanceToTarget = function (tx, ty) {
            return Math.sqrt(Math.pow(this.x - tx, 2) + Math.pow(this.y - ty, 2));
        };

        attack = function (troopArray) {
            for (i = 0; i < troopArray.length; i++) {
                if (this.getDistanceToTarget(troopArray[i].x, troopArray[i].y) <= this.range) {
                    Troop.health -= dmg;
                }
            }
        };

        drawTroop = function (color) {
            ctx.fillStyle = color;
            ctx.fillRect(window.innerWidth / 2, window.innerHeight / 2, this.width, this.height);
        };

        move = function (troopArray) {
            for (i = 0; i < troopArray.length; i++) {
                if (this.getDistanceToTarget(troopArray[i].x, troopArray[i].y) <= this.range) {
                    //Move towards that target
                    //Look at old code from first game to get enemy movement
                }
            }
        };

        checkBounds = function (tx, ty) {
            if ((this.x <= tx || tx <= this.x + this.width) && (this.y <= ty || ty <= this.y + this.height)) {
                return true;
            }
        };
    }

    class MeleeSoldier extends Troop {
        constructor(rows, columns) {
            super(rows, columns, 300, 10, 10, 60);
        }
    }

//----------------------------------------------------------------------------------------------------


// Archer (ranger) Class
    class Archer extends Troop {
        constructor(rows, columns) {
            super(rows, columns, 200, 15, 40, 70);
        }
    }

//Player Class
    class Player {
        constructor(id, armyArray) {
            this.id = id;
            this.armyArray = armyArray;
        }

        addArmy = function () {

        }

    }
}
