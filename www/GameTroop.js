// Troop class
class GameTroop {
    constructor(x, y, health, dmg, range, speed, size, name, accuracy) {
        this.pos = createVector(x, y);
        this.health = health;
        this.range = range;
        this.dmg = dmg;
        this.size = size;
        this.speed = speed*135;
        this.name = name;
        this.accuracy = accuracy; //number from 0 to 10
        console.log("Troop Creation: " + this.name);
    }

    getDistanceToTarget (tx, ty) {
        return Math.sqrt(Math.pow(this.pos.x - tx, 2) + Math.pow(this.pos.y - ty, 2));
    }

    attack (enemy) {
        stroke(color(255, 255, 255));
        strokeWeight(1);
        if (random(10) < this.accuracy) {
            enemy.health -= this.dmg;
            line(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);

        }
        setTimeout(function(){}, 3000);
    }

    movement_heuristic(enemies, allies) {

        let terror = 0;

        if (enemies.length < 20 && allies.length < 20) {
            return false;
        }

        for (let i=0; i<enemies.length; i++) {
            if (typeof(allies[i]) !== undefined && typeof( enemies[i]) !== undefined) {
                if (this.getDistanceToTarget(enemies[i].pos.x, enemies[i].pos.y) < 100) {
                    if (this.name === "Melee" && enemies[i].name==="Archer") {
                        terror += 3;
                    } else if (this.name === "Archer" && enemies[i].name==="Tank") {
                        terror += 2;
                    } else if (this.name === "Melee" && enemies[i].name==="Tank") {
                        terror += 1.5;
                    }
                }
            }
        }

        for (let i=0; i<allies.length; i++) {
            if (allies[i] !== undefined && enemies[i] !== undefined) {
                if (this.getDistanceToTarget(allies[i].pos.x, allies[i].pos.y) < 100) {
                    if (this.name === "Melee" && enemies[i].name==="Archer") {
                        terror -= 1.5;
                    } else if (this.name === "Archer" && enemies[i].name==="Tank") {
                        terror -= 2;
                    } else if (this.name === "Melee" && enemies[i].name==="Tank") {
                        terror -= 3;
                    }
                }
            }
        }

        if (terror <= 0) {
            return false;
        } else {
            return true;
        }
    }

    autoMove(enemies, allies) {
        let ex = 1000000;
        let ey = 1000000;

        for (let i=0; i<enemies.length; i++) {

            let terror = this.movement_heuristic(enemies, allies);

            if (this.getDistanceToTarget(enemies[i].pos.x, enemies[i].pos.y) < this.range) {
                this.attack(enemies[i]);
                break;
            } else if (this.getDistanceToTarget(enemies[i].pos.x, enemies[i].pos.y) < this.getDistanceToTarget(ex, ey)) {
                ex =  enemies[i].pos.x;
                ey = enemies[i].pos.y;
                this.targetMove(ex, ey, terror);
            }
        }
    }

    targetMove(tx, ty, terror) {
        let xspeed = (tx - this.pos.x)/this.speed;
        let yspeed = (ty - this.pos.y)/this.speed;

        if (terror) {
            xspeed = (this.pos.x - tx)/this.speed;
            yspeed = (this.pos.y - ty)/this.speed;
        }

        if (this.pos.x + xspeed < 0) {
            this.pos.x = 0;
        } else if (this.pos.x + xspeed > window.innerWidth) {
            this.pos.x = window.innerWidth;
        } else {
            this.pos.x += xspeed;
        }

        if (this.pos.y + yspeed < 0) {
            this.pos.y = 0;
        } else if (this.pos.y + yspeed > window.innerHeight) {
            this.pos.y = window.innerHeight;
        } else {
            this.pos.y += yspeed;
        }
    }
}

//Melee Class
class MeleeSoldier extends GameTroop {
    //x, y, health, dmg, range, speed, size, name, acc
    constructor(x, y) {
        super(x, y, 300, 30, 30, 10, 4, "Melee", 10);
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
    //x, y, health, dmg, range, speed, size, name, acc
    constructor(x, y) {
        //yellow
        super(x, y, 200, 15, 60, 50, 20, "Archer", 5);
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
        //x, y, health, dmg, range, speed, size, name, acc
        super(x, y, 1000, 40, 45, 20, 30, "Tank", 6);
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