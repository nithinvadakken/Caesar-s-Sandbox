//Player Class (should come in handy later for online play)
class Player {

    constructor(id, color) {
        this.id = id;
        this.numTroops = 40;
        this.army = this.addArmy();
        this.position = createVector(window.innerWidth/2, window.innerHeight/2);
        this.color = color;
        this.enemies = [];
    }

    update(){
        console.log(mouseX);
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
            this.army[i].autoMove(this.enemies);
        }
    }

    addArmy() {
        //default number of rows and columns of troops

        let armyArray = [];
        let meleeX;
        let meleeY;

        let archerX;
        let archerY;

        for (let i=0; i<this.numTroops; i++) {
            if (i%2===0) {
                armyArray.push(new MeleeSoldier(random(width), random(height), this.id));
            } else {
                armyArray.push(new Archer(random(width), random(height), this.id));
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