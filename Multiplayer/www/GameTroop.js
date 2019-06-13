// Troop class
class GameTroop {
    constructor(x, y, health, dmg, range, speed, size, color) {
        this.pos = createVector(x, y);
        this.health = health;
        this.range = range;
        this.dmg = dmg;
        this.size = size;
        this.speed = speed*100;
    }

    getDistanceToTarget (tx, ty) {
        return Math.sqrt(Math.pow(this.pos.x - tx, 2) + Math.pow(this.pos.y - ty, 2));
    }

    attack (enemy) {
        enemy.health -= this.dmg;
        strokeWeight(1);
        stroke(color(255, 255, 255));
        line(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);
        setTimeout(function(){}, 1500);
    }

    autoMove(troopArray) {
        let ex = 1000000;
        let ey = 1000000;

        for (let i=0; i<troopArray.length; i++) {
            if (this.getDistanceToTarget(troopArray[i].pos.x, troopArray[i].pos.y) < this.range) {
                this.attack(troopArray[i]);
            } else if (this.getDistanceToTarget(troopArray[i].pos.x, troopArray[i].pos.y) < this.getDistanceToTarget(ex, ey)) {
                ex =  troopArray[i].pos.x;
                ey = troopArray[i].pos.y;
                this.targetMove(ex, ey);
            }
        }
    }

    targetMove(tx, ty) {

        let xspeed = (tx - this.pos.x)/this.speed;
        let yspeed = (ty - this.pos.y)/this.speed;

        this.pos.x += xspeed;
        this.pos.y += yspeed;
    }
}

//Melee Class
class MeleeSoldier extends GameTroop {
    constructor(x, y, name) {
        super(x, y, 300, 30, 50, 20, 4);
    }

    drawTroop(clr){
        strokeWeight(8);
        stroke(clr);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

// Archer (ranger) Class
class Archer extends GameTroop {
    constructor(x, y, name) {
        //yellow
        super(x, y, 200, 15, 100, 50, 20);
    }

    drawTroop(clr){
        strokeWeight(8);
        stroke(clr);
        let x = this.pos.x;
        let y = this.pos.y;
        triangle(x, y, x+2, y, (x + (x+2))/2, y-2);
    }
}