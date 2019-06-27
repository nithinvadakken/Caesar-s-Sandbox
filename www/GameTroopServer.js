// Troop class

class GameTroopServer {

    constructor(x, y, health, dmg, range, speed, size, name) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.range = range;
        this.dmg = dmg;
        this.size = size;
        this.speed = speed*100;
        this.name = name;
        this.killCount = 0;
        this.level = 1;
    }

    getDistanceToTarget (tx, ty) {
        return Math.sqrt(Math.pow(this.x - tx, 2) + Math.pow(this.y - ty, 2));
    }

    attack (enemy) {
        enemy.health -= this.dmg + this.dmg*(this.level/2);
        if (enemy.health <= 0) {
            this.killCount+=1;
            if (this.killCount >= this.level*2  ) {
                this.killCount = 0;
                this.level += 1;
                this.size += 5;
            }
        }
        setTimeout(function(){}, 300000);
    }

    movement_heuristic(enemies, allies) {
        let terror = 0;

        if (enemies.length < 10 && allies.length < 10) {
            return false;
        }

        for (let i=0; i<enemies.length; i++) {
            if (this.getDistanceToTarget(enemies[i].pos.x, enemies[i].pos.y) < 100) {
                if (this.name === "Melee" && enemies[i].name==="Archer") {
                    terror += 2*enemies[i].level;
                } else if (this.name === "Archer" && enemies[i].name==="Tank") {
                    terror += 1*enemies[i].level;
                } else if (this.name === "Melee" && enemies[i].name==="Tank") {
                    terror += 0.5*enemies[i].level;
                }
            }
        }

        for (let i=0; i<allies.length; i++) {
            if (this.getDistanceToTarget(allies[i].pos.x, allies[i].pos.y) < 100) {
                if (this.name === "Melee" && allies[i].name==="Archer") {
                    terror -= 0.5*allies[i].level;
                } else if (this.name === "Archer" && allies[i].name==="Tank") {
                    terror -= 1*allies[i].level;
                } else if (this.name === "Melee" && allies[i].name==="Tank") {
                    terror -= 2*allies[i].level;
                }
            }
        }

        terror -= this.level;

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
                let canMove = 0;
                if (!this.checkBounds(ex, ey)) {
                    canMove = true;
                }
                if (canMove) {
                    this.targetMove(ex, ey, terror);
                }
            }
        }
    }

    targetMove(tx, ty, terror) {
        let xspeed = (tx - this.x)/this.speed;
        let yspeed = (ty - this.y)/this.speed;

        if (terror) {
            xspeed = (this.x - tx)/this.speed;
            yspeed = (this.y - ty)/this.speed;
        }

        if (this.x + xspeed < 0) {
            this.x = 0;
        } else if (this.x + xspeed > window.innerWidth) {
            this.x = window.innerWidth;
        } else {
            this.x += xspeed;
        }

        if (this.y + yspeed < 0) {
            this.y = 0;
        } else if (this.y + yspeed > window.innerHeight) {
            this.y = window.innerHeight;
        } else {
            this.y += yspeed;
        }
    }
}

//Melee Class
class MeleeSoldierServer extends GameTroopServer {

    constructor(x, y, name) {
        //x, y, health, dmg, range, speed, size, name
        super(x, y, 300, 70, 40, 10, 7, "Melee");
    }

    checkBounds(tx, ty) {
        if (this.getDistanceToTarget(tx, ty) <= this.size/2) {
            return true;
        }
        return false;
    }

}



// Archer (ranger) Class

class ArcherServer extends GameTroopServer {

    constructor(x, y, name) {
        //x, y, health, dmg, range, speed, size, name
        super(x, y, 200, 10, 70, 30, 20, "Archer");
    }

    checkBounds(tx, ty) {
        if (this.getDistanceToTarget(tx, ty) <= this.size/2) {
            return true;
        }
        return false;
    }

}

// Tank Class
class TankServer extends GameTroopServer {

    constructor(x, y) {
        //x, y, health, dmg, range, speed, size, name, acc
        super(x, y, 1000, 40, 60, 50, 40, "Tank");
    }

    checkBounds(tx, ty) {
        if (tx >= this.x || tx <= this.x+this.size) {
            return true;
        } if (ty >= this.y || ty <= this.y+this.size) {
            return true;
        }
        return false;
    }

}
module.exports = {
  tank: TankServer,
  archer: ArcherServer,
    melee: MeleeSoldierServer,
};