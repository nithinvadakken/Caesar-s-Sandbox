// Troop class
class GameTroop {
    constructor(health, dmg, range, speed, size, color) {
        this.pos = createVector(random(width),random(height));
        this.health = health;
        this.range = range;
        this.dmg = dmg;
        this.size = size;
        this.speed = speed;
        this.color = color;
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

    drawTroop() {
        strokeWeight(8);
        let clr = this.color;
        stroke(clr);
        point(this.pos.x, this.pos.y);
    }


    targetMove(tx, ty) {
        let xspeed = (mouseX - x)/2;
        let yspeed = (mouseY - y)/2;

        this.x += xspeed;
        this.y += yspeed;
    }
}

//Melee Class
class MeleeSoldier extends GameTroop {
    constructor() {
        //red
        super(300, 10, 10, 60, 20, color(255,0,0));
    }
}

// Archer (ranger) Class
class Archer extends GameTroop {
    constructor() {
        //yellow
        super(200, 15, 40, 70, 20, color(255,255,0));
    }
}
