// Troop class
class GameTroop {
    constructor(x, y, health, dmg, range, speed, size) {
        this.pos = createVector(x, y);
        this.health = health;
        this.range = range;
        this.dmg = dmg;
        this.size = size;
        this.speed = speed;
    }

    getDistanceToTarget (tx, ty) {
        return Math.sqrt(Math.pow(this.pos.x - tx, 2) + Math.pow(this.pos.y - ty, 2));
    }

    attack (troopArray) {
        for (let i = 0; i < troopArray.length; i++) {
            if (this.getDistanceToTarget(troopArray[i].pos.x, troopArray[i].pos.y) <= this.range) {
                troopArray[i].health -= dmg;
            }
        }
    }

    targetMove() {
        let xspeed = (mouseX - this.pos.x)/100;
        let yspeed = (mouseY - this.pos.y)/100;

        this.pos.x += xspeed;
        this.pos.y += yspeed;
    }
}

//Melee Class
class MeleeSoldier extends GameTroop {
    constructor(x, y) {
        //red
        super(x, y, 300, 10, 10, 60, 4);
    }

    drawTroop(clr){
        strokeWeight(8);
        stroke(clr);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

// Archer (ranger) Class
class Archer extends GameTroop {
    constructor(x, y) {
        //yellow
        super(x, y, 200, 15, 40, 70, 20);
    }

    drawTroop(clr){
        strokeWeight(8);
        stroke(clr);
        let x = this.pos.x;
        let y = this.pos.y;
        triangle(x, y, x+2, y, (x + (x+2))/2, y-2);
    }
}
