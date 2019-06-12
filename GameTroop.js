// Troop class
class GameTroop {
    constructor(x, y, health, dmg, range, speed, size, name) {
        this.pos = createVector(x, y);
        this.health = health;
        this.range = range;
        this.dmg = dmg;
        this.size = size;
        this.speed = speed*100;
        this.name = name;
    }

    getDistanceToTarget (tx, ty) {
        return Math.sqrt(Math.pow(this.pos.x - tx, 2) + Math.pow(this.pos.y - ty, 2));
    }

    attack (enemy) {
        stroke(color(255, 255, 255));
        strokeWeight(1);
        if (random(10) < 8) {
            enemy.health -= this.dmg;
            line(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);

        }
        setTimeout(function(){}, 3000);
    }

    autoMove(troopArray) {
        let ex = 1000000;
        let ey = 1000000;
        let terror = 0;
        
        for (let i=0; i<troopArray.length; i++) {
            if (this.getDistanceToTarget(troopArray[i].pos.x, troopArray[i].pos.y) < 100) {
                if (this.name === "Melee" && troopArray[i].name==="Archer") {
                    terror += 2;
                } else if (this.name === "Archer" && troopArray[i].name==="Tank") {
                    terror += 1;
                } else if (this.name === "Melee" && troopArray[i].name==="Tank") {
                    terror -= 1;
                } else {
                    terror ++;
                }
            }

            else {
                terror--;
            }

            if (this.getDistanceToTarget(troopArray[i].pos.x, troopArray[i].pos.y) < this.range) {
                this.attack(troopArray[i]);
                break;
            } else if (this.getDistanceToTarget(troopArray[i].pos.x, troopArray[i].pos.y) < this.getDistanceToTarget(ex, ey)) {
                ex =  troopArray[i].pos.x; 
                ey = troopArray[i].pos.y;
                this.targetMove(ex, ey, terror > 4);
            }
        }
    }

    targetMove(tx, ty, fear) {
        let xspeed = (tx - this.pos.x)/this.speed;
        let yspeed = (ty - this.pos.y)/this.speed;
        if (fear) {
            xspeed *= -1;
            yspeed *= -1;
        }

        this.pos.x += xspeed;
        this.pos.y += yspeed;
    }
}

//Melee Class
class MeleeSoldier extends GameTroop {
    //x, y, health, dmg, range, speed, size, name
    constructor(x, y) {
        super(x, y, 300, 30, 30, 15, 4, "Melee");
    }

    drawTroop(clr){
        strokeWeight(8);
        stroke(clr);
        fill(clr);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

// Archer (ranger) Class
class Archer extends GameTroop {
    //x, y, health, dmg, range, speed, size, name
    constructor(x, y) {
        //yellow
        super(x, y, 200, 15, 50, 50, 20, "Archer");
    }

    drawTroop(clr){
        strokeWeight(8);
        stroke(clr);
        fill(clr);
        let x = this.pos.x;
        let y = this.pos.y;
        triangle(x, y, x+2, y, (x + (x+2))/2, y-2);
    }
}

// Tank Class
class Tank extends GameTroop {
    constructor(x, y) {
        //x, y, health, dmg, range, speed, size, name
        super(x, y, 1000, 40, 100, 20, 30, "Tank");
    }

    drawTroop(clr){
        strokeWeight(8);
        stroke(clr);
        fill(clr);
        let x = this.pos.x;
        let y = this.pos.y;
        rect(x, y, this.size, this.size);
    }
}
