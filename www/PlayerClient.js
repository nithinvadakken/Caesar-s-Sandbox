//Player Class (should come in handy later for online play)
class Player {

    constructor(id, color) {
        this.id = id;
        this.numTroops = 0;
        this.army = [];
        this.position = createVector(window.innerWidth/2, window.innerHeight/2);
        this.color = color;
        this.enemies = [];
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
