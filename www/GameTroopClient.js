// Troop class

class GameTroopClient {

    constructor(x, y, health, dmg, range, speed, size, name) {
        this.pos = createVector(x, y);
        this.health = health;
        this.range = range;
        this.dmg = dmg;
        this.size = size;
        this.speed = speed*100;
        this.name = name;
        this.killCount = 0;
        this.level = 1;
    }

    attack (enemy) {
        stroke(color(255, 255, 255));
        strokeWeight(1);
        line(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);
    }
}

//Melee Class
class MeleeSoldierClient extends GameTroopClient {

    constructor(x, y, name) {
        //x, y, health, dmg, range, speed, size, name
        super(x, y, 300, 70, 40, 10, 7, "Melee");
    }

    drawTroop(clr){
        strokeWeight(8);
        stroke(clr);
        fill(clr);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}



// Archer (ranger) Class

class ArcherClient extends GameTroopClient {

    constructor(x, y, name) {
        //x, y, health, dmg, range, speed, size, name
        super(x, y, 200, 10, 70, 30, 20, "Archer");
    }

    drawTroop(clr){
        strokeWeight(8);
        stroke(clr);
        fill(clr);
        let x = this.pos.x;
        let y = this.pos.y;
        triangle(x, y, x+this.size/3, y, x+this.size/3/2, y-this.size/3);
    }
}

// Tank Class
class TankClient extends GameTroopClient {

    constructor(x, y) {
        //x, y, health, dmg, range, speed, size, name, acc
        super(x, y, 1000, 40, 60, 50, 40, "Tank");
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