// Troop class

class GameTroop {

    constructor(x, y, health, dmg, range, speed, size, name) {

        this.pos = createVector(x, y);
        this.health = health;
        this.range = range;
        this.dmg = dmg;
        this.size = size;
        this.speed = speed*75;
        this.name = name;
        this.killCount = 0;
        this.level = 1;
    }

    getDistanceToTarget (tx, ty) {

        return Math.sqrt(Math.pow(this.pos.x - tx, 2) + Math.pow(this.pos.y - ty, 2));

    }

    attack (enemy) {

        stroke(color(255, 255, 255));

        strokeWeight(1);
        enemy.health -= this.dmg + this.dmg*(this.level/2);
        if (enemy.health <= 0) {
            this.killCount+=1;
            if (this.killCount >= this.level*2  ) {
                this.killCount = 0;
                this.level += 1;
                this.size *= 1.25;
                this.health += 50;
            }
        }
        line(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);

        setTimeout(function(){}, 3000);

    }



    movement_heuristic(enemies, allies) {

        let terror = 0;



        if (enemies.length < 10 && allies.length < 10) {

            return false;

        }



        for (let i=0; i<enemies.length; i++) {

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



        for (let i=0; i<allies.length; i++) {

            if (this.getDistanceToTarget(allies[i].pos.x, allies[i].pos.y) < 100) {

                if (this.name === "Melee" && allies[i].name==="Archer") {

                    terror -= 1.5;

                } else if (this.name === "Archer" && allies[i].name==="Tank") {

                    terror -= 2;

                } else if (this.name === "Melee" && allies[i].name==="Tank") {

                    terror -= 3;

                }

            }

        }



        if (terror <= 5) {

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

    constructor(x, y, name) {
        super(x, y, 1000, 30, 40, 10, 7, "Melee");
    }

    drawTroop(clr){
        strokeWeight(1);
        stroke(clr);
        fill(clr);
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    drawHealth(){
        let percent = this.health/800;
        strokeWeight(2);
        stroke(color(0,0,255));
        fill(color(0,0,255));
        rect(this.pos.x-(this.size/2), this.pos.y + this.size, percent*this.size, 2);
    }
}



// Archer (ranger) Class

class Archer extends GameTroop {

    constructor(x, y, name) {
        //x, y, health, dmg, range, speed, size, name
        super(x, y, 100, 4, 70, 30, 10, "Archer");
    }

    drawTroop(clr){
        strokeWeight(1);
        stroke(clr);
        fill(clr);
        let x = this.pos.x;
        let y = this.pos.y;
        triangle(x, y, x + this.size, y, (x + (x+this.size))/2, y-this.size);

    }

    drawHealth(){
        let percent = this.health/200;
        strokeWeight(2);
        stroke(color(0,0,255));
        fill(color(0,0,255));
        rect(this.pos.x, this.pos.y + this.size - 15, percent*this.size, 2);
    }

}



// Tank Class

class Tank extends GameTroop {

    constructor(x, y) {
        //x, y, health, dmg, range, speed, size, name
        super(x, y, 10000, 50, 45, 50, 35, "Tank");

    }

    drawTroop(clr){
        strokeWeight(1);
        stroke(clr);
        fill(clr);
        let x = this.pos.x;
        let y = this.pos.y;
        rect(x, y, this.size, this.size);
    }

    drawHealth(){
        let percent = this.health/5000;
        strokeWeight(2);
        stroke(color(0,0,255));
        fill(color(0,0,255));
        rect(this.pos.x, this.pos.y + this.size + 10, percent*this.size, 2);
    }
}