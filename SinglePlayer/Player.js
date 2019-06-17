//Player Class (should come in handy later for online play)
class Player {

    constructor(id, color) {
        this.id = id;
        this.numTroops = 50;
        this.army = this.addArmy();
        this.position = createVector(window.innerWidth/2, window.innerHeight/2);
        this.color = color;
        this.enemies = [];
    }

    update(){
        let vel = createVector(mouseX,mouseY);
        vel.sub(this.position);
        this.position.add(vel);
    }

    moveArmy() {
        for(let i = 0; i < this.numTroops; i++){
            if (this.army[i].health <= 0) {
                this.army.splice(i, 1);
                this.numTroops -= 1;
            }
        }

        for (let i=0; i<this.numTroops; i++) {
            this.army[i].autoMove(this.enemies, this.army);
        }
    }

    addArmy() {
        //default number of rows and columns of troops

        let armyArray = [];

        for (let i=0; i<this.numTroops; i++) {
            let newx = random(width);
            let newy = random(height);
            if (i%10===0) {
                armyArray.push(new Tank(newx, newy));
            } else if (i%3===0) {
                armyArray.push(new Archer(newx, newy));
            } else {
                armyArray.push(new MeleeSoldier(newx, newy));
            } 
        }

        return armyArray;
    }

    drawArmy() {
        let armyArray = this.army;
        for (let i=0; i<armyArray.length; i++) {
            armyArray[i].drawTroop(this.color);
        }
    }

    show(){
        this.drawArmy();
    }

    init(enemyTroopArr){
        this.enemies = enemyTroopArr;
    }
}
